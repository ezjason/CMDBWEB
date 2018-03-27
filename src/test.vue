<style lang="less" scoped>

</style>

<template>
    <div>
        {{num}}
        <el-button @click="trigger"></el-button>
    </div>
</template>

<script>
    import aes from 'aes-js'
    export default {
        data(){
            return {
                num:0
            }
        },
        computed: {},
        methods: {
            trigger(){
                var key = aesjs.utils.hex.toBytes('93e37970e8594b5c16ed1163ec39440d');

                var iv = aesjs.utils.utf8.toBytes('abcdefgabcdefg12');

//                var text = 'TextMustBe16Byte';
//                var textBytes = aesjs.utils.hex.toBytes(text);

//                var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//                var encryptedBytes = aesCbc.encrypt(textBytes);

//                var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
//                console.log(encryptedHex);

                var encryptedBytes = aesjs.utils.hex.toBytes('a68df5303f41f798330538b9ca098d01');


                var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
                var decryptedBytes = aesCbc.decrypt(encryptedBytes);

                var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            }
        },
        mounted(){
            window.aesjs=aes;
        },
        beforeDestroy(){
        },
    }
</script>