module elementals::elementals_art20 {
    use std::string::{Self, String};
    use sui::{display, event, package};
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::dynamic_field;
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::table::{Self, Table};
    use sui::url::{Self, Url};
    use std::option::{Self, Option};
    use std::vector;

    // === Errors ===
    const EWRONG_OWNER: u64 = 0;
    const EWRONG_AMOUNT: u64 = 1;
    const EWRONG_CREATOR: u64 = 2;
    const ENOT_MUTABLE: u64 = 3;
    const EMETADATA_FROZEN: u64 = 4;
    const EWRONG_BALANCE: u64 = 5;
    const EWRONG_NFT_OWNER: u64 = 6;
    const EWRONG_COLLECTION: u64 = 8;
    const EINSUFFICIENT_BALANCE: u64 = 9;
    const EDENIED_LIST: u64 = 12;
    const ENO_DENY_LIST_AUTHORITY: u64 = 13;
    const EDENY_LIST_EXISTS: u64 = 14;
    const EINVALID_ARGUMENT: u64 = 15;
    const EBATCH_SIZE: u64 = 16;
    const EINVALID_ID: u64 = 18;
    const EINVALID_SUPPLY: u64 = 19;
    const EBATCH_TOO_LARGE: u64 = 20;
    const EASSET_NOT_FOUND: u64 = 21;

    // === Constants ===
    const MAX_BATCH_SIZE: u64 = 200;
    const MAX_SUPPLY_LIMIT: u64 = 1000000000;

    // === Structs ===
    struct ELEMENTALS_ART20 has drop {}

    public struct NFT has key, store {
        id: UID,
        artinals_id: u64,
        creator: address,
        name: String,
        description: String,
        uri: Url,
        logo_uri: Url,
        asset_id: u64,
        max_supply: u64,
        is_mutable: bool,
        metadata_frozen: bool,
        collection_id: ID,
    }

    public struct CollectionCap has key, store {
        id: UID,
        max_supply: u64,
        current_supply: u64,
        creator: address,
        name: String,
        description: String,
        uri: Url,
        logo_uri: Url,
        is_mutable: bool,
        has_deny_list_authority: bool,
    }

    public struct UserBalance has key, store {
        id: UID,
        collection_id: ID,
        balance: u64,
    }

    public struct TokenIdCounter has key {
        id: UID,
        last_id: u64,
    }

    struct DenyListKey has copy, drop, store {
        dummy_field: bool,
    }

    // === Events ===
    struct NFTMintedEvent has copy, drop {
        id: ID,
        artinals_id: u64,
        creator: address,
        name: String,
        asset_id: u64,
    }

    struct TransferEvent has copy, drop {
        from: address,
        to: address,
        id: ID,
        amount: u64,
        royalty: u64,
        asset_id: u64,
    }

    struct CollectionCreatedEvent has copy, drop {
        collection_id: ID,
        creator: address,
        name: String,
        description: String,
        initial_supply: u64,
        max_supply: u64,
        is_mutable: bool,
        has_deny_list_authority: bool,
        timestamp: u64,
    }

    struct MetadataUpdateEvent has copy, drop {
        id: ID,
        new_name: String,
        new_description: String,
    }

    struct DenyListStatusEvent has copy, drop {
        collection_id: ID,
        address: address,
        is_denied: bool,
    }

    // === Init Function ===
    fun init(otw: ELEMENTALS_ART20, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        let sender = tx_context::sender(ctx);

        // Create display
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"creator"),
            string::utf8(b"project_url"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{logo_uri}"),
            string::utf8(b"{creator}"),
            string::utf8(b"{uri}"),
        ];

        let nft_display = display::new_with_fields<NFT>(
            &publisher,
            keys,
            values,
            ctx
        );
        display::update_version(&mut nft_display);

        transfer::public_transfer(publisher, sender);
        transfer::public_transfer(nft_display, sender);

        // Initialize token counter
        transfer::share_object(TokenIdCounter {
            id: object::new(ctx),
            last_id: 0,
        });
    }

    // === Core Functions ===
    public entry fun mint_art20(
        name: vector<u8>,
        description: vector<u8>,
        initial_supply: u64,
        max_supply: u64,
        uri: vector<u8>,
        logo_uri: vector<u8>,
        is_mutable: bool,
        has_deny_list: bool,
        counter: &mut TokenIdCounter,
        ctx: &mut TxContext
    ) {
        assert!(max_supply <= MAX_SUPPLY_LIMIT, EINVALID_SUPPLY);
        assert!(initial_supply <= max_supply, EWRONG_AMOUNT);
        assert!(counter.last_id <= (18446744073709551615 - initial_supply), EINVALID_ID);

        let sender = tx_context::sender(ctx);

        // Create collection cap
        let collection_cap = CollectionCap {
            id: object::new(ctx),
            max_supply,
            current_supply: initial_supply,
            creator: sender,
            name: string::utf8(name),
            description: string::utf8(description),
            uri: url::new_unsafe_from_bytes(uri),
            logo_uri: url::new_unsafe_from_bytes(logo_uri),
            is_mutable,
            has_deny_list_authority: has_deny_list,
        };

        let collection_id = object::uid_to_inner(&collection_cap.id);

        // Create user balance
        let user_balance = UserBalance {
            id: object::new(ctx),
            collection_id,
            balance: initial_supply,
        };

        // Mint initial NFTs
        let i = 0;
        while (i < initial_supply) {
            counter.last_id = counter.last_id + 1;
            
            let nft = NFT {
                id: object::new(ctx),
                artinals_id: counter.last_id,
                creator: sender,
                name: string::utf8(name),
                description: string::utf8(description),
                uri: url::new_unsafe_from_bytes(uri),
                logo_uri: url::new_unsafe_from_bytes(logo_uri),
                asset_id: i + 1,
                max_supply,
                is_mutable,
                metadata_frozen: false,
                collection_id,
            };

            event::emit(NFTMintedEvent {
                id: object::uid_to_inner(&nft.id),
                artinals_id: nft.artinals_id,
                creator: nft.creator,
                name: nft.name,
                asset_id: nft.asset_id,
            });

            transfer::transfer(nft, sender);
            i = i + 1;
        };

        // Initialize deny list if needed
        if (has_deny_list) {
            initialize_deny_list(&mut collection_cap, ctx);
        };

        // Transfer objects
        transfer::share_object(collection_cap);
        transfer::transfer(user_balance, sender);

        // Emit creation event
        event::emit(CollectionCreatedEvent {
            collection_id,
            creator: sender,
            name: string::utf8(name),
            description: string::utf8(description),
            initial_supply,
            max_supply,
            is_mutable,
            has_deny_list_authority: has_deny_list,
            timestamp: tx_context::epoch(ctx),
        });
    }

    // === Helper Functions ===
    public fun initialize_deny_list(collection: &mut CollectionCap, ctx: &mut TxContext) {
        assert!(collection.has_deny_list_authority, ENO_DENY_LIST_AUTHORITY);
        let key = DenyListKey { dummy_field: false };
        dynamic_field::add(&mut collection.id, key, table::new<address, bool>(ctx));
    }

    // Continue with transfer, metadata update, deny list management functions...
    // I can provide those if needed
}