
(function () {
var scripts = [{"deps":{"./assets/migration/use_v2.0.x_cc.Toggle_event":1,"./assets/scripts/RadioGroupMgr":3,"./assets/scripts/cc_scripts/GameOver":4,"./assets/scripts/AudioMgr":6,"./assets/scripts/Settings":7,"./assets/scripts/JoinGameInput":8,"./assets/scripts/cc_scripts/eval2":10,"./assets/scripts/Chat":11,"./assets/scripts/cc_scripts/Seat":13,"./assets/scripts/cc_scripts/GameState":14,"./assets/scripts/RadioButton":12,"./assets/scripts/cc_scripts/WorldScene":15,"./assets/scripts/kbengine":16,"./assets/scripts/kbe_scripts/Avatar":2,"./assets/scripts/cc_scripts/eval":29,"./assets/scripts/cc_scripts/WxBizDataCrypt":9,"./assets/scripts/cc_scripts/StartScene":5},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/kbe_scripts/Avatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/RadioGroupMgr.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/cc_scripts/GameOver.js"},{"deps":{"kbengine":16,"AudioMgr":6,"WxBizDataCrypt":9},"path":"preview-scripts/assets/scripts/cc_scripts/StartScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AudioMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Settings.js"},{"deps":{},"path":"preview-scripts/assets/scripts/JoinGameInput.js"},{"deps":{"buffer":18,"crypto":17},"path":"preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval2.js"},{"deps":{"kbengine":16},"path":"preview-scripts/assets/scripts/Chat.js"},{"deps":{"RadioGroupMgr":3},"path":"preview-scripts/assets/scripts/RadioButton.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/Seat.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/GameState.js"},{"deps":{"kbengine":16,"eval2":10},"path":"preview-scripts/assets/scripts/cc_scripts/WorldScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/kbengine.js"},{"deps":{"randomfill":24,"randombytes":21,"create-hmac":20,"pbkdf2":19,"browserify-sign/algos":46,"diffie-hellman":25,"create-hash":22,"create-ecdh":26,"public-encrypt":23,"browserify-cipher":48,"browserify-sign":49},"path":"preview-scripts/__node_modules/crypto-browserify/index.js"},{"deps":{"base64-js":27,"ieee754":28,"isarray":30},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{"./lib/sync":33,"./lib/async":32},"path":"preview-scripts/__node_modules/pbkdf2/browser.js"},{"deps":{"inherits":40,"cipher-base":41,"safe-buffer":39,"ripemd160":43,"sha.js":42,"./legacy":31,"create-hash/md5":38},"path":"preview-scripts/__node_modules/create-hmac/browser.js"},{"deps":{"../process/browser.js":34,"safe-buffer":39},"path":"preview-scripts/__node_modules/randombytes/browser.js"},{"deps":{"inherits":40,"ripemd160":43,"sha.js":42,"cipher-base":41,"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/browser.js"},{"deps":{"./privateDecrypt":35,"./publicEncrypt":36},"path":"preview-scripts/__node_modules/public-encrypt/browser.js"},{"deps":{"randombytes":21,"safe-buffer":39,"../process/browser.js":34},"path":"preview-scripts/__node_modules/randomfill/browser.js"},{"deps":{"buffer":18,"./lib/primes.json":44,"./lib/dh":47,"./lib/generatePrime":37},"path":"preview-scripts/__node_modules/diffie-hellman/browser.js"},{"deps":{"buffer":18,"bn.js":66,"elliptic":50},"path":"preview-scripts/__node_modules/create-ecdh/browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/assets/scripts/cc_scripts/eval.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"inherits":40,"cipher-base":41,"safe-buffer":39},"path":"preview-scripts/__node_modules/create-hmac/legacy.js"},{"deps":{"./sync":33,"../../process/browser.js":34,"safe-buffer":39,"./default-encoding":52,"./precondition":54},"path":"preview-scripts/__node_modules/pbkdf2/lib/async.js"},{"deps":{"./precondition":54,"./default-encoding":52,"create-hash/md5":38,"ripemd160":43,"sha.js":42,"safe-buffer":39},"path":"preview-scripts/__node_modules/pbkdf2/lib/sync-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{"create-hash":22,"safe-buffer":39,"parse-asn1":63,"bn.js":76,"./xor":51,"browserify-rsa":93,"./mgf":53,"./withPublic":55},"path":"preview-scripts/__node_modules/public-encrypt/privateDecrypt.js"},{"deps":{"./mgf":53,"./xor":51,"./withPublic":55,"randombytes":21,"create-hash":22,"safe-buffer":39,"bn.js":76,"parse-asn1":63,"browserify-rsa":93},"path":"preview-scripts/__node_modules/public-encrypt/publicEncrypt.js"},{"deps":{"randombytes":21,"bn.js":77,"miller-rabin":67},"path":"preview-scripts/__node_modules/diffie-hellman/lib/generatePrime.js"},{"deps":{"md5.js":45},"path":"preview-scripts/__node_modules/create-hash/md5.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/safe-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/inherits/inherits_browser.js"},{"deps":{"safe-buffer":39,"inherits":40,"string_decoder":62,"stream":56},"path":"preview-scripts/__node_modules/cipher-base/index.js"},{"deps":{"./sha":58,"./sha256":59,"./sha224":60,"./sha512":61,"./sha384":64,"./sha1":57},"path":"preview-scripts/__node_modules/sha.js/index.js"},{"deps":{"buffer":18,"inherits":40,"hash-base":65},"path":"preview-scripts/__node_modules/ripemd160/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/diffie-hellman/lib/primes.js"},{"deps":{"inherits":40,"safe-buffer":39,"hash-base":65},"path":"preview-scripts/__node_modules/md5.js/index.js"},{"deps":{"./browser/algorithms.json":79},"path":"preview-scripts/__node_modules/browserify-sign/algos.js"},{"deps":{"./generatePrime":37,"buffer":18,"bn.js":77,"miller-rabin":67,"randombytes":21},"path":"preview-scripts/__node_modules/diffie-hellman/lib/dh.js"},{"deps":{"evp_bytestokey":74,"browserify-des/modes":108,"browserify-des":110,"browserify-aes/modes":116,"browserify-aes/browser":109},"path":"preview-scripts/__node_modules/browserify-cipher/browser.js"},{"deps":{"buffer":18,"./algorithms.json":79,"inherits":40,"create-hash":22,"./sign":82,"./verify":83,"readable-stream":115},"path":"preview-scripts/__node_modules/browserify-sign/browser/index.js"},{"deps":{"../package.json":72,"brorand":75,"./elliptic/curves":73,"./elliptic/curve":69,"./elliptic/utils":68,"./elliptic/ec":71,"./elliptic/eddsa":70},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic.js"},{"deps":{},"path":"preview-scripts/__node_modules/public-encrypt/xor.js"},{"deps":{"../../process/browser.js":34},"path":"preview-scripts/__node_modules/pbkdf2/lib/default-encoding.js"},{"deps":{"create-hash":22,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/mgf.js"},{"deps":{"../../is-buffer/index.js":78},"path":"preview-scripts/__node_modules/pbkdf2/lib/precondition.js"},{"deps":{"bn.js":76,"safe-buffer":39},"path":"preview-scripts/__node_modules/public-encrypt/withPublic.js"},{"deps":{"inherits":40,"events":80,"readable-stream/passthrough.js":88,"readable-stream/transform.js":89,"readable-stream/duplex.js":91,"readable-stream/writable.js":84,"readable-stream/readable.js":92},"path":"preview-scripts/__node_modules/stream-browserify/index.js"},{"deps":{"inherits":40,"safe-buffer":39,"./hash":81},"path":"preview-scripts/__node_modules/sha.js/sha1.js"},{"deps":{"./hash":81,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha.js"},{"deps":{"./hash":81,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha256.js"},{"deps":{"./sha256":59,"./hash":81,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha224.js"},{"deps":{"./hash":81,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha512.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/string_decoder/index.js"},{"deps":{"pbkdf2":19,"safe-buffer":39,"browserify-aes":109,"./aesid.json":87,"./fixProc":86,"./asn1":85},"path":"preview-scripts/__node_modules/parse-asn1/index.js"},{"deps":{"./sha512":61,"./hash":81,"inherits":40,"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/sha384.js"},{"deps":{"inherits":40,"safe-buffer":105,"readable-stream":104},"path":"preview-scripts/__node_modules/hash-base/index.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/create-ecdh/node_modules/bn.js/lib/bn.js"},{"deps":{"brorand":75,"bn.js":118},"path":"preview-scripts/__node_modules/miller-rabin/lib/mr.js"},{"deps":{"bn.js":117,"minimalistic-assert":101,"minimalistic-crypto-utils":107},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/utils.js"},{"deps":{"./base":94,"./mont":95,"./edwards":97,"./short":98},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/index.js"},{"deps":{"../curves":73,"../utils":68,"./key":96,"./signature":99,"hash.js":106},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/index.js"},{"deps":{"../utils":68,"../curves":73,"brorand":75,"./key":100,"./signature":102,"hmac-drbg":111,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/package.js"},{"deps":{"./curve":69,"./utils":68,"hash.js":106,"./precomputed/secp256k1":103},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curves.js"},{"deps":{"safe-buffer":39,"md5.js":45},"path":"preview-scripts/__node_modules/evp_bytestokey/index.js"},{"deps":{"crypto":90},"path":"preview-scripts/__node_modules/brorand/index.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/public-encrypt/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/diffie-hellman/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/is-buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/algorithms.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/sha.js/hash.js"},{"deps":{"buffer":18,"create-hmac":20,"elliptic":50,"parse-asn1":63,"bn.js":134,"browserify-rsa":93,"./curves.json":128},"path":"preview-scripts/__node_modules/browserify-sign/browser/sign.js"},{"deps":{"buffer":18,"./curves.json":128,"elliptic":50,"parse-asn1":63,"bn.js":134},"path":"preview-scripts/__node_modules/browserify-sign/browser/verify.js"},{"deps":{"./lib/_stream_writable.js":112},"path":"preview-scripts/__node_modules/readable-stream/writable-browser.js"},{"deps":{"./certificate":113,"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/asn1.js"},{"deps":{"evp_bytestokey":74,"safe-buffer":39,"browserify-aes":109},"path":"preview-scripts/__node_modules/parse-asn1/fixProc.js"},{"deps":{},"path":"preview-scripts/__node_modules/parse-asn1/aesid.js"},{"deps":{"./readable":92},"path":"preview-scripts/__node_modules/readable-stream/passthrough.js"},{"deps":{"./readable":92},"path":"preview-scripts/__node_modules/readable-stream/transform.js"},{"deps":{},"path":"preview-scripts/__node_modules/browser-resolve/empty.js"},{"deps":{"./lib/_stream_duplex.js":114},"path":"preview-scripts/__node_modules/readable-stream/duplex-browser.js"},{"deps":{"./lib/_stream_writable.js":112,"./lib/_stream_duplex.js":114,"./lib/_stream_passthrough.js":119,"./lib/_stream_transform.js":120,"./lib/_stream_readable.js":121},"path":"preview-scripts/__node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":18,"randombytes":21,"bn.js":207},"path":"preview-scripts/__node_modules/browserify-rsa/index.js"},{"deps":{"../utils":68,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/base.js"},{"deps":{"./base":94,"../utils":68,"bn.js":117,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/mont.js"},{"deps":{"../utils":68},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/key.js"},{"deps":{"../utils":68,"./base":94,"inherits":40,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/edwards.js"},{"deps":{"../utils":68,"./base":94,"bn.js":117,"inherits":40},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/curve/short.js"},{"deps":{"../utils":68,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/eddsa/signature.js"},{"deps":{"../utils":68,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/key.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-assert/index.js"},{"deps":{"../utils":68,"bn.js":117},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/ec/signature.js"},{"deps":{},"path":"preview-scripts/__node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"},{"deps":{"./lib/_stream_passthrough.js":124,"./lib/internal/streams/end-of-stream.js":130,"./lib/_stream_transform.js":125,"./lib/_stream_duplex.js":126,"./lib/internal/streams/pipeline.js":136,"./lib/_stream_writable.js":123,"./lib/_stream_readable.js":127},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/readable-browser.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/hash-base/node_modules/safe-buffer/index.js"},{"deps":{"./hash/utils":129,"./hash/ripemd":135,"./hash/hmac":132,"./hash/common":133,"./hash/sha":131},"path":"preview-scripts/__node_modules/hash.js/lib/hash.js"},{"deps":{},"path":"preview-scripts/__node_modules/minimalistic-crypto-utils/lib/utils.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-des/modes.js"},{"deps":{"./modes/list.json":157,"./encrypter":158,"./decrypter":156},"path":"preview-scripts/__node_modules/browserify-aes/browser.js"},{"deps":{"cipher-base":41,"safe-buffer":39,"inherits":40,"des.js":163},"path":"preview-scripts/__node_modules/browserify-des/index.js"},{"deps":{"hash.js":106,"minimalistic-crypto-utils":107,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hmac-drbg/lib/hmac-drbg.js"},{"deps":{"./_stream_duplex":114,"../../process/browser.js":34,"inherits":40,"safe-buffer":39,"util-deprecate":139,"process-nextick-args":137,"./internal/streams/stream":138,"core-util-is":145,"./internal/streams/destroy":146},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"asn1.js":122},"path":"preview-scripts/__node_modules/parse-asn1/certificate.js"},{"deps":{"./_stream_readable":121,"./_stream_writable":112,"process-nextick-args":137,"core-util-is":145,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"./lib/_stream_duplex.js":165,"./lib/_stream_passthrough.js":172,"./lib/internal/streams/end-of-stream.js":175,"./lib/internal/streams/pipeline.js":188,"./lib/_stream_transform.js":170,"./lib/_stream_writable.js":181,"./lib/_stream_readable.js":191},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/readable-browser.js"},{"deps":{"./list.json":157,"./ecb":168,"./cfb8":171,"./ofb":173,"./cbc":167,"./cfb1":174,"./cfb":169,"./ctr":176},"path":"preview-scripts/__node_modules/browserify-aes/modes/index.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/elliptic/node_modules/bn.js/lib/bn.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/miller-rabin/node_modules/bn.js/lib/bn.js"},{"deps":{"./_stream_transform":120,"core-util-is":145,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"./_stream_duplex":114,"core-util-is":145,"inherits":40},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./internal/streams/stream":138,"events":80,"util":90,"./_stream_duplex":114,"../../process/browser.js":34,"./internal/streams/destroy":146,"process-nextick-args":137,"safe-buffer":39,"core-util-is":145,"inherits":40,"./internal/streams/BufferList":147,"isarray":164,"string_decoder/":166},"path":"preview-scripts/__node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{"./asn1/constants":140,"bn.js":183,"./asn1/base":141,"./asn1/decoders":142,"./asn1/encoders":144,"./asn1/api":143},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1.js"},{"deps":{"buffer":18,"./_stream_duplex":126,"../../../../process/browser.js":34,"util-deprecate":139,"inherits":40,"../errors":151,"./internal/streams/stream":148,"./internal/streams/destroy":149,"./internal/streams/state":150},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"./_stream_transform":125,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"../errors":151,"./_stream_duplex":126,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"./_stream_readable":127,"./_stream_writable":123,"../../../../process/browser.js":34,"inherits":40},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"events":80,"./internal/streams/stream":148,"buffer":18,"util":90,"./internal/streams/destroy":149,"./internal/streams/state":150,"../errors":151,"./_stream_duplex":126,"../../../../process/browser.js":34,"inherits":40,"./internal/streams/from":154,"./internal/streams/buffer_list":153,"./internal/streams/async_iterator":155,"string_decoder/":178},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/browser/curves.js"},{"deps":{"inherits":40,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hash.js/lib/hash/utils.js"},{"deps":{"../../../errors":151},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"./sha/224":159,"./sha/384":160,"./sha/256":161,"./sha/512":162,"./sha/1":152},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha.js"},{"deps":{"./utils":129,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hash.js/lib/hash/hmac.js"},{"deps":{"./utils":129,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hash.js/lib/hash/common.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/bn.js/lib/bn.js"},{"deps":{"./utils":129,"./common":133},"path":"preview-scripts/__node_modules/hash.js/lib/hash/ripemd.js"},{"deps":{"../../../errors":151,"./end-of-stream":130},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"../process/browser.js":34},"path":"preview-scripts/__node_modules/process-nextick-args/index.js"},{"deps":{"events":80},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/util-deprecate/browser.js"},{"deps":{"./der":179},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/index.js"},{"deps":{"./reporter":177,"./buffer":180,"./node":182},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/index.js"},{"deps":{"./pem":185,"./der":186},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/index.js"},{"deps":{"../asn1":122,"inherits":40,"vm":187},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/api.js"},{"deps":{"./pem":184,"./der":189},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/index.js"},{"deps":{"../../is-buffer/index.js":78},"path":"preview-scripts/__node_modules/core-util-is/lib/util.js"},{"deps":{"process-nextick-args":137},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"util":90,"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/lib/internal/streams/BufferList.js"},{"deps":{"events":80},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../../../errors":151},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/errors-browser.js"},{"deps":{"../utils":129,"../common":133,"./common":190},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/1.js"},{"deps":{"buffer":18,"util":90},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"./end-of-stream":130,"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/hash-base/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"./modes":116,"safe-buffer":39,"cipher-base":41,"evp_bytestokey":74,"inherits":40,"./streamCipher":198,"./aes":199,"./authCipher":200},"path":"preview-scripts/__node_modules/browserify-aes/decrypter.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/list.js"},{"deps":{"./modes":116,"./authCipher":200,"./streamCipher":198,"./aes":199,"safe-buffer":39,"cipher-base":41,"evp_bytestokey":74,"inherits":40},"path":"preview-scripts/__node_modules/browserify-aes/encrypter.js"},{"deps":{"../utils":129,"./256":161},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/224.js"},{"deps":{"../utils":129,"./512":162},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/384.js"},{"deps":{"../utils":129,"../common":133,"./common":190,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/256.js"},{"deps":{"../utils":129,"../common":133,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/512.js"},{"deps":{"./des/utils":192,"./des/des":193,"./des/cbc":194,"./des/cipher":195,"./des/ede":196},"path":"preview-scripts/__node_modules/des.js/lib/des.js"},{"deps":{},"path":"preview-scripts/__node_modules/readable-stream/node_modules/isarray/index.js"},{"deps":{"./_stream_readable":191,"./_stream_writable":181,"../../../../process/browser.js":34,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_duplex.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cbc.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/modes/ecb.js"},{"deps":{"safe-buffer":39,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb.js"},{"deps":{"./_stream_duplex":165,"inherits":40,"../errors":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_transform.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb8.js"},{"deps":{"./_stream_transform":170,"inherits":40},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_passthrough.js"},{"deps":{"buffer":18,"buffer-xor":197},"path":"preview-scripts/__node_modules/browserify-aes/modes/ofb.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/modes/cfb1.js"},{"deps":{"../../../errors":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"},{"deps":{"buffer-xor":197,"safe-buffer":39,"../incr32":204},"path":"preview-scripts/__node_modules/browserify-aes/modes/ctr.js"},{"deps":{"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/reporter.js"},{"deps":{"safe-buffer":105},"path":"preview-scripts/__node_modules/hash-base/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"../constants":140},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/constants/der.js"},{"deps":{"../base":141,"buffer":18,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/buffer.js"},{"deps":{"buffer":18,"../errors":202,"./_stream_duplex":165,"../../../../process/browser.js":34,"util-deprecate":139,"inherits":40,"./internal/streams/stream":203,"./internal/streams/destroy":205,"./internal/streams/state":206},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_writable.js"},{"deps":{"../base":141,"minimalistic-assert":101},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/base/node.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/asn1.js/node_modules/bn.js/lib/bn.js"},{"deps":{"./der":189,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/pem.js"},{"deps":{"buffer":18,"./der":186,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/pem.js"},{"deps":{"../../asn1":122,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/decoders/der.js"},{"deps":{"indexof":201},"path":"preview-scripts/__node_modules/vm-browserify/index.js"},{"deps":{"./end-of-stream":175,"../../../errors":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/pipeline.js"},{"deps":{"buffer":18,"../../asn1":122,"inherits":40},"path":"preview-scripts/__node_modules/asn1.js/lib/asn1/encoders/der.js"},{"deps":{"../utils":129},"path":"preview-scripts/__node_modules/hash.js/lib/hash/sha/common.js"},{"deps":{"util":90,"buffer":18,"events":80,"./internal/streams/stream":203,"./internal/streams/destroy":205,"../errors":202,"./internal/streams/state":206,"./_stream_duplex":165,"../../../../process/browser.js":34,"inherits":40,"./internal/streams/from":208,"./internal/streams/async_iterator":209,"./internal/streams/buffer_list":210,"string_decoder/":212},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/_stream_readable.js"},{"deps":{},"path":"preview-scripts/__node_modules/des.js/lib/des/utils.js"},{"deps":{"./utils":192,"./cipher":195,"minimalistic-assert":101,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/des.js"},{"deps":{"minimalistic-assert":101,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/cbc.js"},{"deps":{"minimalistic-assert":101},"path":"preview-scripts/__node_modules/des.js/lib/des/cipher.js"},{"deps":{"./cipher":195,"./des":193,"minimalistic-assert":101,"inherits":40},"path":"preview-scripts/__node_modules/des.js/lib/des/ede.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/buffer-xor/index.js"},{"deps":{"./aes":199,"safe-buffer":39,"cipher-base":41,"inherits":40},"path":"preview-scripts/__node_modules/browserify-aes/streamCipher.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/aes.js"},{"deps":{"./aes":199,"./incr32":204,"cipher-base":41,"safe-buffer":39,"inherits":40,"buffer-xor":197,"./ghash":211},"path":"preview-scripts/__node_modules/browserify-aes/authCipher.js"},{"deps":{},"path":"preview-scripts/__node_modules/indexof/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/errors-browser.js"},{"deps":{"events":80},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/stream-browser.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-aes/incr32.js"},{"deps":{"../../../../../../process/browser.js":34},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/destroy.js"},{"deps":{"../../../errors":202},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/state.js"},{"deps":{"buffer":90},"path":"preview-scripts/__node_modules/browserify-rsa/node_modules/bn.js/lib/bn.js"},{"deps":{},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/from-browser.js"},{"deps":{"../../../../../../process/browser.js":34,"./end-of-stream":175},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/async_iterator.js"},{"deps":{"buffer":18,"util":90},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/readable-stream/lib/internal/streams/buffer_list.js"},{"deps":{"safe-buffer":39},"path":"preview-scripts/__node_modules/browserify-aes/ghash.js"},{"deps":{"safe-buffer":213},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/string_decoder/lib/string_decoder.js"},{"deps":{"buffer":18},"path":"preview-scripts/__node_modules/browserify-sign/node_modules/safe-buffer/index.js"}];
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
    