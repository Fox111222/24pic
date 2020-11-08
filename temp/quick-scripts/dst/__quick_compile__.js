
(function () {
var scripts = [{"deps":{"./assets/scripts/AudioMgr":1,"./assets/scripts/Chat":5,"./assets/scripts/RadioButton":10,"./assets/scripts/Settings":3,"./assets/scripts/RadioGroupMgr":9,"./assets/scripts/JoinGameInput":6,"./assets/scripts/kbengine":16,"./assets/scripts/cc_scripts/GameOver":2,"./assets/scripts/cc_scripts/StartScene":4,"./assets/scripts/cc_scripts/WorldScene":15,"./assets/scripts/cc_scripts/Seat":11,"./assets/scripts/cc_scripts/eval":50,"./assets/scripts/cc_scripts/eval2":14,"./assets/scripts/cc_scripts/WxBizDataCrypt":8,"./assets/scripts/cc_scripts/GameState":13,"./assets/migration/use_v2.0.x_cc.Toggle_event":7,"./assets/scripts/kbe_scripts/Avatar":12},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AudioMgr.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/cc_scripts/GameOver.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Settings.js"},{"deps":{"kbengine":16,"AudioMgr":1,"WxBizDataCrypt":8},"path":"preview-scripts/assets/scripts/cc_scripts/StartScene.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/Chat.js"},{"deps":{},"path":"preview-scripts/assets/scripts/JoinGameInput.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"buffer":18,"crypto":17},"path":"preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js"},{"deps":{},"path":"preview-scripts/assets/scripts/RadioGroupMgr.js"},{"deps":{"RadioGroupMgr":9},"path":"preview-scripts/assets/scripts/RadioButton.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/Seat.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/kbe_scripts/Avatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/GameState.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval2.js"},{"deps":{"kbengine":16,"eval2":14},"path":"preview-scripts/assets/scripts/cc_scripts/WorldScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/kbengine.js"},{"deps":{"randomfill":25,"randombytes":21,"create-hash":20,"pbkdf2":19,"browserify-sign/algos":46,"diffie-hellman":24,"create-hmac":22,"create-ecdh":26,"browserify-cipher":47,"public-encrypt":23,"browserify-sign":48},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":29},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"./lib/sync":31,"./lib/async":30},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"inherits":37,"ripemd160":40,"sha.js":39,"cipher-base":42,"md5.js":36},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"safe-buffer":45,"../process/browser.js":32},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":37,"./legacy":33,"safe-buffer":45,"create-hash/md5":41,"sha.js":39,"ripemd160":40,"cipher-base":42},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"./publicEncrypt":34,"./privateDecrypt":38},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{"buffer":18,"./lib/primes.json":43,"./lib/dh":44,"./lib/generatePrime":35},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"../process/browser.js":32,"safe-buffer":45,"randombytes":21},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{"buffer":18,"bn.js":53,"elliptic":49},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"./sync":31,"../../process/browser.js":32,"safe-buffer":45,"./default-encoding":51,"./precondition":52},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"./precondition":52,"./default-encoding":51,"create-hash/md5":41,"ripemd160":40,"sha.js":39,"safe-buffer":45},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"inherits":37,"safe-buffer":45,"cipher-base":42},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"safe-buffer":45,"create-hash":20,"randombytes":21,"parse-asn1":63,"bn.js":75,"./xor":55,"./withPublic":54,"./mgf":56,"browserify-rsa":93},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"randombytes":21,"bn.js":74,"miller-rabin":67},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"inherits":37,"safe-buffer":45,"hash-base":64},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"./mgf":56,"./xor":55,"./withPublic":54,"create-hash":20,"safe-buffer":45,"browserify-rsa":93,"bn.js":75,"parse-asn1":63},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"./sha224":58,"./sha256":59,"./sha":60,"./sha384":65,"./sha512":66,"./sha1":57},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"buffer":18,"inherits":37,"hash-base":64},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"md5.js":36},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"safe-buffer":45,"inherits":37,"string_decoder":62,"stream":61},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./generatePrime":35,"buffer":18,"bn.js":74,"miller-rabin":67,"randombytes":21},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"./browser/algorithms.json":81},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"browserify-aes/browser":108,"evp_bytestokey":76,"browserify-des/modes":112,"browserify-des":107,"browserify-aes/modes":109},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"buffer":18,"./algorithms.json":81,"create-hash":20,"inherits":37,"./verify":87,"./sign":88,"readable-stream":126},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":72,"brorand":77,"./elliptic/curve":69,"./elliptic/utils":68,"./elliptic/eddsa":71,"./elliptic/ec":70,"./elliptic/curves":73},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval.js"},{"deps":{"../../process/browser.js":32},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{"bn.js":75,"safe-buffer":45},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"create-hash":20,"safe-buffer":45},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"inherits":37,"safe-buffer":45,"./hash":80},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./sha256":59,"./hash":80,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":80,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./hash":80,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"inherits":37,"events":82,"readable-stream/passthrough.js":90,"readable-stream/transform.js":91,"readable-stream/duplex.js":89,"readable-stream/writable.js":86,"readable-stream/readable.js":92},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"pbkdf2":19,"safe-buffer":45,"./aesid.json":84,"./fixProc":83,"./asn1":85,"browserify-aes":108},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":37,"safe-buffer":105,"readable-stream":95},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"./sha512":66,"./hash":80,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":80,"inherits":37,"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"brorand":77,"bn.js":116},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"bn.js":119,"minimalistic-assert":102,"minimalistic-crypto-utils":106},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":94,"./short":96,"./mont":97,"./edwards":99},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../utils":68,"../curves":73,"brorand":77,"./signature":100,"./key":101,"hmac-drbg":110,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"../curves":73,"../utils":68,"hash.js":113,"./key":104,"./signature":103},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":69,"./utils":68,"./precomputed/secp256k1":98,"hash.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{"safe-buffer":45,"md5.js":36},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"crypto":78},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{},"path":"preview-scripts/__node_modules/is-buffer/index.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"safe-buffer":45,"evp_bytestokey":76,"browserify-aes":108},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"./certificate":114,"asn1.js":127},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{"./lib/_stream_writable.js":111},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{"buffer":18,"parse-asn1":63,"elliptic":49,"bn.js":136,"./curves.json":131},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"buffer":18,"./curves.json":131,"create-hmac":22,"elliptic":49,"parse-asn1":63,"browserify-rsa":93,"bn.js":136},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"./lib/_stream_duplex.js":115},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./readable":92},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./readable":92},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"./lib/_stream_writable.js":111,"./lib/_stream_duplex.js":115,"./lib/_stream_transform.js":118,"./lib/_stream_passthrough.js":120,"./lib/_stream_readable.js":117},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":18,"randombytes":21,"bn.js":209},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"../utils":68,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"./lib/_stream_passthrough.js":122,"./lib/_stream_duplex.js":123,"./lib/_stream_transform.js":124,"./lib/_stream_writable.js":125,"./lib/internal/streams/end-of-stream.js":128,"./lib/internal/streams/pipeline.js":129,"./lib/_stream_readable.js":121},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"../utils":68,"./base":94,"bn.js":119,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"./base":94,"../utils":68,"bn.js":119,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"../utils":68,"./base":94,"bn.js":119,"inherits":37},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"../utils":68,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{"../utils":68,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"../utils":68,"bn.js":119},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"../utils":68},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"cipher-base":42,"inherits":37,"safe-buffer":45,"des.js":156},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"./modes/list.json":160,"./decrypter":162,"./encrypter":159},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"./list.json":160,"./ecb":157,"./cfb8":161,"./cfb1":166,"./ofb":164,"./cbc":158,"./cfb":163,"./ctr":165},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"hash.js":113,"minimalistic-crypto-utils":106,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./_stream_duplex":115,"../../process/browser.js":32,"inherits":37,"safe-buffer":45,"util-deprecate":138,"process-nextick-args":139,"./internal/streams/stream":146,"core-util-is":154,"./internal/streams/destroy":153},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./hash/ripemd":134,"./hash/utils":130,"./hash/common":133,"./hash/hmac":135,"./hash/sha":132},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"asn1.js":127},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"./_stream_readable":117,"./_stream_writable":111,"process-nextick-args":139,"core-util-is":154,"inherits":37},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"events":82,"./internal/streams/stream":146,"util":78,"./internal/streams/destroy":153,"./_stream_duplex":115,"../../process/browser.js":32,"process-nextick-args":139,"safe-buffer":45,"core-util-is":154,"inherits":37,"./internal/streams/BufferList":137,"isarray":155,"string_decoder/":168},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_duplex":115,"core-util-is":154,"inherits":37},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_transform":118,"core-util-is":154,"inherits":37},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"events":82,"buffer":18,"util":78,"./_stream_duplex":123,"../../../../process/browser.js":32,"inherits":37,"../errors":142,"./internal/streams/from":145,"./internal/streams/stream":140,"./internal/streams/destroy":141,"./internal/streams/buffer_list":143,"./internal/streams/async_iterator":144,"./internal/streams/state":147,"string_decoder/":167},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_transform":124,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_readable":121,"./_stream_writable":125,"../../../../process/browser.js":32,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"../errors":142,"./_stream_duplex":123,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./internal/streams/stream":140,"buffer":18,"./internal/streams/destroy":141,"./internal/streams/state":147,"../errors":142,"./_stream_duplex":123,"../../../../process/browser.js":32,"util-deprecate":138,"inherits":37},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./lib/_stream_duplex.js":174,"./lib/internal/streams/end-of-stream.js":183,"./lib/_stream_passthrough.js":175,"./lib/internal/streams/pipeline.js":190,"./lib/_stream_transform.js":177,"./lib/_stream_writable.js":188,"./lib/_stream_readable.js":195},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"bn.js":176,"./asn1/constants":150,"./asn1/base":148,"./asn1/decoders":151,"./asn1/encoders":152,"./asn1/api":149},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"../../../errors":142},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../../../errors":142,"./end-of-stream":128},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"minimalistic-assert":102,"inherits":37},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"./sha/384":170,"./sha/224":171,"./sha/256":172,"./sha/512":173,"./sha/1":169},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":130,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./utils":130,"./common":133},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./utils":130,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"util":78,"safe-buffer":45},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"../process/browser.js":32},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"buffer":18,"util":78},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"./end-of-stream":128,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":142},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"./buffer":178,"./reporter":179,"./node":180},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"../asn1":127,"inherits":37,"vm":181},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./der":182},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./pem":184,"./der":185},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./pem":186,"./der":187},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"process-nextick-args":139},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./des/utils":189,"./des/ede":191,"./des/cbc":192,"./des/des":193,"./des/cipher":194},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{"./modes":109,"safe-buffer":45,"cipher-base":42,"evp_bytestokey":76,"inherits":37,"./streamCipher":199,"./aes":202,"./authCipher":200},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"./authCipher":200,"./modes":109,"./streamCipher":199,"./aes":202,"safe-buffer":45,"cipher-base":42,"evp_bytestokey":76,"inherits":37},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"safe-buffer":45,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"buffer":18,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":45,"buffer-xor":197,"../incr32":201},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"safe-buffer":105},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../utils":130,"../common":133,"./common":196},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"../utils":130,"./512":173},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":130,"./256":172},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":130,"../common":133,"./common":196,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":130,"../common":133,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"./_stream_readable":195,"./_stream_writable":188,"../../../../process/browser.js":32,"inherits":37},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_transform":177,"inherits":37},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_duplex":174,"inherits":37,"../errors":204},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"../base":148,"buffer":18,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"../base":148,"minimalistic-assert":102},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"indexof":198},"path":"preview-scripts/__node_modules/vm-browserify/index.js"},{"deps":{"../constants":150},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"../../../errors":204},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"buffer":18,"./der":185,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"../../asn1":127,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"./der":187,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"buffer":18,"../../asn1":127,"inherits":37},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"buffer":18,"../errors":204,"./_stream_duplex":174,"../../../../process/browser.js":32,"util-deprecate":138,"inherits":37,"./internal/streams/stream":203,"./internal/streams/state":205,"./internal/streams/destroy":207},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"../../../errors":204,"./end-of-stream":183},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"./cipher":194,"./des":193,"minimalistic-assert":102,"inherits":37},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"minimalistic-assert":102,"inherits":37},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./utils":189,"./cipher":194,"minimalistic-assert":102,"inherits":37},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":102},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"events":82,"./internal/streams/stream":203,"buffer":18,"../errors":204,"./internal/streams/state":205,"./internal/streams/destroy":207,"util":78,"../../../../process/browser.js":32,"./_stream_duplex":174,"inherits":37,"./internal/streams/from":206,"./internal/streams/async_iterator":208,"./internal/streams/buffer_list":210,"string_decoder/":212},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../utils":130},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{"./aes":202,"safe-buffer":45,"cipher-base":42,"inherits":37},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":202,"./incr32":201,"safe-buffer":45,"cipher-base":42,"inherits":37,"buffer-xor":197,"./ghash":211},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{"events":82},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../errors":204},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"./end-of-stream":183,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"buffer":78},"path":"preview-scripts/__node_modules/browserify-rsa/node_modules/bn.js/lib/bn.js"},{"deps":{"util":78,"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"safe-buffer":45},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"safe-buffer":213},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"}];
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
    