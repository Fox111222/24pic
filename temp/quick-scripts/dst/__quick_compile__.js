
(function () {
var scripts = [{"deps":{"./assets/scripts/JoinGameInput":8,"./assets/scripts/RadioGroupMgr":6,"./assets/scripts/RadioButton":7,"./assets/scripts/Chat":11,"./assets/scripts/Settings":10,"./assets/scripts/kbengine":16,"./assets/scripts/AudioMgr":2,"./assets/scripts/cc_scripts/Seat":9,"./assets/scripts/cc_scripts/GameState":3,"./assets/scripts/cc_scripts/StartScene":4,"./assets/scripts/cc_scripts/WorldScene":15,"./assets/scripts/cc_scripts/WxBizDataCrypt":14,"./assets/scripts/cc_scripts/eval":26,"./assets/scripts/cc_scripts/eval2":13,"./assets/scripts/cc_scripts/GameOver":12,"./assets/scripts/kbe_scripts/Avatar":1,"./assets/migration/use_v2.0.x_cc.Toggle_event":5},"path":"preview-scripts/__qc_index__.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/kbe_scripts/Avatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AudioMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/GameState.js"},{"deps":{"kbengine":16,"AudioMgr":2,"WxBizDataCrypt":14},"path":"preview-scripts/assets/scripts/cc_scripts/StartScene.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/RadioGroupMgr.js"},{"deps":{"RadioGroupMgr":6},"path":"preview-scripts/assets/scripts/RadioButton.js"},{"deps":{},"path":"preview-scripts/assets/scripts/JoinGameInput.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/Seat.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/Settings.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/Chat.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/cc_scripts/GameOver.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval2.js"},{"deps":{"buffer":18,"crypto":17},"path":"preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js"},{"deps":{"kbengine":16,"eval2":13},"path":"preview-scripts/assets/scripts/cc_scripts/WorldScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/kbengine.js"},{"deps":{"randomfill":28,"randombytes":19,"create-hash":20,"pbkdf2":22,"browserify-sign/algos":47,"diffie-hellman":23,"create-hmac":21,"create-ecdh":24,"public-encrypt":25,"browserify-cipher":48,"browserify-sign":49},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":29,"isarray":30},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"safe-buffer":40,"../process/browser.js":34},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":41,"ripemd160":44,"sha.js":42,"cipher-base":46,"md5.js":43},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"inherits":41,"safe-buffer":40,"./legacy":33,"create-hash/md5":45,"sha.js":42,"cipher-base":46,"ripemd160":44},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"./lib/sync":36,"./lib/async":32},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"buffer":18,"./lib/primes.json":35,"./lib/generatePrime":31,"./lib/dh":39},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"buffer":18,"bn.js":51,"elliptic":50},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"./publicEncrypt":37,"./privateDecrypt":38},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{"../process/browser.js":34,"safe-buffer":40,"randombytes":19},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"randombytes":19,"bn.js":78,"miller-rabin":70},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"./sync":36,"../../process/browser.js":34,"safe-buffer":40,"./default-encoding":53,"./precondition":54},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"inherits":41,"safe-buffer":40,"cipher-base":46},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"./precondition":54,"./default-encoding":53,"create-hash/md5":45,"ripemd160":44,"sha.js":42,"safe-buffer":40},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{"randombytes":19,"create-hash":20,"safe-buffer":40,"parse-asn1":63,"bn.js":76,"./xor":56,"./mgf":52,"browserify-rsa":97,"./withPublic":55},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":52,"./xor":56,"./withPublic":55,"create-hash":20,"safe-buffer":40,"bn.js":76,"parse-asn1":63,"browserify-rsa":97},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"./generatePrime":31,"buffer":18,"randombytes":19,"bn.js":78,"miller-rabin":70},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"./sha512":58,"./sha1":59,"./sha":60,"./sha384":61,"./sha256":62,"./sha224":57},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"inherits":41,"safe-buffer":40,"hash-base":67},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"buffer":18,"inherits":41,"hash-base":67},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"md5.js":43},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"safe-buffer":40,"inherits":41,"string_decoder":65,"stream":64},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"./browser/algorithms.json":82},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"evp_bytestokey":77,"browserify-des/modes":109,"browserify-des":112,"browserify-aes/modes":110,"browserify-aes/browser":111},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"buffer":18,"./algorithms.json":82,"inherits":41,"create-hash":20,"./verify":81,"./sign":83,"readable-stream":116},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":72,"brorand":75,"./elliptic/curve":68,"./elliptic/eddsa":71,"./elliptic/utils":66,"./elliptic/ec":69,"./elliptic/curves":73},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{"create-hash":20,"safe-buffer":40},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"../../process/browser.js":34},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"bn.js":76,"safe-buffer":40},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"./sha256":62,"inherits":41,"safe-buffer":40,"./hash":80},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":80,"inherits":41,"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"./hash":80,"inherits":41,"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./hash":80,"inherits":41,"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./sha512":58,"./hash":80,"inherits":41,"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":80,"inherits":41,"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"pbkdf2":22,"safe-buffer":40,"browserify-aes":111,"./aesid.json":84,"./fixProc":85,"./asn1":86},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":41,"events":87,"readable-stream/passthrough.js":100,"readable-stream/transform.js":101,"readable-stream/duplex.js":103,"readable-stream/writable.js":94,"readable-stream/readable.js":102},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"bn.js":113,"minimalistic-assert":98,"minimalistic-crypto-utils":105},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"inherits":41,"safe-buffer":104,"readable-stream":107},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"./mont":88,"./short":89,"./base":90,"./edwards":91},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../utils":66,"../curves":73,"brorand":75,"./key":93,"./signature":95,"hmac-drbg":106,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{"brorand":75,"bn.js":115},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"../curves":73,"../utils":66,"hash.js":108,"./key":99,"./signature":96},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":68,"./utils":66,"./precomputed/secp256k1":92,"hash.js":108},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"crypto":74},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{"safe-buffer":40,"md5.js":43},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/is-buffer/index.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{"buffer":18,"parse-asn1":63,"elliptic":50,"bn.js":135,"./curves.json":133},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{"buffer":18,"./curves.json":133,"create-hmac":21,"elliptic":50,"parse-asn1":63,"browserify-rsa":97,"bn.js":135},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"evp_bytestokey":77,"safe-buffer":40,"browserify-aes":111},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{"./certificate":117,"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"./base":90,"../utils":66,"bn.js":113,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":66,"./base":90,"bn.js":113,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":66,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"../utils":66,"./base":90,"bn.js":113,"inherits":41},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"../utils":66,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"./lib/_stream_writable.js":114},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{"../utils":66,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{"../utils":66,"bn.js":113},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"buffer":18,"randombytes":19,"bn.js":210},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"../utils":66},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"./readable":102},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./readable":102},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"./lib/_stream_writable.js":114,"./lib/_stream_passthrough.js":118,"./lib/_stream_duplex.js":119,"./lib/_stream_transform.js":120,"./lib/_stream_readable.js":121},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"./lib/_stream_duplex.js":119},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"hash.js":108,"minimalistic-crypto-utils":105,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./lib/_stream_transform.js":125,"./lib/_stream_duplex.js":127,"./lib/_stream_writable.js":128,"./lib/_stream_passthrough.js":129,"./lib/internal/streams/pipeline.js":134,"./lib/internal/streams/end-of-stream.js":136,"./lib/_stream_readable.js":124},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"./hash/utils":123,"./hash/ripemd":131,"./hash/common":126,"./hash/hmac":132,"./hash/sha":130},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./ecb":157,"./list.json":161,"./cfb8":159,"./cfb1":160,"./ofb":162,"./cbc":156,"./cfb":158,"./ctr":163},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"./modes/list.json":161,"./decrypter":170,"./encrypter":168},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"cipher-base":46,"inherits":41,"safe-buffer":40,"des.js":171},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_duplex":119,"../../process/browser.js":34,"inherits":41,"safe-buffer":40,"util-deprecate":139,"process-nextick-args":137,"./internal/streams/stream":138,"core-util-is":145,"./internal/streams/destroy":146},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"./lib/_stream_duplex.js":169,"./lib/_stream_passthrough.js":172,"./lib/internal/streams/pipeline.js":176,"./lib/internal/streams/end-of-stream.js":179,"./lib/_stream_transform.js":174,"./lib/_stream_writable.js":178,"./lib/_stream_readable.js":189},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"./_stream_transform":120,"core-util-is":145,"inherits":41},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_readable":121,"./_stream_writable":114,"process-nextick-args":137,"core-util-is":145,"inherits":41},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_duplex":119,"core-util-is":145,"inherits":41},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"events":87,"./internal/streams/stream":138,"util":74,"./internal/streams/destroy":146,"./_stream_duplex":119,"../../process/browser.js":34,"process-nextick-args":137,"safe-buffer":40,"core-util-is":145,"inherits":41,"./internal/streams/BufferList":147,"isarray":173,"string_decoder/":175},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./asn1/constants":140,"bn.js":184,"./asn1/decoders":141,"./asn1/base":142,"./asn1/encoders":144,"./asn1/api":143},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"minimalistic-assert":98,"inherits":41},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"events":87,"buffer":18,"util":74,"./_stream_duplex":127,"../../../../process/browser.js":34,"inherits":41,"../errors":151,"./internal/streams/from":155,"./internal/streams/stream":148,"./internal/streams/state":149,"./internal/streams/buffer_list":150,"./internal/streams/destroy":152,"./internal/streams/async_iterator":154,"string_decoder/":177},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../errors":151,"./_stream_duplex":127,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./utils":123,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"./_stream_readable":124,"./_stream_writable":128,"../../../../process/browser.js":34,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"buffer":18,"./internal/streams/stream":148,"./internal/streams/destroy":152,"./internal/streams/state":149,"../errors":151,"./_stream_duplex":127,"../../../../process/browser.js":34,"util-deprecate":139,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./_stream_transform":125,"inherits":41},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./sha/384":165,"./sha/224":164,"./sha/256":166,"./sha/512":167,"./sha/1":153},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":123,"./common":126},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./utils":123,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"../../../errors":151,"./end-of-stream":136},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":151},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../process/browser.js":34},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"./der":180},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./pem":181,"./der":183},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./reporter":182,"./buffer":185,"./node":187},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"../asn1":122,"inherits":41,"vm":186},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./der":188,"./pem":190},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"../../is-buffer/index.js":79},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"process-nextick-args":137},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"util":74,"safe-buffer":40},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":151},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"buffer":18,"util":74},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../utils":123,"../common":126,"./common":191},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"./end-of-stream":136,"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":40,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"buffer":18,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":40,"buffer-xor":197,"../incr32":198},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"../utils":123,"./256":166},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":123,"./512":167},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":123,"../common":126,"./common":191,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":123,"../common":126,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"./modes":110,"safe-buffer":40,"cipher-base":46,"evp_bytestokey":77,"inherits":41,"./streamCipher":200,"./aes":202,"./authCipher":201},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{"./_stream_readable":189,"./_stream_writable":178,"../../../../process/browser.js":34,"inherits":41},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./authCipher":201,"./modes":110,"./streamCipher":200,"./aes":202,"safe-buffer":40,"cipher-base":46,"evp_bytestokey":77,"inherits":41},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"./des/utils":192,"./des/cbc":193,"./des/ede":194,"./des/des":195,"./des/cipher":196},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"./_stream_transform":174,"inherits":41},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./_stream_duplex":169,"inherits":41,"../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../../../errors":203,"./end-of-stream":179},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"safe-buffer":104},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":18,"../errors":203,"./_stream_duplex":169,"../../../../process/browser.js":34,"util-deprecate":139,"inherits":41,"./internal/streams/stream":204,"./internal/streams/state":205,"./internal/streams/destroy":206},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"../../../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../constants":140},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"buffer":18,"./der":183,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"../../asn1":122,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"../base":142,"buffer":18,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"indexof":199},"path":"preview-scripts/__node_modules/vm-browserify/index.js"},{"deps":{"../base":142,"minimalistic-assert":98},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"buffer":18,"../../asn1":122,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"./internal/streams/stream":204,"events":87,"buffer":18,"util":74,"./internal/streams/destroy":206,"./internal/streams/state":205,"../errors":203,"./_stream_duplex":169,"../../../../process/browser.js":34,"inherits":41,"./internal/streams/from":209,"./internal/streams/async_iterator":207,"./internal/streams/buffer_list":208,"string_decoder/":212},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./der":188,"inherits":41},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"../utils":123},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"minimalistic-assert":98,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"./cipher":196,"./des":195,"minimalistic-assert":98,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"./utils":192,"./cipher":196,"minimalistic-assert":98,"inherits":41},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":98},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{"./aes":202,"cipher-base":46,"safe-buffer":40,"inherits":41},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":202,"./incr32":198,"safe-buffer":40,"inherits":41,"cipher-base":46,"buffer-xor":197,"./ghash":211},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"events":87},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":203},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../../../../../../process/browser.js":34,"./end-of-stream":179},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"buffer":18,"util":74},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":74},"path":"preview-scripts/__node_modules/browserify-rsa/node_modules/bn.js/lib/bn.js"},{"deps":{"safe-buffer":40},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"safe-buffer":213},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"}];
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
    