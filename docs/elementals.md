
<a name="0x0_elementals"></a>

# Module `0x0::elementals`



-  [Struct `ELEMENTALS`](#0x0_elementals_ELEMENTALS)
-  [Resource `AdminCap`](#0x0_elementals_AdminCap)
-  [Resource `ElementNFT`](#0x0_elementals_ElementNFT)
-  [Resource `AvatarNFT`](#0x0_elementals_AvatarNFT)
-  [Struct `InitEvent`](#0x0_elementals_InitEvent)
-  [Struct `MintElementEvent`](#0x0_elementals_MintElementEvent)
-  [Struct `CombiningElementsEvent`](#0x0_elementals_CombiningElementsEvent)
-  [Struct `MintAvatarEvent`](#0x0_elementals_MintAvatarEvent)
-  [Constants](#@Constants_0)
-  [Function `mint_element`](#0x0_elementals_mint_element)
-  [Function `mint_avatar`](#0x0_elementals_mint_avatar)
-  [Function `get_element_name`](#0x0_elementals_get_element_name)
-  [Function `get_element_description`](#0x0_elementals_get_element_description)
-  [Function `get_element_image_url`](#0x0_elementals_get_element_image_url)
-  [Function `get_element_thumbnail_url`](#0x0_elementals_get_element_thumbnail_url)
-  [Function `get_element_project_url`](#0x0_elementals_get_element_project_url)
-  [Function `get_element_creator`](#0x0_elementals_get_element_creator)
-  [Function `get_element_type`](#0x0_elementals_get_element_type)
-  [Function `get_avatar_name`](#0x0_elementals_get_avatar_name)
-  [Function `get_avatar_description`](#0x0_elementals_get_avatar_description)
-  [Function `get_avatar_image_url`](#0x0_elementals_get_avatar_image_url)
-  [Function `get_avatar_thumbnail_url`](#0x0_elementals_get_avatar_thumbnail_url)
-  [Function `get_avatar_project_url`](#0x0_elementals_get_avatar_project_url)
-  [Function `get_avatar_creator`](#0x0_elementals_get_avatar_creator)
-  [Function `init`](#0x0_elementals_init)
-  [Function `elements_handling`](#0x0_elementals_elements_handling)
-  [Function `pop_and_validate`](#0x0_elementals_pop_and_validate)


<pre><code><b>use</b> <a href="dependencies/move-stdlib/string.md#0x1_string">0x1::string</a>;
<b>use</b> <a href="dependencies/move-stdlib/vector.md#0x1_vector">0x1::vector</a>;
<b>use</b> <a href="dependencies/sui-framework/address.md#0x2_address">0x2::address</a>;
<b>use</b> <a href="dependencies/sui-framework/display.md#0x2_display">0x2::display</a>;
<b>use</b> <a href="dependencies/sui-framework/event.md#0x2_event">0x2::event</a>;
<b>use</b> <a href="dependencies/sui-framework/object.md#0x2_object">0x2::object</a>;
<b>use</b> <a href="dependencies/sui-framework/package.md#0x2_package">0x2::package</a>;
<b>use</b> <a href="dependencies/sui-framework/transfer.md#0x2_transfer">0x2::transfer</a>;
<b>use</b> <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context">0x2::tx_context</a>;
</code></pre>



<a name="0x0_elementals_ELEMENTALS"></a>

## Struct `ELEMENTALS`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_ELEMENTALS">ELEMENTALS</a> <b>has</b> drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>dummy_field: bool</code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_AdminCap"></a>

## Resource `AdminCap`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_AdminCap">AdminCap</a> <b>has</b> store, key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <a href="dependencies/sui-framework/object.md#0x2_object_UID">object::UID</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_ElementNFT"></a>

## Resource `ElementNFT`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> <b>has</b> store, key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <a href="dependencies/sui-framework/object.md#0x2_object_UID">object::UID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>name: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>description: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>image_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>thumbnail_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>project_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>creator: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>element_type: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_AvatarNFT"></a>

## Resource `AvatarNFT`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a> <b>has</b> store, key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <a href="dependencies/sui-framework/object.md#0x2_object_UID">object::UID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>name: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>description: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>image_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>thumbnail_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>project_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>creator: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_InitEvent"></a>

## Struct `InitEvent`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_InitEvent">InitEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>admin: <b>address</b></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_MintElementEvent"></a>

## Struct `MintElementEvent`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_MintElementEvent">MintElementEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>object_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>recipient: <b>address</b></code>
</dt>
<dd>

</dd>
<dt>
<code>name: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>element_type: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_CombiningElementsEvent"></a>

## Struct `CombiningElementsEvent`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_CombiningElementsEvent">CombiningElementsEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>water_element_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>earth_element_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>fire_element_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>air_element_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>aether_element_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x0_elementals_MintAvatarEvent"></a>

## Struct `MintAvatarEvent`



<pre><code><b>struct</b> <a href="elementals.md#0x0_elementals_MintAvatarEvent">MintAvatarEvent</a> <b>has</b> <b>copy</b>, drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>object_id: <a href="dependencies/sui-framework/object.md#0x2_object_ID">object::ID</a></code>
</dt>
<dd>

</dd>
<dt>
<code>recipient: <b>address</b></code>
</dt>
<dd>

</dd>
<dt>
<code>name: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="@Constants_0"></a>

## Constants


<a name="0x0_elementals_DESCRIPTION"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_DESCRIPTION">DESCRIPTION</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt; = [84, 104, 101, 32, 65, 118, 97, 116, 97, 114, 32, 101, 109, 98, 111, 100, 105, 101, 115, 32, 116, 104, 101, 32, 112, 101, 114, 102, 101, 99, 116, 32, 98, 97, 108, 97, 110, 99, 101, 32, 111, 102, 32, 97, 108, 108, 32, 101, 108, 101, 109, 101, 110, 116, 115, 46, 32, 73, 116, 32, 103, 114, 111, 117, 110, 100, 115, 32, 119, 105, 116, 104, 32, 69, 97, 114, 116, 104, 226, 128, 153, 115, 32, 115, 116, 97, 98, 105, 108, 105, 116, 121, 44, 32, 102, 108, 111, 119, 115, 32, 119, 105, 116, 104, 32, 87, 97, 116, 101, 114, 226, 128, 153, 115, 32, 97, 100, 97, 112, 116, 97, 98, 105, 108, 105, 116, 121, 44, 32, 105, 103, 110, 105, 116, 101, 115, 32, 119, 105, 116, 104, 32, 70, 105, 114, 101, 226, 128, 153, 115, 32, 116, 114, 97, 110, 115, 102, 111, 114, 109, 97, 116, 105, 111, 110, 44, 32, 115, 111, 97, 114, 115, 32, 119, 105, 116, 104, 32, 65, 105, 114, 226, 128, 153, 115, 32, 105, 110, 116, 101, 108, 108, 101, 99, 116, 44, 32, 97, 110, 100, 32, 117, 110, 105, 102, 105, 101, 115, 32, 119, 105, 116, 104, 32, 69, 116, 104, 101, 114, 226, 128, 153, 115, 32, 99, 114, 101, 97, 116, 105, 118, 101, 32, 112, 111, 116, 101, 110, 116, 105, 97, 108, 46, 32, 84, 104, 101, 32, 65, 118, 97, 116, 97, 114, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 115, 32, 104, 97, 114, 109, 111, 110, 121, 44, 32, 105, 110, 100, 105, 118, 105, 100, 117, 97, 108, 105, 116, 121, 44, 32, 97, 110, 100, 32, 116, 104, 101, 32, 105, 110, 116, 101, 114, 99, 111, 110, 110, 101, 99, 116, 101, 100, 110, 101, 115, 115, 32, 111, 102, 32, 97, 108, 108, 32, 101, 120, 105, 115, 116, 101, 110, 99, 101, 46];
</code></pre>



<a name="0x0_elementals_EWrongElementType"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_EWrongElementType">EWrongElementType</a>: <a href="dependencies/move-stdlib/u64.md#0x1_u64">u64</a> = 1;
</code></pre>



<a name="0x0_elementals_EWrongElementTypePassed"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_EWrongElementTypePassed">EWrongElementTypePassed</a>: <a href="dependencies/move-stdlib/u64.md#0x1_u64">u64</a> = 2;
</code></pre>



<a name="0x0_elementals_EWrongNumberOfElementNFTs"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_EWrongNumberOfElementNFTs">EWrongNumberOfElementNFTs</a>: <a href="dependencies/move-stdlib/u64.md#0x1_u64">u64</a> = 0;
</code></pre>



<a name="0x0_elementals_IMAGE_URL"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_IMAGE_URL">IMAGE_URL</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt; = [104, 116, 116, 112, 115, 58, 47, 47, 105, 46, 105, 109, 103, 117, 114, 46, 99, 111, 109, 47, 79, 110, 119, 69, 68, 87, 51, 46, 106, 112, 103];
</code></pre>



<a name="0x0_elementals_NAME"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_NAME">NAME</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt; = [65, 118, 97, 116, 97, 114, 58, 32, 84, 104, 101, 32, 77, 97, 115, 116, 101, 114, 32, 69, 108, 101, 109, 101, 110, 116];
</code></pre>



<a name="0x0_elementals_NUMBER_OF_ELEMENTS"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_NUMBER_OF_ELEMENTS">NUMBER_OF_ELEMENTS</a>: <a href="dependencies/move-stdlib/u64.md#0x1_u64">u64</a> = 5;
</code></pre>



<a name="0x0_elementals_PROJECT_URL"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_PROJECT_URL">PROJECT_URL</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt; = [104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 97, 114, 116, 102, 105, 116, 111, 107, 101, 110, 46, 105, 111, 47];
</code></pre>



<a name="0x0_elementals_THUMBNAIL_URL"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_THUMBNAIL_URL">THUMBNAIL_URL</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt; = [104, 116, 116, 112, 115, 58, 47, 47, 102, 97, 114, 109, 55, 46, 115, 116, 97, 116, 105, 99, 102, 108, 105, 99, 107, 114, 46, 99, 111, 109, 47, 54, 48, 56, 57, 47, 54, 49, 49, 53, 55, 53, 57, 49, 55, 57, 95, 56, 54, 51, 49, 54, 99, 48, 56, 102, 102, 95, 122, 95, 100, 46, 106, 112, 103];
</code></pre>



<a name="0x0_elementals_TYPES_OF_ELEMENTS"></a>



<pre><code><b>const</b> <a href="elementals.md#0x0_elementals_TYPES_OF_ELEMENTS">TYPES_OF_ELEMENTS</a>: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt;&gt; = [ByteArray([65, 101, 116, 104, 101, 114]), ByteArray([65, 105, 114]), ByteArray([70, 105, 114, 101]), ByteArray([69, 97, 114, 116, 104]), ByteArray([87, 97, 116, 101, 114])];
</code></pre>



<a name="0x0_elementals_mint_element"></a>

## Function `mint_element`



<pre><code><b>public</b> entry <b>fun</b> <a href="elementals.md#0x0_elementals_mint_element">mint_element</a>(_: &<a href="elementals.md#0x0_elementals_AdminCap">elementals::AdminCap</a>, recipient: <b>address</b>, name: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, description: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, image_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, thumbnail_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, project_url: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, element_type: <a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>, ctx: &<b>mut</b> <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_TxContext">tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> entry <b>fun</b> <a href="elementals.md#0x0_elementals_mint_element">mint_element</a>(
    _: &<a href="elementals.md#0x0_elementals_AdminCap">AdminCap</a>,
    recipient: <b>address</b>,
    name: String,
    description: String,
    image_url: String,
    thumbnail_url: String,
    project_url: String,
    element_type: String,
    ctx: &<b>mut</b> TxContext,
) {
    // Copy element <a href="dependencies/sui-framework/types.md#0x2_types">types</a>
    <b>let</b> element_types = <a href="elementals.md#0x0_elementals_TYPES_OF_ELEMENTS">TYPES_OF_ELEMENTS</a>;

    <b>assert</b>!(<a href="dependencies/move-stdlib/vector.md#0x1_vector_contains">vector::contains</a>(&element_types, element_type.as_bytes()), <a href="elementals.md#0x0_elementals_EWrongElementTypePassed">EWrongElementTypePassed</a>);

    <b>let</b> sender = <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_sender">tx_context::sender</a>(ctx);
    <b>let</b> nft = <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> {
        id: <a href="dependencies/sui-framework/object.md#0x2_object_new">object::new</a>(ctx),
        name: name,
        description: description,
        image_url: image_url,
        thumbnail_url: thumbnail_url,
        project_url: project_url,
        creator: sender.to_string(),
        element_type: element_type,
    };
    <a href="dependencies/sui-framework/event.md#0x2_event_emit">event::emit</a>(<a href="elementals.md#0x0_elementals_MintElementEvent">MintElementEvent</a> {
        object_id: <a href="dependencies/sui-framework/object.md#0x2_object_id">object::id</a>(&nft),
        recipient: recipient,
        name: name,
        element_type: element_type,
    });
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(nft, recipient);
}
</code></pre>



</details>

<a name="0x0_elementals_mint_avatar"></a>

## Function `mint_avatar`



<pre><code><b>public</b> entry <b>fun</b> <a href="elementals.md#0x0_elementals_mint_avatar">mint_avatar</a>(elements: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>&gt;, recipient: <b>address</b>, ctx: &<b>mut</b> <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_TxContext">tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> entry <b>fun</b> <a href="elementals.md#0x0_elementals_mint_avatar">mint_avatar</a>(
    elements: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>&gt;,
    recipient: <b>address</b>,
    ctx: &<b>mut</b> TxContext,
) {
    <a href="elementals.md#0x0_elementals_elements_handling">elements_handling</a>(elements);

    <b>let</b> sender = <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_sender">tx_context::sender</a>(ctx);
    <b>let</b> name = <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(<a href="elementals.md#0x0_elementals_NAME">NAME</a>);
    <b>let</b> description = <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(<a href="elementals.md#0x0_elementals_DESCRIPTION">DESCRIPTION</a>);
    <b>let</b> image_url = <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(<a href="elementals.md#0x0_elementals_IMAGE_URL">IMAGE_URL</a>);
    <b>let</b> thumbnail_url = <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(<a href="elementals.md#0x0_elementals_THUMBNAIL_URL">THUMBNAIL_URL</a>);
    <b>let</b> project_url = <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(<a href="elementals.md#0x0_elementals_PROJECT_URL">PROJECT_URL</a>);

    <b>let</b> nft = <a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a> {
        id: <a href="dependencies/sui-framework/object.md#0x2_object_new">object::new</a>(ctx),
        name: name,
        description: description,
        image_url: image_url,
        thumbnail_url: thumbnail_url,
        project_url: project_url,
        creator: sender.to_string(),
    };
    <a href="dependencies/sui-framework/event.md#0x2_event_emit">event::emit</a>(<a href="elementals.md#0x0_elementals_MintAvatarEvent">MintAvatarEvent</a> {
        object_id: <a href="dependencies/sui-framework/object.md#0x2_object_id">object::id</a>(&nft),
        recipient: recipient,
        name: name,
    });
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(nft, recipient);
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_name"></a>

## Function `get_element_name`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_name">get_element_name</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_name">get_element_name</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.name
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_description"></a>

## Function `get_element_description`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_description">get_element_description</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_description">get_element_description</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.description
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_image_url"></a>

## Function `get_element_image_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_image_url">get_element_image_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_image_url">get_element_image_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.image_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_thumbnail_url"></a>

## Function `get_element_thumbnail_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_thumbnail_url">get_element_thumbnail_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_thumbnail_url">get_element_thumbnail_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.thumbnail_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_project_url"></a>

## Function `get_element_project_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_project_url">get_element_project_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_project_url">get_element_project_url</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.project_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_creator"></a>

## Function `get_element_creator`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_creator">get_element_creator</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_creator">get_element_creator</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.creator
}
</code></pre>



</details>

<a name="0x0_elementals_get_element_type"></a>

## Function `get_element_type`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_type">get_element_type</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_element_type">get_element_type</a>(nft: &<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>): &String {
    &nft.element_type
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_name"></a>

## Function `get_avatar_name`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_name">get_avatar_name</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_name">get_avatar_name</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.name
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_description"></a>

## Function `get_avatar_description`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_description">get_avatar_description</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_description">get_avatar_description</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.description
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_image_url"></a>

## Function `get_avatar_image_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_image_url">get_avatar_image_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_image_url">get_avatar_image_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.image_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_thumbnail_url"></a>

## Function `get_avatar_thumbnail_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_thumbnail_url">get_avatar_thumbnail_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_thumbnail_url">get_avatar_thumbnail_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.thumbnail_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_project_url"></a>

## Function `get_avatar_project_url`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_project_url">get_avatar_project_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_project_url">get_avatar_project_url</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.project_url
}
</code></pre>



</details>

<a name="0x0_elementals_get_avatar_creator"></a>

## Function `get_avatar_creator`



<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_creator">get_avatar_creator</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">elementals::AvatarNFT</a>): &<a href="dependencies/move-stdlib/string.md#0x1_string_String">string::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="elementals.md#0x0_elementals_get_avatar_creator">get_avatar_creator</a>(nft: &<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>): &String {
    &nft.creator
}
</code></pre>



</details>

<a name="0x0_elementals_init"></a>

## Function `init`



<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_init">init</a>(otw: <a href="elementals.md#0x0_elementals_ELEMENTALS">elementals::ELEMENTALS</a>, ctx: &<b>mut</b> <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_TxContext">tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_init">init</a>(otw: <a href="elementals.md#0x0_elementals_ELEMENTALS">ELEMENTALS</a>, ctx: &<b>mut</b> TxContext) {
    <b>let</b> publisher = <a href="dependencies/sui-framework/package.md#0x2_package_claim">package::claim</a>(otw, ctx);
    <b>let</b> element_keys = <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>[
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"id"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"name"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"description"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"image_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"thumbnail_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"project_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"creator"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"element_type"),
    ];
    <b>let</b> element_values = <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>[
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{id}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{name}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{description}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{image_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{thumbnail_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{project_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{creator}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{element_type}")
    ];
    <b>let</b> avatar_keys = <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>[
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"id"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"name"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"description"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"image_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"thumbnail_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"project_url"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"creator"),
    ];
    <b>let</b> avatar_values = <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>[
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{id}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{name}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{description}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{image_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{thumbnail_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{project_url}"),
        <a href="dependencies/move-stdlib/string.md#0x1_string_utf8">string::utf8</a>(b"{creator}"),
    ];
    <b>let</b> <b>mut</b> element_display = <a href="dependencies/sui-framework/display.md#0x2_display_new_with_fields">display::new_with_fields</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>&gt;(
        &publisher, element_keys, element_values, ctx
    );
    <a href="dependencies/sui-framework/display.md#0x2_display_update_version">display::update_version</a>(&<b>mut</b> element_display);
    <b>let</b> <b>mut</b> avatar_display = <a href="dependencies/sui-framework/display.md#0x2_display_new_with_fields">display::new_with_fields</a>&lt;<a href="elementals.md#0x0_elementals_AvatarNFT">AvatarNFT</a>&gt;(
        &publisher, avatar_keys, avatar_values, ctx
    );
    <a href="dependencies/sui-framework/display.md#0x2_display_update_version">display::update_version</a>(&<b>mut</b> avatar_display);
    <b>let</b> sender = <a href="dependencies/sui-framework/tx_context.md#0x2_tx_context_sender">tx_context::sender</a>(ctx);
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(publisher, sender);
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(element_display, sender);
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(avatar_display, sender);
    <a href="dependencies/sui-framework/transfer.md#0x2_transfer_public_transfer">transfer::public_transfer</a>(
        <a href="elementals.md#0x0_elementals_AdminCap">AdminCap</a> { id: <a href="dependencies/sui-framework/object.md#0x2_object_new">object::new</a>(ctx) },
        sender
    );
    // Emitting <a href="dependencies/sui-framework/event.md#0x2_event">event</a>
    <a href="dependencies/sui-framework/event.md#0x2_event_emit">event::emit</a>( <a href="elementals.md#0x0_elementals_InitEvent">InitEvent</a> {
        admin: sender
    });
}
</code></pre>



</details>

<a name="0x0_elementals_elements_handling"></a>

## Function `elements_handling`



<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_elements_handling">elements_handling</a>(elements: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>&gt;)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_elements_handling">elements_handling</a>(<b>mut</b> elements: <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>&gt;) {
    <b>assert</b>!(<a href="dependencies/move-stdlib/vector.md#0x1_vector_length">vector::length</a>(&elements) == <a href="elementals.md#0x0_elementals_NUMBER_OF_ELEMENTS">NUMBER_OF_ELEMENTS</a>, <a href="elementals.md#0x0_elementals_EWrongNumberOfElementNFTs">EWrongNumberOfElementNFTs</a>);

    // Copy element <a href="dependencies/sui-framework/types.md#0x2_types">types</a>
    <b>let</b> <b>mut</b> element_types = <a href="elementals.md#0x0_elementals_TYPES_OF_ELEMENTS">TYPES_OF_ELEMENTS</a>;
    // Since pop_back() takes the last element, the order is reversed
    <b>let</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> { id: water_id,  ..} = <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(&<b>mut</b> elements, &<b>mut</b> element_types);
    <b>let</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> { id: earth_id,  ..} = <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(&<b>mut</b> elements, &<b>mut</b> element_types);
    <b>let</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> { id: fire_id,  ..} = <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(&<b>mut</b> elements, &<b>mut</b> element_types);
    <b>let</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> { id: air_id,  ..} = <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(&<b>mut</b> elements, &<b>mut</b> element_types);
    <b>let</b> <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> { id: aether_id,  ..} = <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(&<b>mut</b> elements, &<b>mut</b> element_types);

    <a href="dependencies/sui-framework/event.md#0x2_event_emit">event::emit</a>(<a href="elementals.md#0x0_elementals_CombiningElementsEvent">CombiningElementsEvent</a> {
        water_element_id: water_id.to_inner(),
        earth_element_id: earth_id.to_inner(),
        fire_element_id: fire_id.to_inner(),
        air_element_id: air_id.to_inner(),
        aether_element_id: aether_id.to_inner(),
    });

    <a href="dependencies/sui-framework/object.md#0x2_object_delete">object::delete</a>(water_id);
    <a href="dependencies/sui-framework/object.md#0x2_object_delete">object::delete</a>(earth_id);
    <a href="dependencies/sui-framework/object.md#0x2_object_delete">object::delete</a>(fire_id);
    <a href="dependencies/sui-framework/object.md#0x2_object_delete">object::delete</a>(air_id);
    <a href="dependencies/sui-framework/object.md#0x2_object_delete">object::delete</a>(aether_id);
    <a href="dependencies/move-stdlib/vector.md#0x1_vector_destroy_empty">vector::destroy_empty</a>(elements);
    <a href="dependencies/move-stdlib/vector.md#0x1_vector_destroy_empty">vector::destroy_empty</a>(element_types);
}
</code></pre>



</details>

<a name="0x0_elementals_pop_and_validate"></a>

## Function `pop_and_validate`



<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(elements: &<b>mut</b> <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>&gt;, element_types: &<b>mut</b> <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt;&gt;): <a href="elementals.md#0x0_elementals_ElementNFT">elementals::ElementNFT</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="elementals.md#0x0_elementals_pop_and_validate">pop_and_validate</a>(
    elements: &<b>mut</b> <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a>&gt;,
    element_types: &<b>mut</b> <a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;<a href="dependencies/move-stdlib/vector.md#0x1_vector">vector</a>&lt;u8&gt;&gt;,
): <a href="elementals.md#0x0_elementals_ElementNFT">ElementNFT</a> {
    <b>let</b> element = <a href="dependencies/move-stdlib/vector.md#0x1_vector_pop_back">vector::pop_back</a>(elements);
    <b>let</b> element_type = <a href="dependencies/move-stdlib/vector.md#0x1_vector_pop_back">vector::pop_back</a>(element_types);

    <b>assert</b>!(element.element_type.as_bytes() == element_type, <a href="elementals.md#0x0_elementals_EWrongElementType">EWrongElementType</a>);

    element
}
</code></pre>



</details>
