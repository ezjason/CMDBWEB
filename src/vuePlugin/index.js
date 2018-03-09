import JSEncrypt from './utils/jsencrypt'
import fetch from './utils/fetch'
import findAll from './utils/findAll'
import format from './utils/format'
import parseCommaData from './utils/parseCommaData'
import parseURL from './utils/parseURL'
import sendJson from './utils/sendJson'
import storage from './utils/storage'
import treeData from './utils/treeData'
import timeDiff from './utils/timeDiff'
import toDate from './utils/toDate'
import {on,off} from './utils/windowResize'

let encrypt,publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHi2HAJ0HGFAq9MtpnPrBGHVYToB+B1WdM2rMtGS8Cou8Nzh/gMqFI3S9ZeWoedwUlb6rWxMA9bPqQk8b4MyUN0ByFtW2CccALffzIpLsjikIcrXSzpsI0TwtXjVjMp333Z7CgDYt475c7g6VJX3uzWvzNn4WuKaDelJXO0WZLwwIDAQAB'

export default {
    install(Vue){
        Vue.prototype.$jsEncrypt = JSEncrypt;
        Vue.prototype.$encrypt = function (text) {
            if(!encrypt){
                encrypt = new this.$jsEncrypt.JSEncrypt();
                encrypt.setPublicKey(publicKey);
            }
            return encrypt.encrypt(text)
        };
        Vue.prototype.$fetch = fetch;
        Vue.prototype.$findAll = findAll;
        Vue.prototype.$format = format;
        Vue.prototype.$parseCommaData = parseCommaData;
        Vue.prototype.$parseURL = parseURL;
        Vue.prototype.$sendJson = sendJson;
        Vue.prototype.$storage = storage;
        Vue.prototype.$treeData = treeData;
        Vue.prototype.$timeDiff = timeDiff;
        Vue.prototype.$toDate = toDate;
        Vue.prototype.$onWindowResize = on;
        Vue.prototype.$offWindowResize = off;
    },
}