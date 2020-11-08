
(function () {
var scripts = [{"deps":{"./assets/scripts/RadioButton":212,"./assets/scripts/Chat":8,"./assets/scripts/RadioGroupMgr":213,"./assets/scripts/Settings":3,"./assets/scripts/kbengine":14,"./assets/scripts/AudioMgr":6,"./assets/migration/use_v2.0.x_cc.Toggle_event":5,"./assets/scripts/cc_scripts/Seat":12,"./assets/scripts/cc_scripts/WorldScene":13,"./assets/scripts/cc_scripts/GameOver":10,"./assets/scripts/cc_scripts/StartScene":4,"./assets/scripts/cc_scripts/eval":27,"./assets/scripts/cc_scripts/WxBizDataCrypt":9,"./assets/scripts/cc_scripts/eval2":11,"./assets/scripts/cc_scripts/GameState":2,"./assets/scripts/kbe_scripts/Avatar":1,"./assets/scripts/JoinGameInput":7},"path":"preview-scripts/__qc_index__.js"},{"deps":{"kbengine":14},"path":"preview-scripts/assets/scripts/kbe_scripts/Avatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/GameState.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Settings.js"},{"deps":{"kbengine":14,"WxBizDataCrypt":9,"AudioMgr":6},"path":"preview-scripts/assets/scripts/cc_scripts/StartScene.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AudioMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/JoinGameInput.js"},{"deps":{"kbengine":14},"path":"preview-scripts/assets/scripts/Chat.js"},{"deps":{"buffer":16,"crypto":15},"path":"preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js"},{"deps":{"kbengine":14},"path":"preview-scripts/assets/scripts/cc_scripts/GameOver.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval2.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/Seat.js"},{"deps":{"kbengine":14,"eval2":11},"path":"preview-scripts/assets/scripts/cc_scripts/WorldScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/kbengine.js"},{"deps":{"randombytes":18,"randomfill":25,"pbkdf2":23,"browserify-sign/algos":45,"diffie-hellman":20,"create-hmac":19,"create-hash":17,"create-ecdh":21,"browserify-cipher":46,"public-encrypt":22,"browserify-sign":47},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":24,"ieee754":26,"isarray":28},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"inherits":38,"ripemd160":44,"sha.js":37,"cipher-base":43,"md5.js":40},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"../process/browser.js":32,"safe-buffer":42},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":38,"./legacy":31,"safe-buffer":42,"create-hash/md5":41,"ripemd160":44,"sha.js":37,"cipher-base":43},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"buffer":16,"./lib/primes.json":33,"./lib/generatePrime":29,"./lib/dh":36},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"buffer":16,"bn.js":54,"elliptic":48},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{"./publicEncrypt":34,"./privateDecrypt":35},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{"./lib/sync":39,"./lib/async":30},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{"randombytes":18,"safe-buffer":42,"../process/browser.js":32},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"randombytes":18,"bn.js":74,"miller-rabin":70},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"./sync":39,"../../process/browser.js":32,"safe-buffer":42,"./default-encoding":50,"./precondition":49},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"inherits":38,"safe-buffer":42,"cipher-base":43},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"randombytes":18,"create-hash":17,"safe-buffer":42,"parse-asn1":61,"bn.js":76,"./xor":51,"./mgf":52,"./withPublic":53,"browserify-rsa":95},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"./mgf":52,"./xor":51,"./withPublic":53,"safe-buffer":42,"create-hash":17,"browserify-rsa":95,"bn.js":76,"parse-asn1":61},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"./generatePrime":29,"buffer":16,"randombytes":18,"bn.js":74,"miller-rabin":70},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"./sha1":56,"./sha224":57,"./sha256":58,"./sha384":59,"./sha512":60,"./sha":55},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"./precondition":49,"./default-encoding":50,"create-hash/md5":41,"ripemd160":44,"sha.js":37,"safe-buffer":42},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{"inherits":38,"safe-buffer":42,"hash-base":62},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"md5.js":40},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"buffer":16},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{"safe-buffer":42,"inherits":38,"string_decoder":63,"stream":64},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"buffer":16,"inherits":38,"hash-base":62},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{"./browser/algorithms.json":79},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"browserify-aes/browser":108,"evp_bytestokey":73,"browserify-des/modes":109,"browserify-des":107,"browserify-aes/modes":115},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"buffer":16,"./algorithms.json":79,"create-hash":17,"inherits":38,"./verify":82,"./sign":83,"readable-stream":113},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":69,"brorand":72,"./elliptic/curve":66,"./elliptic/eddsa":67,"./elliptic/utils":65,"./elliptic/ec":68,"./elliptic/curves":71},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{"../../is-buffer/index.js":77},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"../../process/browser.js":32},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"create-hash":17,"safe-buffer":42},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"bn.js":76,"safe-buffer":42},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{"inherits":38,"safe-buffer":42,"./hash":78},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./hash":78,"inherits":38,"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./sha256":58,"./hash":78,"inherits":38,"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":78,"inherits":38,"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./sha512":60,"./hash":78,"inherits":38,"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"./hash":78,"inherits":38,"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"pbkdf2":23,"safe-buffer":42,"./aesid.json":80,"./fixProc":84,"./asn1":81,"browserify-aes":108},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"inherits":38,"safe-buffer":102,"readable-stream":104},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"buffer":16},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"inherits":38,"events":86,"readable-stream/passthrough.js":99,"readable-stream/transform.js":101,"readable-stream/duplex.js":98,"readable-stream/writable.js":96,"readable-stream/readable.js":100},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"bn.js":111,"minimalistic-assert":97,"minimalistic-crypto-utils":103},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":87,"./mont":88,"./short":89,"./edwards":90},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../curves":71,"../utils":65,"hash.js":106,"./key":91,"./signature":93},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{"../utils":65,"../curves":71,"brorand":72,"./key":92,"./signature":94,"hmac-drbg":105,"bn.js":111},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"brorand":72,"bn.js":112},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"./curve":66,"./utils":65,"./precomputed/secp256k1":85,"hash.js":106},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"crypto":75},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"safe-buffer":42,"md5.js":40},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/is-buffer/index.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"./certificate":110,"asn1.js":120},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{"buffer":16,"elliptic":48,"parse-asn1":61,"bn.js":132,"./curves.json":131},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"buffer":16,"./curves.json":131,"elliptic":48,"parse-asn1":61,"create-hmac":19,"browserify-rsa":95,"bn.js":132},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"evp_bytestokey":73,"safe-buffer":42,"browserify-aes":108},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"../utils":65,"bn.js":111},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"./base":87,"../utils":65,"bn.js":111,"inherits":38},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":65,"./base":87,"bn.js":111,"inherits":38},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":65,"./base":87,"bn.js":111,"inherits":38},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"../utils":65},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"../utils":65,"bn.js":111},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{"../utils":65,"bn.js":111},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"../utils":65,"bn.js":111},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{"buffer":16,"randombytes":18,"bn.js":207},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"./lib/_stream_writable.js":114},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"./lib/_stream_duplex.js":116},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./readable":100},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./lib/_stream_writable.js":114,"./lib/_stream_duplex.js":116,"./lib/_stream_transform.js":117,"./lib/_stream_passthrough.js":119,"./lib/_stream_readable.js":118},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"./readable":100},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{"buffer":16},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{"./lib/_stream_duplex.js":123,"./lib/_stream_writable.js":124,"./lib/_stream_transform.js":127,"./lib/internal/streams/end-of-stream.js":133,"./lib/_stream_passthrough.js":130,"./lib/internal/streams/pipeline.js":134,"./lib/_stream_readable.js":121},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"hash.js":106,"minimalistic-assert":97,"minimalistic-crypto-utils":103},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./hash/ripemd":128,"./hash/utils":122,"./hash/hmac":125,"./hash/common":126,"./hash/sha":129},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{"cipher-base":43,"safe-buffer":42,"inherits":38,"des.js":153},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"./modes/list.json":161,"./decrypter":162,"./encrypter":159},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"asn1.js":120},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"./lib/_stream_duplex.js":163,"./lib/_stream_passthrough.js":165,"./lib/internal/streams/end-of-stream.js":174,"./lib/internal/streams/pipeline.js":187,"./lib/_stream_transform.js":167,"./lib/_stream_writable.js":185,"./lib/_stream_readable.js":189},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"./_stream_duplex":116,"../../process/browser.js":32,"safe-buffer":42,"inherits":38,"process-nextick-args":141,"core-util-is":152,"util-deprecate":142,"./internal/streams/stream":140,"./internal/streams/destroy":151},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./list.json":161,"./ecb":169,"./cfb8":170,"./cfb1":173,"./ofb":172,"./cfb":175,"./cbc":168,"./ctr":171},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"./_stream_readable":118,"./_stream_writable":114,"inherits":38,"process-nextick-args":141,"core-util-is":152},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./_stream_duplex":116,"inherits":38,"core-util-is":152},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"events":86,"./internal/streams/stream":140,"util":75,"./internal/streams/destroy":151,"./_stream_duplex":116,"../../process/browser.js":32,"safe-buffer":42,"inherits":38,"process-nextick-args":141,"core-util-is":152,"isarray":160,"./internal/streams/BufferList":158,"string_decoder/":164},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./_stream_transform":117,"inherits":38,"core-util-is":152},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"bn.js":177,"./asn1/constants":137,"./asn1/base":136,"./asn1/decoders":138,"./asn1/encoders":139,"./asn1/api":135},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"events":86,"buffer":16,"util":75,"./_stream_duplex":123,"../../../../process/browser.js":32,"inherits":38,"../errors":147,"./internal/streams/stream":143,"./internal/streams/state":144,"./internal/streams/from":148,"./internal/streams/destroy":145,"./internal/streams/buffer_list":146,"./internal/streams/async_iterator":149,"string_decoder/":166},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"minimalistic-assert":97,"inherits":38},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"./_stream_readable":121,"./_stream_writable":124,"../../../../process/browser.js":32,"inherits":38},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./internal/streams/stream":143,"buffer":16,"./internal/streams/state":144,"./internal/streams/destroy":145,"../errors":147,"./_stream_duplex":123,"../../../../process/browser.js":32,"util-deprecate":142,"inherits":38},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./utils":122,"minimalistic-assert":97},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./utils":122,"minimalistic-assert":97},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"../errors":147,"./_stream_duplex":123,"inherits":38},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./utils":122,"./common":126},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"./sha/224":154,"./sha/384":156,"./sha/256":155,"./sha/512":157,"./sha/1":150},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./_stream_transform":127,"inherits":38},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"../../../errors":147},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"../../../errors":147,"./end-of-stream":133},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"../asn1":120,"inherits":38,"vm":181},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./reporter":176,"./node":178,"./buffer":179},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"./der":180},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./pem":182,"./der":184},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"./pem":183,"./der":186},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"events":86},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../process/browser.js":32},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"events":86},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":147},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"buffer":16,"util":75},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"./end-of-stream":133,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"../utils":122,"../common":126,"./common":190},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"process-nextick-args":141},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../../is-buffer/index.js":77},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"./des/utils":188,"./des/des":191,"./des/cbc":192,"./des/cipher":193,"./des/ede":194},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{"../utils":122,"./256":155},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":122,"../common":126,"./common":190,"minimalistic-assert":97},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":122,"./512":157},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":122,"../common":126,"minimalistic-assert":97},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"util":75,"safe-buffer":42},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"./modes":115,"safe-buffer":42,"cipher-base":43,"evp_bytestokey":73,"inherits":38,"./streamCipher":196,"./aes":199,"./authCipher":197},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"./authCipher":197,"./streamCipher":196,"./modes":115,"./aes":199,"safe-buffer":42,"cipher-base":43,"evp_bytestokey":73,"inherits":38},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{"./_stream_writable":185,"./_stream_readable":189,"../../../../process/browser.js":32,"inherits":38},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./_stream_transform":167,"inherits":38},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"safe-buffer":102},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"./_stream_duplex":163,"inherits":38,"../errors":201},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"buffer-xor":198},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"safe-buffer":42,"buffer-xor":198,"../incr32":200},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"buffer":16,"buffer-xor":198},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"../../../errors":201},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"safe-buffer":42,"buffer-xor":198},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"../base":136,"minimalistic-assert":97},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"../base":136,"buffer":16,"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"../constants":137},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"indexof":195},"path":"preview-scripts/__node_modules/vm-browserify/index.js"},{"deps":{"buffer":16,"./der":184,"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"./der":186,"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"../../asn1":120,"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"buffer":16,"../errors":201,"../../../../process/browser.js":32,"./_stream_duplex":163,"util-deprecate":142,"inherits":38,"./internal/streams/stream":202,"./internal/streams/state":203,"./internal/streams/destroy":204},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"buffer":16,"../../asn1":120,"inherits":38},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"../../../errors":201,"./end-of-stream":174},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"events":86,"./internal/streams/stream":202,"buffer":16,"./internal/streams/destroy":204,"util":75,"./internal/streams/state":203,"../errors":201,"./_stream_duplex":163,"../../../../process/browser.js":32,"inherits":38,"./internal/streams/from":206,"./internal/streams/async_iterator":205,"./internal/streams/buffer_list":208,"string_decoder/":210},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"../utils":122},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"./utils":188,"./cipher":193,"minimalistic-assert":97,"inherits":38},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":97,"inherits":38},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"minimalistic-assert":97},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./cipher":193,"./des":191,"minimalistic-assert":97,"inherits":38},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{"./aes":199,"safe-buffer":42,"cipher-base":43,"inherits":38},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"./aes":199,"./incr32":200,"safe-buffer":42,"cipher-base":43,"inherits":38,"buffer-xor":198,"./ghash":209},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{"buffer":16},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"events":86},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../errors":201},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"./end-of-stream":174,"../../../../../../process/browser.js":32},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"buffer":75},"path":"preview-scripts/__node_modules/browserify-rsa/node_modules/bn.js/lib/bn.js"},{"deps":{"util":75,"buffer":16},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"safe-buffer":42},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"safe-buffer":211},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":16},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"},{"deps":{"RadioGroupMgr":213},"path":"preview-scripts/assets/scripts/RadioButton.js"},{"deps":{},"path":"preview-scripts/assets/scripts/RadioGroupMgr.js"}];
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
    