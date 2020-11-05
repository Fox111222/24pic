
(function () {
var scripts = [{"deps":{"./assets/scripts/AudioMgr":1,"./assets/scripts/kbe_scripts/Avatar":3,"./assets/scripts/cc_scripts/Seat":4,"./assets/migration/use_v2.0.x_cc.Toggle_event":5,"./assets/scripts/RadioGroupMgr":6,"./assets/scripts/cc_scripts/GameOver":8,"./assets/scripts/cc_scripts/GameState":9,"./assets/scripts/Settings":10,"./assets/scripts/JoinGameInput":12,"./assets/scripts/RadioButton":7,"./assets/scripts/cc_scripts/eval2":13,"./assets/scripts/Chat":14,"./assets/scripts/cc_scripts/WorldScene":15,"./assets/scripts/kbengine":16,"./assets/scripts/cc_scripts/StartScene":2,"./assets/scripts/cc_scripts/eval":29,"./assets/scripts/cc_scripts/WxBizDataCrypt":11},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AudioMgr.js"},{"deps":{"AudioMgr":1,"WxBizDataCrypt":11,"kbengine":16},"path":"preview-scripts/assets/scripts/cc_scripts/StartScene.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/kbe_scripts/Avatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/Seat.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/RadioGroupMgr.js"},{"deps":{"RadioGroupMgr":6},"path":"preview-scripts/assets/scripts/RadioButton.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/cc_scripts/GameOver.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/GameState.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Settings.js"},{"deps":{"buffer":18,"crypto":17},"path":"preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js"},{"deps":{},"path":"preview-scripts/assets/scripts/JoinGameInput.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval2.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/Chat.js"},{"deps":{"kbengine":16,"eval2":13},"path":"preview-scripts/assets/scripts/cc_scripts/WorldScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/kbengine.js"},{"deps":{"randombytes":21,"randomfill":25,"pbkdf2":20,"browserify-sign/algos":46,"diffie-hellman":24,"create-hmac":22,"create-hash":19,"create-ecdh":26,"public-encrypt":23,"browserify-cipher":48,"browserify-sign":50},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":30},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"inherits":37,"ripemd160":39,"sha.js":41,"cipher-base":43,"md5.js":40},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"./lib/sync":34,"./lib/async":31},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"../process/browser.js":32,"safe-buffer":45},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":37,"./legacy":33,"safe-buffer":45,"create-hash/md5":42,"ripemd160":39,"sha.js":41,"cipher-base":43},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"./privateDecrypt":36,"./publicEncrypt":38},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{"buffer":18,"./lib/primes.json":47,"./lib/dh":44,"./lib/generatePrime":35},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"randombytes":21,"safe-buffer":45,"../process/browser.js":32},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{"buffer":18,"bn.js":54,"elliptic":49},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"./sync":34,"../../process/browser.js":32,"safe-buffer":45,"./default-encoding":52,"./precondition":51},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"inherits":37,"safe-buffer":45,"cipher-base":43},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"./precondition":51,"./default-encoding":52,"create-hash/md5":42,"ripemd160":39,"sha.js":41,"safe-buffer":45},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{"randombytes":21,"bn.js":77,"miller-rabin":71},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"create-hash":19,"safe-buffer":45,"parse-asn1":64,"bn.js":76,"./xor":55,"./mgf":53,"browserify-rsa":95,"./withPublic":56},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"./mgf":53,"./xor":55,"./withPublic":56,"randombytes":21,"create-hash":19,"safe-buffer":45,"bn.js":76,"parse-asn1":64,"browserify-rsa":95},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"buffer":18,"inherits":37,"hash-base":65},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"inherits":37,"safe-buffer":45,"hash-base":65},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"./sha256":58,"./sha1":59,"./sha":60,"./sha224":61,"./sha512":66,"./sha384":57},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"md5.js":40},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"safe-buffer":45,"inherits":37,"string_decoder":63,"stream":62},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"./generatePrime":35,"buffer":18,"bn.js":77,"miller-rabin":71,"randombytes":21},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"./browser/algorithms.json":80},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"evp_bytestokey":75,"browserify-des/modes":111,"browserify-des":112,"browserify-aes/modes":109,"browserify-aes/browser":110},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"../package.json":72,"brorand":74,"./elliptic/curve":67,"./elliptic/eddsa":70,"./elliptic/utils":68,"./elliptic/ec":69,"./elliptic/curves":73},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"buffer":18,"./algorithms.json":80,"create-hash":19,"inherits":37,"./verify":91,"./sign":92,"readable-stream":121},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":32},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"create-hash":19,"safe-buffer":45},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"bn.js":76,"safe-buffer":45},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{"./sha512":66,"inherits":37,"safe-buffer":45,"./hash":81},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":81,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./hash":81,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./hash":81,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./sha256":58,"./hash":81,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"inherits":37,"events":82,"readable-stream/transform.js":97,"readable-stream/passthrough.js":100,"readable-stream/duplex.js":101,"readable-stream/writable.js":86,"readable-stream/readable.js":102},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"pbkdf2":20,"safe-buffer":45,"browserify-aes":110,"./aesid.json":85,"./fixProc":84,"./asn1":83},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":37,"safe-buffer":104,"readable-stream":108},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"./hash":81,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"./short":87,"./mont":88,"./edwards":89,"./base":90},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"bn.js":113,"minimalistic-assert":103,"minimalistic-crypto-utils":105},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"../utils":68,"../curves":73,"brorand":74,"./key":93,"./signature":94,"hmac-drbg":106,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"../curves":73,"../utils":68,"hash.js":107,"./key":98,"./signature":99},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{"brorand":74,"bn.js":116},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./utils":68,"./curve":67,"./precomputed/secp256k1":96,"hash.js":107},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"crypto":78},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"safe-buffer":45,"md5.js":40},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{},"path":"preview-scripts/__node_modules/is-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"./certificate":115,"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{"evp_bytestokey":75,"safe-buffer":45,"browserify-aes":110},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"./lib/_stream_writable.js":114},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{"../utils":68,"./base":90,"bn.js":113,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"./base":90,"../utils":68,"bn.js":113,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":68,"./base":90,"bn.js":113,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"../utils":68,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"buffer":18,"parse-asn1":64,"elliptic":49,"bn.js":135,"./curves.json":134},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"buffer":18,"./curves.json":134,"create-hmac":22,"elliptic":49,"parse-asn1":64,"browserify-rsa":95,"bn.js":135},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"../utils":68,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":68,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{"buffer":18,"randombytes":21,"bn.js":204},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"./readable":102},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"../utils":68},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"../utils":68,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"./readable":102},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./lib/_stream_duplex.js":117},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./lib/_stream_writable.js":114,"./lib/_stream_duplex.js":117,"./lib/_stream_transform.js":118,"./lib/_stream_passthrough.js":120,"./lib/_stream_readable.js":119},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"hash.js":107,"minimalistic-crypto-utils":105,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./hash/ripemd":128,"./hash/common":123,"./hash/hmac":125,"./hash/utils":130,"./hash/sha":126},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"./lib/_stream_transform.js":127,"./lib/_stream_passthrough.js":129,"./lib/internal/streams/pipeline.js":133,"./lib/_stream_writable.js":131,"./lib/_stream_duplex.js":132,"./lib/internal/streams/end-of-stream.js":136,"./lib/_stream_readable.js":124},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"./ecb":152,"./list.json":154,"./cfb1":150,"./cfb8":156,"./cfb":157,"./ofb":159,"./cbc":148,"./ctr":155},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"./modes/list.json":154,"./encrypter":164,"./decrypter":162},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"inherits":37,"cipher-base":43,"safe-buffer":45,"des.js":166},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_duplex":117,"../../process/browser.js":32,"inherits":37,"safe-buffer":45,"process-nextick-args":138,"core-util-is":141,"util-deprecate":139,"./internal/streams/stream":143,"./internal/streams/destroy":144},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_readable":119,"./_stream_writable":114,"inherits":37,"process-nextick-args":138,"core-util-is":141},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_duplex":117,"core-util-is":141,"inherits":37},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"events":82,"./internal/streams/stream":143,"util":78,"./internal/streams/destroy":144,"./_stream_duplex":117,"../../process/browser.js":32,"process-nextick-args":138,"safe-buffer":45,"core-util-is":141,"inherits":37,"./internal/streams/BufferList":137,"isarray":167,"string_decoder/":172},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_transform":118,"core-util-is":141,"inherits":37},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./lib/_stream_duplex.js":173,"./lib/internal/streams/end-of-stream.js":179,"./lib/_stream_passthrough.js":176,"./lib/internal/streams/pipeline.js":189,"./lib/_stream_transform.js":177,"./lib/_stream_writable.js":181,"./lib/_stream_readable.js":193},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"bn.js":175,"./asn1/encoders":142,"./asn1/constants":168,"./asn1/base":170,"./asn1/decoders":171,"./asn1/api":140},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"./utils":130,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"events":82,"buffer":18,"util":78,"./_stream_duplex":132,"../../../../process/browser.js":32,"inherits":37,"../errors":153,"./internal/streams/from":158,"./internal/streams/stream":146,"./internal/streams/destroy":147,"./internal/streams/state":149,"./internal/streams/buffer_list":151,"./internal/streams/async_iterator":160,"string_decoder/":174},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./utils":130,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./sha/224":161,"./sha/384":165,"./sha/256":163,"./sha/512":169,"./sha/1":145},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"../errors":153,"./_stream_duplex":132,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./utils":130,"./common":123},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./_stream_transform":127,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"minimalistic-assert":103,"inherits":37},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"./internal/streams/state":149,"./internal/streams/stream":146,"../errors":153,"buffer":18,"./_stream_duplex":132,"../../../../process/browser.js":32,"./internal/streams/destroy":147,"util-deprecate":139,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./_stream_readable":124,"./_stream_writable":131,"../../../../process/browser.js":32,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"../../../errors":153,"./end-of-stream":136},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":153},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"util":78,"safe-buffer":45},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"../process/browser.js":32},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"../asn1":122,"inherits":37,"vm":178},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"./pem":180,"./der":183},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"process-nextick-args":138},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../utils":130,"../common":123,"./common":184},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{"../../../errors":153},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"buffer":18,"util":78},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"safe-buffer":45,"buffer-xor":197,"../incr32":200},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"safe-buffer":45,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":18,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"./end-of-stream":136,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"../utils":130,"./256":163},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"./modes":109,"safe-buffer":45,"cipher-base":43,"evp_bytestokey":75,"inherits":37,"./streamCipher":201,"./aes":202,"./authCipher":198},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"../utils":130,"./common":184,"../common":123,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"./modes":109,"./authCipher":198,"./streamCipher":201,"./aes":202,"safe-buffer":45,"evp_bytestokey":75,"cipher-base":43,"inherits":37},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{"../utils":130,"./512":169},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"./des/utils":182,"./des/ede":185,"./des/cbc":186,"./des/des":188,"./des/cipher":187},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./der":190},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"../utils":130,"../common":123,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"./reporter":191,"./buffer":192,"./node":194},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"./pem":195,"./der":196},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./_stream_readable":193,"./_stream_writable":181,"../../../../process/browser.js":32,"inherits":37},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"safe-buffer":104},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_transform":177,"inherits":37},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_duplex":173,"inherits":37,"../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"indexof":199},"path":"preview-scripts/__node_modules/vm-browserify/index.js"},{"deps":{"../../../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"./der":183,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"buffer":18,"../errors":203,"./_stream_duplex":173,"../../../../process/browser.js":32,"util-deprecate":139,"inherits":37,"./internal/streams/stream":205,"./internal/streams/state":206,"./internal/streams/destroy":207},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"buffer":18,"../../asn1":122,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"../utils":130},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"./cipher":187,"./des":188,"minimalistic-assert":103,"inherits":37},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"inherits":37,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"minimalistic-assert":103},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./utils":182,"./cipher":187,"minimalistic-assert":103,"inherits":37},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"../../../errors":203,"./end-of-stream":179},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"../constants":168},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"../base":170,"buffer":18,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"events":82,"buffer":18,"./internal/streams/stream":205,"util":78,"./internal/streams/destroy":207,"../errors":203,"./internal/streams/state":206,"./_stream_duplex":173,"../../../../process/browser.js":32,"inherits":37,"./internal/streams/from":208,"./internal/streams/async_iterator":209,"./internal/streams/buffer_list":210,"string_decoder/":212},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../base":170,"minimalistic-assert":103},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"buffer":18,"./der":196,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"../../asn1":122,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{"./aes":202,"./incr32":200,"safe-buffer":45,"cipher-base":43,"inherits":37,"buffer-xor":197,"./ghash":211},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"./aes":202,"safe-buffer":45,"cipher-base":43,"inherits":37},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/browserify-rsa/node_modules/bn.js/lib/bn.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"./end-of-stream":179,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"util":78,"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"safe-buffer":213},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }
                console.time && console.time('eval __quick_compile_project__');
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd('eval __quick_compile_project__');
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    