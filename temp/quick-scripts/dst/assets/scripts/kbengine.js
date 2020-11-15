
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/kbengine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf66eONkrdL24PTcVX2Sc6z', 'kbengine');
// scripts/kbengine.js

"use strict";

var KBEngine = KBEngine || {};
/*-----------------------------------------------------------------------------------------
					    	JavaScript Inheritance
-----------------------------------------------------------------------------------------*/

/* Simple JavaScript Inheritance for ES 5.1
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
// The base Class implementation (does nothing)

KBEngine.Class = function () {}; // Create a new Class that inherits from this class


KBEngine.Class.extend = function (props) {
  var _super = this.prototype;
  var fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/; // Set up the prototype to inherit from the base class
  // (but without running the ctor constructor)

  var proto = Object.create(_super); // Copy the properties over onto the new prototype

  for (var name in props) {
    // Check if we're overwriting an existing function
    proto[name] = typeof props[name] === "function" && typeof _super[name] == "function" && fnTest.test(props[name]) ? function (name, fn) {
      return function () {
        var tmp = this._super; // Add a new ._super() method that is the same method
        // but on the super-class

        this._super = _super[name]; // The method only need to be bound temporarily, so we
        // remove it when we're done executing

        var ret = fn.apply(this, arguments);
        this._super = tmp;
        return ret;
      };
    }(name, props[name]) : props[name];
  } // The new constructor


  var newClass = typeof proto.ctor === "function" ? proto.hasOwnProperty("ctor") ? proto.ctor // All construction is actually done in the ctor method
  : function SubClass() {
    _super.ctor.apply(this, arguments);
  } : function EmptyClass() {}; // Populate our constructed prototype object

  newClass.prototype = proto; // Enforce the constructor to be what we expect

  proto.constructor = newClass; // And make this class extendable

  newClass.extend = KBEngine.Class.extend;
  return newClass;
};
/*
	如果ArrayBuffer没有transfer()的方法, 则为ArrayBuffer添加transfer()方法
	该方法回一个新的ArrayBuffer， 其内容取自oldBuffer的数据，并且根据 newByteLength 的大小来对数据进行截取
	参考:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer
 */


if (!ArrayBuffer.transfer) {
  ArrayBuffer.transfer = function (source, length) {
    source = Object(source);
    var dest = new ArrayBuffer(length);

    if (!(source instanceof ArrayBuffer) || !(dest instanceof ArrayBuffer)) {
      throw new TypeError("ArrayBuffer.transfer, error: Source and destination must be ArrayBuffer instances");
    }

    if (dest.byteLength >= source.byteLength) {
      var buf = new Uint8Array(dest);
      buf.set(new Uint8Array(source), 0);
    } else {
      throw new RangeError("ArrayBuffer.transfer, error: destination has not enough space");
    }

    return dest;
  };
}

; // export

window.Class = KBEngine.Class;
/*-----------------------------------------------------------------------------------------
												global
-----------------------------------------------------------------------------------------*/

KBEngine.PACKET_MAX_SIZE = 1500;
KBEngine.PACKET_MAX_SIZE_TCP = 1460;
KBEngine.PACKET_MAX_SIZE_UDP = 1472;
KBEngine.MESSAGE_ID_LENGTH = 2;
KBEngine.MESSAGE_LENGTH_LENGTH = 2;
KBEngine.MESSAGE_LENGTH1_LENGTH = 4;
KBEngine.MESSAGE_MAX_SIZE = 65535;
KBEngine.CLIENT_NO_FLOAT = 0;
KBEngine.KBE_FLT_MAX = 3.402823466e+38;
/*-----------------------------------------------------------------------------------------
												number64bits
-----------------------------------------------------------------------------------------*/

KBEngine.INT64 = function (lo, hi) {
  this.lo = lo;
  this.hi = hi;
  this.sign = 1;

  if (hi >= 2147483648) {
    this.sign = -1;

    if (this.lo > 0) {
      this.lo = 4294967296 - this.lo & 0xffffffff;
      this.hi = 4294967295 - this.hi;
    } else {
      this.lo = 4294967296 - this.lo & 0xffffffff;
      this.hi = 4294967296 - this.hi;
    }
  }

  this.toString = function () {
    var result = "";

    if (this.sign < 0) {
      result += "-";
    }

    var low = this.lo.toString(16);
    var high = this.hi.toString(16);

    if (this.hi > 0) {
      result += high;

      for (var i = 8 - low.length; i > 0; --i) {
        result += "0";
      }
    }

    result += low;
    return result;
  };
};

KBEngine.UINT64 = function (lo, hi) {
  this.lo = lo;
  this.hi = hi;

  this.toString = function () {
    var low = this.lo.toString(16);
    var high = this.hi.toString(16);
    var result = "";

    if (this.hi > 0) {
      result += high;

      for (var i = 8 - low.length; i > 0; --i) {
        result += "0";
      }
    }

    result += low;
    return result;
  };
};
/*-----------------------------------------------------------------------------------------
												debug
-----------------------------------------------------------------------------------------*/


KBEngine.INFO_MSG = function (s) {
  console.info(s);
};

KBEngine.DEBUG_MSG = function (s) {
  console.debug(s);
};

KBEngine.ERROR_MSG = function (s) {
  console.error(s);
};

KBEngine.WARNING_MSG = function (s) {
  console.warn(s);
};
/*-----------------------------------------------------------------------------------------
												string
-----------------------------------------------------------------------------------------*/


KBEngine.utf8ArrayToString = function (array) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = array.length;
  i = 0;

  while (i < len) {
    c = array[i++];

    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;

      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
        break;

      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
        break;
    }
  }

  return out;
};

KBEngine.stringToUTF8Bytes = function (str) {
  var utf8 = [];

  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);else if (charcode < 0x800) {
      utf8.push(0xc0 | charcode >> 6, 0x80 | charcode & 0x3f);
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | charcode >> 12, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
    } // surrogate pair
    else {
        i++; // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves

        charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
        utf8.push(0xf0 | charcode >> 18, 0x80 | charcode >> 12 & 0x3f, 0x80 | charcode >> 6 & 0x3f, 0x80 | charcode & 0x3f);
      }
  }

  return utf8;
};
/*-----------------------------------------------------------------------------------------
												event
-----------------------------------------------------------------------------------------*/


KBEngine.EventInfo = function (classinst, callbackfn) {
  this.callbackfn = callbackfn;
  this.classinst = classinst;
};

KBEngine.FiredEvent = function (evtName, evtInfo, ars) {
  this.evtName = evtName;
  this.evtInfo = evtInfo;
  this.ars = ars;
};

KBEngine.Event = function () {
  this._events = {};
  this._isPause = false;
  this._firedEvents = [];

  this.register = function (evtName, classinst, strCallback) {
    var callbackfn = classinst[strCallback];

    if (callbackfn == undefined) {
      KBEngine.ERROR_MSG('KBEngine.Event::fire: not found strCallback(' + classinst + ")!" + strCallback);
      return;
    }

    var evtlst = this._events[evtName];

    if (evtlst == undefined) {
      evtlst = [];
      this._events[evtName] = evtlst;
    }

    var info = new KBEngine.EventInfo(classinst, callbackfn);
    evtlst.push(info);
  };

  this.deregisterAll = function (classinst) {
    for (var itemkey in this._events) {
      this.deregister(itemkey, classinst);
    }
  };

  this.deregister = function (evtName, classinst) {
    var evtlst = this._events[evtName];

    if (evtlst == undefined) {
      return;
    }

    while (true) {
      var found = false;

      for (var i = 0; i < evtlst.length; i++) {
        var info = evtlst[i];

        if (info.classinst == classinst) {
          evtlst.splice(i, 1);
          found = true;
          break;
        }
      }

      if (!found) break;
    }

    this.removeFiredEvent(evtName, classinst);
  };

  this.removeAllFiredEvent = function (classinst) {
    this.removeFiredEvent("", classinst);
  };

  this.removeFiredEvent = function (evtName, classinst) {
    var firedEvents = this._firedEvents;

    while (true) {
      var found = false;

      for (var i = 0; i < firedEvents.length; i++) {
        var evt = firedEvents[i];

        if ((evtName == "" || evt.evtName == evtName) && evt.evtInfo.classinst == classinst) {
          firedEvents.splice(i, 1);
          found = true;
          break;
        }
      }

      if (!found) break;
    }
  };

  this.fire = function () {
    if (arguments.length < 1) {
      //KBEngine.ERROR_MSG('KBEngine.Event::fire: not found eventName!');  
      return;
    }

    var evtName = arguments[0];
    var evtlst = this._events[evtName];

    if (evtlst == undefined) {
      return;
    }

    var ars = [];

    for (var i = 1; i < arguments.length; i++) {
      ars.push(arguments[i]);
    }

    for (var i = 0; i < evtlst.length; i++) {
      var info = evtlst[i];

      if (!this._isPause) {
        if (ars.length < 1) {
          info.callbackfn.apply(info.classinst);
        } else {
          info.callbackfn.apply(info.classinst, ars);
        }
      } else {
        var eobj = new KBEngine.FiredEvent(evtName, info, ars);

        this._firedEvents.push(eobj);
      }
    }
  };

  this.pause = function () {
    this._isPause = true;
  };

  this.resume = function () {
    this._isPause = false;
    var firedEvents = this._firedEvents;

    while (firedEvents.length > 0) {
      var evt = firedEvents.shift();
      var info = evt.evtInfo;
      var ars = evt.ars;

      if (ars.length < 1) {
        info.callbackfn.apply(info.classinst);
      } else {
        info.callbackfn.apply(info.classinst, ars);
      }
    }
  };
};

KBEngine.Event = new KBEngine.Event();
/*-----------------------------------------------------------------------------------------
												memorystream
-----------------------------------------------------------------------------------------*/

KBEngine.MemoryStream = function (size_or_buffer) {
  if (size_or_buffer instanceof ArrayBuffer) {
    this.buffer = size_or_buffer;
  } else {
    this.buffer = new ArrayBuffer(size_or_buffer);
  }

  this.rpos = 0;
  this.wpos = 0;
  /*
  	union PackFloatXType
  	{
  		float	fv;
  		uint32	uv;
  		int		iv;
  	};	
  */

  KBEngine.MemoryStream.PackFloatXType = function () {
    this._unionData = new ArrayBuffer(4);
    this.fv = new Float32Array(this._unionData, 0, 1);
    this.uv = new Uint32Array(this._unionData, 0, 1);
    this.iv = new Int32Array(this._unionData, 0, 1);
  }; //---------------------------------------------------------------------------------


  this.readInt8 = function () {
    var buf = new Int8Array(this.buffer, this.rpos, 1);
    this.rpos += 1;
    return buf[0];
  };

  this.readInt16 = function () {
    var v = this.readUint16();
    if (v >= 32768) v -= 65536;
    return v;
  };

  this.readInt32 = function () {
    var v = this.readUint32();
    if (v >= 2147483648) v -= 4294967296;
    return v;
  };

  this.readInt64 = function () {
    var lo = this.readInt32();
    var hi = this.readInt32();
    return new KBEngine.INT64(lo, hi);
  };

  this.readUint8 = function () {
    var buf = new Uint8Array(this.buffer, this.rpos, 1);
    this.rpos += 1;
    return buf[0];
  };

  this.readUint16 = function () {
    var buf = new Uint8Array(this.buffer, this.rpos);
    this.rpos += 2;
    return ((buf[1] & 0xff) << 8) + (buf[0] & 0xff);
  };

  this.readUint32 = function () {
    var buf = new Uint8Array(this.buffer, this.rpos);
    this.rpos += 4;
    return (buf[3] << 24) + (buf[2] << 16) + (buf[1] << 8) + buf[0];
  };

  this.readUint64 = function () {
    var lo = this.readUint32();
    var hi = this.readUint32();
    return new KBEngine.UINT64(lo, hi);
  };

  this.readFloat = function () {
    try {
      var buf = new Float32Array(this.buffer, this.rpos, 1);
    } catch (e) {
      var buf = new Float32Array(this.buffer.slice(this.rpos, this.rpos + 4));
    }

    this.rpos += 4;
    return buf[0];
  };

  this.readDouble = function () {
    try {
      var buf = new Float64Array(this.buffer, this.rpos, 1);
    } catch (e) {
      var buf = new Float64Array(this.buffer.slice(this.rpos, this.rpos + 8), 0, 1);
    }

    this.rpos += 8;
    return buf[0];
  };

  this.readString = function () {
    var buf = new Uint8Array(this.buffer, this.rpos);
    var i = 0;
    var s = "";

    while (true) {
      if (buf[i] != 0) {
        s += String.fromCharCode(buf[i]);
      } else {
        i++;
        break;
      }

      i++;
      if (this.rpos + i >= this.buffer.byteLength) throw new Error("KBEngine.MemoryStream::readString: rpos(" + (this.rpos + i) + ")>=" + this.buffer.byteLength + " overflow!");
    }

    this.rpos += i;
    return s;
  };

  this.readBlob = function () {
    var size = this.readUint32();
    var buf = new Uint8Array(this.buffer, this.rpos, size);
    this.rpos += size;
    return buf;
  };

  this.readStream = function () {
    var buf = new Uint8Array(this.buffer, this.rpos, this.buffer.byteLength - this.rpos);
    this.rpos = this.buffer.byteLength;
    return new KBEngine.MemoryStream(buf);
  };

  this.readPackXZ = function () {
    var xPackData = new KBEngine.MemoryStream.PackFloatXType();
    var zPackData = new KBEngine.MemoryStream.PackFloatXType();
    xPackData.fv[0] = 0.0;
    zPackData.fv[0] = 0.0;
    xPackData.uv[0] = 0x40000000;
    zPackData.uv[0] = 0x40000000;
    var v1 = this.readUint8();
    var v2 = this.readUint8();
    var v3 = this.readUint8();
    var data = 0;
    data |= v1 << 16;
    data |= v2 << 8;
    data |= v3;
    xPackData.uv[0] |= (data & 0x7ff000) << 3;
    zPackData.uv[0] |= (data & 0x0007ff) << 15;
    xPackData.fv[0] -= 2.0;
    zPackData.fv[0] -= 2.0;
    xPackData.uv[0] |= (data & 0x800000) << 8;
    zPackData.uv[0] |= (data & 0x000800) << 20;
    var data = new Array(2);
    data[0] = xPackData.fv[0];
    data[1] = zPackData.fv[0];
    return data;
  };

  this.readPackY = function () {
    var v = this.readUint16();
    return v;
  }; //---------------------------------------------------------------------------------


  this.writeInt8 = function (v) {
    var buf = new Int8Array(this.buffer, this.wpos, 1);
    buf[0] = v;
    this.wpos += 1;
  };

  this.writeInt16 = function (v) {
    this.writeInt8(v & 0xff);
    this.writeInt8(v >> 8 & 0xff);
  };

  this.writeInt32 = function (v) {
    for (var i = 0; i < 4; i++) {
      this.writeInt8(v >> i * 8 & 0xff);
    }
  };

  this.writeInt64 = function (v) {
    this.writeInt32(v.lo);
    this.writeInt32(v.hi);
  };

  this.writeUint8 = function (v) {
    var buf = new Uint8Array(this.buffer, this.wpos, 1);
    buf[0] = v;
    this.wpos += 1;
  };

  this.writeUint16 = function (v) {
    this.writeUint8(v & 0xff);
    this.writeUint8(v >> 8 & 0xff);
  };

  this.writeUint32 = function (v) {
    for (var i = 0; i < 4; i++) {
      this.writeUint8(v >> i * 8 & 0xff);
    }
  };

  this.writeUint64 = function (v) {
    this.writeUint32(v.lo);
    this.writeUint32(v.hi);
  };

  this.writeFloat = function (v) {
    try {
      var buf = new Float32Array(this.buffer, this.wpos, 1);
      buf[0] = v;
    } catch (e) {
      var buf = new Float32Array(1);
      buf[0] = v;
      var buf1 = new Uint8Array(this.buffer);
      var buf2 = new Uint8Array(buf.buffer);
      buf1.set(buf2, this.wpos);
    }

    this.wpos += 4;
  };

  this.writeDouble = function (v) {
    try {
      var buf = new Float64Array(this.buffer, this.wpos, 1);
      buf[0] = v;
    } catch (e) {
      var buf = new Float64Array(1);
      buf[0] = v;
      var buf1 = new Uint8Array(this.buffer);
      var buf2 = new Uint8Array(buf.buffer);
      buf1.set(buf2, this.wpos);
    }

    this.wpos += 8;
  };

  this.writeBlob = function (v) {
    var size = v.length;

    if (size + 4 > this.space()) {
      KBEngine.ERROR_MSG("memorystream::writeBlob: no free!");
      return;
    }

    this.writeUint32(size);
    var buf = new Uint8Array(this.buffer, this.wpos, size);

    if (typeof v == "string") {
      for (var i = 0; i < size; i++) {
        buf[i] = v.charCodeAt(i);
      }
    } else {
      for (var i = 0; i < size; i++) {
        buf[i] = v[i];
      }
    }

    this.wpos += size;
  };

  this.writeString = function (v) {
    if (v.length > this.space()) {
      KBEngine.ERROR_MSG("memorystream::writeString: no free!");
      return;
    }

    var buf = new Uint8Array(this.buffer, this.wpos);
    var i = 0;

    for (var idx = 0; idx < v.length; idx++) {
      buf[i++] = v.charCodeAt(idx);
    }

    buf[i++] = 0;
    this.wpos += i;
  };

  this.append = function (stream, offset, size) {
    if (!(stream instanceof KBEngine.MemoryStream)) {
      KBEngine.ERROR_MSG("MemoryStream::append(): stream must be MemoryStream instances");
      return;
    }

    if (size > this.space()) {
      this.buffer = ArrayBuffer.transfer(this.buffer, this.buffer.byteLength + size * 2);
    }

    var buf = new Uint8Array(this.buffer, this.wpos, size);
    buf.set(new Uint8Array(stream.buffer, offset, size), 0);
    this.wpos += size;
  }; //---------------------------------------------------------------------------------


  this.readSkip = function (v) {
    this.rpos += v;
  }; //---------------------------------------------------------------------------------


  this.space = function () {
    return this.buffer.byteLength - this.wpos;
  }; //---------------------------------------------------------------------------------


  this.length = function () {
    return this.wpos - this.rpos;
  }; //---------------------------------------------------------------------------------


  this.readEOF = function () {
    return this.buffer.byteLength - this.rpos <= 0;
  }; //---------------------------------------------------------------------------------


  this.done = function () {
    this.rpos = this.wpos;
  }; //---------------------------------------------------------------------------------


  this.getbuffer = function (v) {
    return this.buffer.slice(this.rpos, this.wpos);
  }; //---------------------------------------------------------------------------------


  this.size = function () {
    return this.buffer.byteLength;
  }; //---------------------------------------------------------------------------------


  this.clear = function () {
    this.rpos = 0;
    this.wpos = 0;
    if (this.buffer.byteLength > KBEngine.PACKET_MAX_SIZE) this.buffer = new ArrayBuffer(KBEngine.PACKET_MAX_SIZE);
  };
};
/*-----------------------------------------------------------------------------------------
												bundle
-----------------------------------------------------------------------------------------*/


KBEngine.Bundle = function () {
  this.memorystreams = new Array();
  this.stream = new KBEngine.MemoryStream(KBEngine.PACKET_MAX_SIZE_TCP);
  this.numMessage = 0;
  this.messageLengthBuffer = null;
  this.messageLength = 0;
  this.msgtype = null; //---------------------------------------------------------------------------------

  this.newMessage = function (msgtype) {
    this.fini(false);
    this.msgtype = msgtype;
    this.numMessage += 1;

    if (this.msgtype.length == -1) {
      this.messageLengthBuffer = new Uint8Array(this.stream.buffer, this.stream.wpos + KBEngine.MESSAGE_ID_LENGTH, 2);
    }

    this.writeUint16(msgtype.id);

    if (this.messageLengthBuffer) {
      this.writeUint16(0);
      this.messageLengthBuffer[0] = 0;
      this.messageLengthBuffer[1] = 0;
      this.messageLength = 0;
    }
  }; //---------------------------------------------------------------------------------


  this.writeMsgLength = function (v) {
    if (this.messageLengthBuffer) {
      this.messageLengthBuffer[0] = v & 0xff;
      this.messageLengthBuffer[1] = v >> 8 & 0xff;
    }
  }; //---------------------------------------------------------------------------------


  this.fini = function (issend) {
    if (this.numMessage > 0) {
      this.writeMsgLength(this.messageLength);
      if (this.stream) this.memorystreams.push(this.stream);
    }

    if (issend) {
      this.messageLengthBuffer = null;
      this.numMessage = 0;
      this.msgtype = null;
    }
  }; //---------------------------------------------------------------------------------


  this.send = function (network) {
    this.fini(true);

    for (var i = 0; i < this.memorystreams.length; i++) {
      var tmpStream = this.memorystreams[i];
      network.send(tmpStream.getbuffer());
    }

    this.memorystreams = new Array();
    this.stream = new KBEngine.MemoryStream(KBEngine.PACKET_MAX_SIZE_TCP);
  }; //---------------------------------------------------------------------------------


  this.checkStream = function (v) {
    if (v > this.stream.space()) {
      this.memorystreams.push(this.stream);
      this.stream = new KBEngine.MemoryStream(KBEngine.PACKET_MAX_SIZE_TCP);
    }

    this.messageLength += v;
  }; //---------------------------------------------------------------------------------


  this.writeInt8 = function (v) {
    this.checkStream(1);
    this.stream.writeInt8(v);
  };

  this.writeInt16 = function (v) {
    this.checkStream(2);
    this.stream.writeInt16(v);
  };

  this.writeInt32 = function (v) {
    this.checkStream(4);
    this.stream.writeInt32(v);
  };

  this.writeInt64 = function (v) {
    this.checkStream(8);
    this.stream.writeInt64(v);
  };

  this.writeUint8 = function (v) {
    this.checkStream(1);
    this.stream.writeUint8(v);
  };

  this.writeUint16 = function (v) {
    this.checkStream(2);
    this.stream.writeUint16(v);
  };

  this.writeUint32 = function (v) {
    this.checkStream(4);
    this.stream.writeUint32(v);
  };

  this.writeUint64 = function (v) {
    this.checkStream(8);
    this.stream.writeUint64(v);
  };

  this.writeFloat = function (v) {
    this.checkStream(4);
    this.stream.writeFloat(v);
  };

  this.writeDouble = function (v) {
    this.checkStream(8);
    this.stream.writeDouble(v);
  };

  this.writeString = function (v) {
    this.checkStream(v.length + 1);
    this.stream.writeString(v);
  };

  this.writeBlob = function (v) {
    this.checkStream(v.length + 4);
    this.stream.writeBlob(v);
  };
};
/*-----------------------------------------------------------------------------------------
												messages
-----------------------------------------------------------------------------------------*/


KBEngine.reader = new KBEngine.MemoryStream(0);
KBEngine.datatype2id = {};

KBEngine.mappingDataType = function (writer, argType) {
  KBEngine.datatype2id = {};
  KBEngine.datatype2id["STRING"] = 1;
  KBEngine.datatype2id["STD::STRING"] = 1;
  KBEngine.datatype2id["UINT8"] = 2;
  KBEngine.datatype2id["BOOL"] = 2;
  KBEngine.datatype2id["DATATYPE"] = 2;
  KBEngine.datatype2id["CHAR"] = 2;
  KBEngine.datatype2id["DETAIL_TYPE"] = 2;
  KBEngine.datatype2id["ENTITYCALL_CALL_TYPE"] = 2;
  KBEngine.datatype2id["UINT16"] = 3;
  KBEngine.datatype2id["UNSIGNED SHORT"] = 3;
  KBEngine.datatype2id["SERVER_ERROR_CODE"] = 3;
  KBEngine.datatype2id["ENTITY_TYPE"] = 3;
  KBEngine.datatype2id["ENTITY_PROPERTY_UID"] = 3;
  KBEngine.datatype2id["ENTITY_METHOD_UID"] = 3;
  KBEngine.datatype2id["ENTITY_SCRIPT_UID"] = 3;
  KBEngine.datatype2id["DATATYPE_UID"] = 3;
  KBEngine.datatype2id["UINT32"] = 4;
  KBEngine.datatype2id["UINT"] = 4;
  KBEngine.datatype2id["UNSIGNED INT"] = 4;
  KBEngine.datatype2id["ARRAYSIZE"] = 4;
  KBEngine.datatype2id["SPACE_ID"] = 4;
  KBEngine.datatype2id["GAME_TIME"] = 4;
  KBEngine.datatype2id["TIMER_ID"] = 4;
  KBEngine.datatype2id["UINT64"] = 5;
  KBEngine.datatype2id["DBID"] = 5;
  KBEngine.datatype2id["COMPONENT_ID"] = 5;
  KBEngine.datatype2id["INT8"] = 6;
  KBEngine.datatype2id["COMPONENT_ORDER"] = 6;
  KBEngine.datatype2id["INT16"] = 7;
  KBEngine.datatype2id["SHORT"] = 7;
  KBEngine.datatype2id["INT32"] = 8;
  KBEngine.datatype2id["INT"] = 8;
  KBEngine.datatype2id["ENTITY_ID"] = 8;
  KBEngine.datatype2id["CALLBACK_ID"] = 8;
  KBEngine.datatype2id["COMPONENT_TYPE"] = 8;
  KBEngine.datatype2id["INT64"] = 9;
  KBEngine.datatype2id["PYTHON"] = 10;
  KBEngine.datatype2id["PY_DICT"] = 10;
  KBEngine.datatype2id["PY_TUPLE"] = 10;
  KBEngine.datatype2id["PY_LIST"] = 10;
  KBEngine.datatype2id["BLOB"] = 11;
  KBEngine.datatype2id["UNICODE"] = 12;
  KBEngine.datatype2id["FLOAT"] = 13;
  KBEngine.datatype2id["DOUBLE"] = 14;
  KBEngine.datatype2id["VECTOR2"] = 15;
  KBEngine.datatype2id["VECTOR3"] = 16;
  KBEngine.datatype2id["VECTOR4"] = 17;
  KBEngine.datatype2id["FIXED_DICT"] = 18;
  KBEngine.datatype2id["ARRAY"] = 19;
  KBEngine.datatype2id["ENTITYCALL"] = 20;
};

KBEngine.mappingDataType();

KBEngine.bindwriter = function (writer, argType) {
  if (argType == KBEngine.datatype2id["UINT8"]) {
    return writer.writeUint8;
  } else if (argType == KBEngine.datatype2id["UINT16"]) {
    return writer.writeUint16;
  } else if (argType == KBEngine.datatype2id["UINT32"]) {
    return writer.writeUint32;
  } else if (argType == KBEngine.datatype2id["UINT64"]) {
    return writer.writeUint64;
  } else if (argType == KBEngine.datatype2id["INT8"]) {
    return writer.writeInt8;
  } else if (argType == KBEngine.datatype2id["INT16"]) {
    return writer.writeInt16;
  } else if (argType == KBEngine.datatype2id["INT32"]) {
    return writer.writeInt32;
  } else if (argType == KBEngine.datatype2id["INT64"]) {
    return writer.writeInt64;
  } else if (argType == KBEngine.datatype2id["FLOAT"]) {
    return writer.writeFloat;
  } else if (argType == KBEngine.datatype2id["DOUBLE"]) {
    return writer.writeDouble;
  } else if (argType == KBEngine.datatype2id["STRING"]) {
    return writer.writeString;
  } else if (argType == KBEngine.datatype2id["FIXED_DICT"]) {
    return writer.writeStream;
  } else if (argType == KBEngine.datatype2id["ARRAY"]) {
    return writer.writeStream;
  } else {
    return writer.writeStream;
  }
};

KBEngine.bindReader = function (argType) {
  if (argType == KBEngine.datatype2id["UINT8"]) {
    return KBEngine.reader.readUint8;
  } else if (argType == KBEngine.datatype2id["UINT16"]) {
    return KBEngine.reader.readUint16;
  } else if (argType == KBEngine.datatype2id["UINT32"]) {
    return KBEngine.reader.readUint32;
  } else if (argType == KBEngine.datatype2id["UINT64"]) {
    return KBEngine.reader.readUint64;
  } else if (argType == KBEngine.datatype2id["INT8"]) {
    return KBEngine.reader.readInt8;
  } else if (argType == KBEngine.datatype2id["INT16"]) {
    return KBEngine.reader.readInt16;
  } else if (argType == KBEngine.datatype2id["INT32"]) {
    return KBEngine.reader.readInt32;
  } else if (argType == KBEngine.datatype2id["INT64"]) {
    return KBEngine.reader.readInt64;
  } else if (argType == KBEngine.datatype2id["FLOAT"]) {
    return KBEngine.reader.readFloat;
  } else if (argType == KBEngine.datatype2id["DOUBLE"]) {
    return KBEngine.reader.readDouble;
  } else if (argType == KBEngine.datatype2id["STRING"]) {
    return KBEngine.reader.readString;
  } else if (argType == KBEngine.datatype2id["PYTHON"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["VECTOR2"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["VECTOR3"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["VECTOR4"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["BLOB"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["UNICODE"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["FIXED_DICT"]) {
    return KBEngine.reader.readStream;
  } else if (argType == KBEngine.datatype2id["ARRAY"]) {
    return KBEngine.reader.readStream;
  } else {
    return KBEngine.reader.readStream;
  }
};

KBEngine.Message = function (id, name, length, argstype, args, handler) {
  this.id = id;
  this.name = name;
  this.length = length;
  this.argsType = argstype; // 绑定执行

  for (var i = 0; i < args.length; i++) {
    args[i] = KBEngine.bindReader(args[i]);
  }

  this.args = args;
  this.handler = handler;

  this.createFromStream = function (msgstream) {
    if (this.args.length <= 0) return msgstream;
    var result = new Array(this.args.length);

    for (var i = 0; i < this.args.length; i++) {
      result[i] = this.args[i].call(msgstream);
    }

    return result;
  };

  this.handleMessage = function (msgstream) {
    if (this.handler == null) {
      KBEngine.ERROR_MSG("KBEngine.Message::handleMessage: interface(" + this.name + "/" + this.id + ") no implement!");
      return;
    }

    if (this.args.length <= 0) {
      if (this.argsType < 0) this.handler(msgstream);else this.handler();
    } else {
      this.handler.apply(KBEngine.app, this.createFromStream(msgstream));
    }
  };
}; // 上行消息


KBEngine.messages = {};
KBEngine.messages["loginapp"] = {};
KBEngine.messages["baseapp"] = {};
KBEngine.clientmessages = {};
KBEngine.messages["Loginapp_importClientMessages"] = new KBEngine.Message(5, "importClientMessages", 0, 0, new Array(), null);
KBEngine.messages["Baseapp_importClientMessages"] = new KBEngine.Message(207, "importClientMessages", 0, 0, new Array(), null);
KBEngine.messages["Baseapp_importClientEntityDef"] = new KBEngine.Message(208, "importClientEntityDef", 0, 0, new Array(), null);
KBEngine.messages["onImportClientMessages"] = new KBEngine.Message(518, "onImportClientMessages", -1, -1, new Array(), null);
KBEngine.bufferedCreateEntityMessages = {};
/*-----------------------------------------------------------------------------------------
												math
-----------------------------------------------------------------------------------------*/

KBEngine.Vector2 = KBEngine.Class.extend({
  ctor: function ctor(x, y) {
    this.x = x;
    this.y = y;
    return true;
  },
  distance: function distance(pos) {
    var x = pos.x - this.x;
    var y = pos.y - this.y;
    return Math.sqrt(x * x + y * y);
  },
  add: function add(vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    return this;
  },
  sub: function sub(vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    return this;
  },
  mul: function mul(num) {
    this.x *= num;
    this.y *= num;
    return this;
  },
  div: function div(num) {
    this.x /= num;
    this.y /= num;
    return this;
  },
  neg: function neg() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
});
KBEngine.Vector3 = KBEngine.Class.extend({
  ctor: function ctor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return true;
  },
  distance: function distance(pos) {
    var x = pos.x - this.x;
    var y = pos.y - this.y;
    var z = pos.z - this.z;
    return Math.sqrt(x * x + y * y + z * z);
  },
  //向量加法
  add: function add(vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
  },
  //向量减法
  sub: function sub(vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
  },
  //向量乘法
  mul: function mul(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  },
  //向量除法
  div: function div(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    return this;
  },
  // 向量取反
  neg: function neg() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
});
KBEngine.Vector4 = KBEngine.Class.extend({
  ctor: function ctor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return true;
  },
  distance: function distance(pos) {
    var x = pos.x - this.x;
    var y = pos.y - this.y;
    var z = pos.z - this.z;
    var w = pos.w - this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  },
  add: function add(vec4) {
    this.x += vec4.x;
    this.y += vec4.y;
    this.z += vec4.z;
    this.w += vec4.w;
    return this;
  },
  sub: function sub(vec4) {
    this.x -= vec4.x;
    this.y -= vec4.y;
    this.z -= vec4.z;
    this.w -= vec4.w;
    return this;
  },
  mul: function mul(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    this.w *= num;
    return this;
  },
  div: function div(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    this.w /= num;
    return this;
  },
  neg: function neg() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
});

KBEngine.clampf = function (value, min_inclusive, max_inclusive) {
  if (min_inclusive > max_inclusive) {
    var temp = min_inclusive;
    min_inclusive = max_inclusive;
    max_inclusive = temp;
  }

  return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
};

KBEngine.int82angle = function (angle
/*int8*/
, half
/*bool*/
) {
  return angle * (Math.PI / (half ? 254.0 : 128.0));
};

KBEngine.angle2int8 = function (v
/*float*/
, half
/*bool*/
) {
  var angle = 0;

  if (!half) {
    angle = Math.floor(v * 128.0 / float(Math.PI) + 0.5);
  } else {
    angle = KBEngine.clampf(floorf(v * 254.0 / float(Math.PI) + 0.5), -128.0, 127.0);
  }

  return angle;
};
/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/


KBEngine.Entity = KBEngine.Class.extend({
  ctor: function ctor() {
    this.id = 0;
    this.className = "";
    this.position = new KBEngine.Vector3(0.0, 0.0, 0.0);
    this.direction = new KBEngine.Vector3(0.0, 0.0, 0.0);
    this.velocity = 0.0;
    this.cell = null;
    this.base = null; // enterworld之后设置为true

    this.inWorld = false; // __init__调用之后设置为true

    this.inited = false; // 是否被控制

    this.isControlled = false;
    this.entityLastLocalPos = new KBEngine.Vector3(0.0, 0.0, 0.0);
    this.entityLastLocalDir = new KBEngine.Vector3(0.0, 0.0, 0.0); // 玩家是否在地面上

    this.isOnGround = false;
    this.holds = [];
    this.roomKeyc = [];
    return true;
  },
  // 与服务端实体脚本中__init__类似, 代表初始化实体
  __init__: function __init__() {},
  callPropertysSetMethods: function callPropertysSetMethods() {
    var currModule = KBEngine.moduledefs[this.className];

    for (var name in currModule.propertys) {
      var propertydata = currModule.propertys[name];
      var properUtype = propertydata[0];
      var name = propertydata[2];
      var setmethod = propertydata[5];
      var flags = propertydata[6];
      var oldval = this[name];

      if (setmethod != null) {
        // base类属性或者进入世界后cell类属性会触发set_*方法
        // ED_FLAG_BASE_AND_CLIENT、ED_FLAG_BASE
        if (flags == 0x00000020 || flags == 0x00000040) {
          if (this.inited && !this.inWorld) setmethod.call(this, oldval);
        } else {
          if (this.inWorld) {
            if (flags == 0x00000008 || flags == 0x00000010) {
              if (!this.isPlayer()) continue;
            }

            setmethod.call(this, oldval);
          }
        }
      }
    }

    ;
  },
  onDestroy: function onDestroy() {},
  onControlled: function onControlled(bIsControlled) {},
  isPlayer: function isPlayer() {
    return this.id == KBEngine.app.entity_id;
  },
  baseCall: function baseCall() {
    if (arguments.length < 1) {
      KBEngine.ERROR_MSG('KBEngine.Entity::baseCall: not fount interfaceName!');
      return;
    }

    if (this.base == undefined) {
      KBEngine.ERROR_MSG('KBEngine.Entity::baseCall: base is None!');
      return;
    }

    var method = KBEngine.moduledefs[this.className].base_methods[arguments[0]];

    if (method == undefined) {
      KBEngine.ERROR_MSG("KBEngine.Entity::baseCall: The server did not find the def_method(" + this.className + "." + arguments[0] + ")!");
      return;
    }

    var methodID = method[0];
    var args = method[3];

    if (arguments.length - 1 != args.length) {
      KBEngine.ERROR_MSG("KBEngine.Entity::baseCall: args(" + (arguments.length - 1) + "!= " + args.length + ") size is error!");
      return;
    }

    this.base.newCall();
    this.base.bundle.writeUint16(methodID);

    try {
      for (var i = 0; i < args.length; i++) {
        if (args[i].isSameType(arguments[i + 1])) {
          args[i].addToStream(this.base.bundle, arguments[i + 1]);
        } else {
          throw new Error("KBEngine.Entity::baseCall: arg[" + i + "] is error!");
        }
      }
    } catch (e) {
      KBEngine.ERROR_MSG(e.toString());
      KBEngine.ERROR_MSG('KBEngine.Entity::baseCall: args is error!');
      this.base.bundle = null;
      return;
    }

    this.base.sendCall();
  },
  cellCall: function cellCall() {
    if (arguments.length < 1) {
      KBEngine.ERROR_MSG('KBEngine.Entity::cellCall: not fount interfaceName!');
      return;
    }

    if (this.cell == undefined) {
      KBEngine.ERROR_MSG('KBEngine.Entity::cellCall: cell is None!');
      return;
    }

    var method = KBEngine.moduledefs[this.className].cell_methods[arguments[0]];

    if (method == undefined) {
      KBEngine.ERROR_MSG("KBEngine.Entity::cellCall: The server did not find the def_method(" + this.className + "." + arguments[0] + ")!");
      return;
    }

    var methodID = method[0];
    var args = method[3];

    if (arguments.length - 1 != args.length) {
      KBEngine.ERROR_MSG("KBEngine.Entity::cellCall: args(" + (arguments.length - 1) + "!= " + args.length + ") size is error!");
      return;
    }

    this.cell.newCall();
    this.cell.bundle.writeUint16(methodID);

    try {
      for (var i = 0; i < args.length; i++) {
        if (args[i].isSameType(arguments[i + 1])) {
          args[i].addToStream(this.cell.bundle, arguments[i + 1]);
        } else {
          throw new Error("KBEngine.Entity::cellCall: arg[" + i + "] is error!");
        }
      }
    } catch (e) {
      KBEngine.ERROR_MSG(e.toString());
      KBEngine.ERROR_MSG('KBEngine.Entity::cellCall: args is error!');
      this.cell.bundle = null;
      return;
    }

    this.cell.sendCall();
  },
  enterWorld: function enterWorld() {
    KBEngine.INFO_MSG(this.className + '::enterWorld: ' + this.id); //多次收到

    this.inWorld = true; //KBEngine.Event.fire(KBEngine.EventTypes.onSetSpaceData, this);

    this.onEnterWorld(); //转到子Avatar.js 中的onEnterWorld()
  },
  onEnterWorld: function onEnterWorld() {
    cc.log("entity.onEnterWorld");
    KBEngine.Event.fire(KBEngine.EventTypes.onEnterWorld, this);
  },
  leaveWorld: function leaveWorld() {
    KBEngine.INFO_MSG(this.className + '::leaveWorld: ' + this.id);
    this.inWorld = false;
    this.onLeaveWorld();
    KBEngine.Event.fire(KBEngine.EventTypes.onLeaveWorld, this);
  },
  onLeaveWorld: function onLeaveWorld() {},
  enterSpace: function enterSpace() {
    KBEngine.INFO_MSG(this.className + '::enterSpace: ' + this.id);
    this.onEnterSpace();
    KBEngine.Event.fire(KBEngine.EventTypes.onEnterSpace, this); // 要立即刷新表现层对象的位置

    KBEngine.Event.fire(KBEngine.EventTypes.set_position, this);
    KBEngine.Event.fire(KBEngine.EventTypes.set_direction, this);
  },
  onEnterSpace: function onEnterSpace() {},
  leaveSpace: function leaveSpace() {
    KBEngine.INFO_MSG(this.className + '::leaveSpace: ' + this.id);
    this.onLeaveSpace();
    KBEngine.Event.fire("onLeaveSpace", this);
  },
  onLeaveSpace: function onLeaveSpace() {},
  set_roomKeyc: function set_roomKeyc(old) {
    cc.log("kbengine.entity ::set_roomkeyc", this.roomKeyc.join(""));
    KBEngine.Event.fire("entity_updateroomkey", this.roomKeyc, this);
  },
  set_holds: function set_holds(old) {
    cc.log("kbengine.entity ::set_holds");

    for (var i = 0; i < this.holds.length; i++) {
      cc.log(this.holds[i]);
    }

    KBEngine.Event.fire("entity_updateholds", this.holds, this);
  },
  set_position: function set_position(old) {
    // KBEngine.DEBUG_MSG(this.className + "::set_position: " + old);  
    if (this.isPlayer()) {
      KBEngine.app.entityServerPos.x = this.position.x;
      KBEngine.app.entityServerPos.y = this.position.y;
      KBEngine.app.entityServerPos.z = this.position.z;
    }

    KBEngine.Event.fire(KBEngine.EventTypes.set_position, this);
  },
  onUpdateVolatileData: function onUpdateVolatileData() {},
  set_direction: function set_direction(old) {
    // KBEngine.DEBUG_MSG(this.className + "::set_direction: " + old);  
    KBEngine.Event.fire(KBEngine.EventTypes.set_direction, this);
  }
});
/*-----------------------------------------------------------------------------------------
												EntityCall
-----------------------------------------------------------------------------------------*/

KBEngine.ENTITYCALL_TYPE_CELL = 0;
KBEngine.ENTITYCALL_TYPE_BASE = 1;

KBEngine.EntityCall = function () {
  this.id = 0;
  this.className = "";
  this.type = KBEngine.ENTITYCALL_TYPE_CELL;
  this.networkInterface = KBEngine.app;
  this.bundle = null;

  this.isBase = function () {
    return this.type == KBEngine.ENTITYCALL_TYPE_BASE;
  };

  this.isCell = function () {
    return this.type == KBEngine.ENTITYCALL_TYPE_CELL;
  };

  this.newCall = function () {
    if (this.bundle == null) this.bundle = new KBEngine.Bundle();
    if (this.type == KBEngine.ENTITYCALL_TYPE_CELL) this.bundle.newMessage(KBEngine.messages.Baseapp_onRemoteCallCellMethodFromClient);else this.bundle.newMessage(KBEngine.messages.Entity_onRemoteMethodCall);
    this.bundle.writeInt32(this.id);
    return this.bundle;
  };

  this.sendCall = function (bundle) {
    if (bundle == undefined) bundle = this.bundle;
    bundle.send(this.networkInterface);
    if (this.bundle == bundle) this.bundle = null;
  };
};
/*-----------------------------------------------------------------------------------------
												entitydef
-----------------------------------------------------------------------------------------*/


KBEngine.moduledefs = {};
KBEngine.datatypes = {};

KBEngine.DATATYPE_UINT8 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readUint8.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeUint8(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < 0 || v > 0xff) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_UINT16 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readUint16.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeUint16(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < 0 || v > 0xffff) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_UINT32 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readUint32.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeUint32(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < 0 || v > 0xffffffff) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_UINT64 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readUint64.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeUint64(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    return v instanceof KBEngine.UINT64;
  };
};

KBEngine.DATATYPE_INT8 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readInt8.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeInt8(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < -0x80 || v > 0x7f) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_INT16 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readInt16.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeInt16(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < -0x8000 || v > 0x7fff) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_INT32 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readInt32.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeInt32(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    if (typeof v != "number") {
      return false;
    }

    if (v < -0x80000000 || v > 0x7fffffff) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_INT64 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readInt64.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeInt64(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseInt(v);
  };

  this.isSameType = function (v) {
    return v instanceof KBEngine.INT64;
  };
};

KBEngine.DATATYPE_FLOAT = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readFloat.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeFloat(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseFloat(v);
  };

  this.isSameType = function (v) {
    return typeof v == "number";
  };
};

KBEngine.DATATYPE_DOUBLE = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readDouble.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeDouble(v);
  };

  this.parseDefaultValStr = function (v) {
    return parseFloat(v);
  };

  this.isSameType = function (v) {
    return typeof v == "number";
  };
};

KBEngine.DATATYPE_STRING = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.reader.readString.call(stream);
  };

  this.addToStream = function (stream, v) {
    stream.writeString(v);
  };

  this.parseDefaultValStr = function (v) {
    if (typeof v == "string") return v;
    return "";
  };

  this.isSameType = function (v) {
    return typeof v == "string";
  };
};

KBEngine.DATATYPE_VECTOR2 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      var x = KBEngine.reader.readInt32.call(stream);
      var y = KBEngine.reader.readInt32.call(stream);
      return new KBEngine.Vector2(x, y);
    } else {
      var x = KBEngine.reader.readFloat.call(stream);
      var y = KBEngine.reader.readFloat.call(stream);
      return new KBEngine.Vector2(x, y);
    }

    return undefined;
  };

  this.addToStream = function (stream, v) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      stream.writeInt32(v.x);
      stream.writeInt32(v.y);
    } else {
      stream.writeFloat(v.x);
      stream.writeFloat(v.y);
    }
  };

  this.parseDefaultValStr = function (v) {
    return new KBEngine.Vector2(0.0, 0.0);
  };

  this.isSameType = function (v) {
    if (!v instanceof KBEngine.Vector2) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_VECTOR3 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      var x = KBEngine.reader.readInt32.call(stream);
      var y = KBEngine.reader.readInt32.call(stream);
      var z = KBEngine.reader.readInt32.call(stream);
      return new KBEngine.Vector3(x, y, z);
    } else {
      var x = KBEngine.reader.readFloat.call(stream);
      var y = KBEngine.reader.readFloat.call(stream);
      var z = KBEngine.reader.readFloat.call(stream);
      return new KBEngine.Vector3(x, y, z);
    }

    return undefined;
  };

  this.addToStream = function (stream, v) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      stream.writeInt32(v.x);
      stream.writeInt32(v.y);
      stream.writeInt32(v.z);
    } else {
      stream.writeFloat(v.x);
      stream.writeFloat(v.y);
      stream.writeFloat(v.z);
    }
  };

  this.parseDefaultValStr = function (v) {
    return new KBEngine.Vector3(0.0, 0.0, 0.0);
  };

  this.isSameType = function (v) {
    if (!v instanceof KBEngine.Vector3) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_VECTOR4 = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      var x = KBEngine.reader.readInt32.call(stream);
      var y = KBEngine.reader.readInt32.call(stream);
      var z = KBEngine.reader.readInt32.call(stream);
      var w = KBEngine.reader.readInt32.call(stream);
      return new KBEngine.Vector4(x, y, z, w);
    } else {
      var x = KBEngine.reader.readFloat.call(stream);
      var y = KBEngine.reader.readFloat.call(stream);
      var z = KBEngine.reader.readFloat.call(stream);
      var w = KBEngine.reader.readFloat.call(stream);
      return new KBEngine.Vector4(x, y, z, w);
    }

    return undefined;
  };

  this.addToStream = function (stream, v) {
    if (KBEngine.CLIENT_NO_FLOAT) {
      stream.writeInt32(v.x);
      stream.writeInt32(v.y);
      stream.writeInt32(v.z);
      stream.writeInt32(v.w);
    } else {
      stream.writeFloat(v.x);
      stream.writeFloat(v.y);
      stream.writeFloat(v.z);
      stream.writeFloat(v.w);
    }
  };

  this.parseDefaultValStr = function (v) {
    return new KBEngine.Vector4(0.0, 0.0, 0.0, 0.0);
  };

  this.isSameType = function (v) {
    if (!v instanceof KBEngine.Vector4) {
      return false;
    }

    return true;
  };
};

KBEngine.DATATYPE_PYTHON = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return stream.readBlob();
  };

  this.addToStream = function (stream, v) {
    stream.writeBlob(v);
  };

  this.parseDefaultValStr = function (v) {
    return new Uint8Array();
  };

  this.isSameType = function (v) {
    return false;
  };
};

KBEngine.DATATYPE_UNICODE = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    return KBEngine.utf8ArrayToString(KBEngine.reader.readBlob.call(stream));
  };

  this.addToStream = function (stream, v) {
    stream.writeBlob(KBEngine.stringToUTF8Bytes(v));
  };

  this.parseDefaultValStr = function (v) {
    if (typeof v == "string") return v;
    return "";
  };

  this.isSameType = function (v) {
    return typeof v == "string";
  };
};

KBEngine.DATATYPE_ENTITYCALL = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    var cid = KBEngine.reader.readUint64.call(stream);
    var id = KBEngine.reader.readInt32.call(stream);
    var type = KBEngine.reader.readUint16.call(stream);
    var utype = KBEngine.reader.readUint16.call(stream);
  };

  this.addToStream = function (stream, v) {
    var cid = new KBEngine.UINT64(0, 0);
    var id = 0;
    var type = 0;
    var utype = 0;
    stream.writeUint64(cid);
    stream.writeInt32(id);
    stream.writeUint16(type);
    stream.writeUint16(utype);
  };

  this.parseDefaultValStr = function (v) {
    return new Uint8Array();
  };

  this.isSameType = function (v) {
    return false;
  };
};

KBEngine.DATATYPE_BLOB = function () {
  this.bind = function () {};

  this.createFromStream = function (stream) {
    var size = KBEngine.reader.readUint32.call(stream);
    var buf = new Uint8Array(stream.buffer, stream.rpos, size);
    stream.rpos += size;
    return buf;
  };

  this.addToStream = function (stream, v) {
    stream.writeBlob(v);
  };

  this.parseDefaultValStr = function (v) {
    return new Uint8Array();
  };

  this.isSameType = function (v) {
    return true;
  };
};

KBEngine.DATATYPE_ARRAY = function () {
  this.type = null;

  this.bind = function () {
    if (typeof this.type == "number") this.type = KBEngine.datatypes[this.type];
  };

  this.createFromStream = function (stream) {
    var size = stream.readUint32();
    var datas = [];

    while (size > 0) {
      size--;
      datas.push(this.type.createFromStream(stream));
    }

    ;
    return datas;
  };

  this.addToStream = function (stream, v) {
    stream.writeUint32(v.length);

    for (var i = 0; i < v.length; i++) {
      this.type.addToStream(stream, v[i]);
    }
  };

  this.parseDefaultValStr = function (v) {
    return [];
  };

  this.isSameType = function (v) {
    for (var i = 0; i < v.length; i++) {
      if (!this.type.isSameType(v[i])) {
        return false;
      }
    }

    return true;
  };
};

KBEngine.DATATYPE_FIXED_DICT = function () {
  this.dicttype = {};
  this.implementedBy = null;

  this.bind = function () {
    for (var itemkey in this.dicttype) {
      var utype = this.dicttype[itemkey];
      if (typeof this.dicttype[itemkey] == "number") this.dicttype[itemkey] = KBEngine.datatypes[utype];
    }
  };

  this.createFromStream = function (stream) {
    var datas = {};

    for (var itemkey in this.dicttype) {
      datas[itemkey] = this.dicttype[itemkey].createFromStream(stream);
    }

    return datas;
  };

  this.addToStream = function (stream, v) {
    for (var itemkey in this.dicttype) {
      this.dicttype[itemkey].addToStream(stream, v[itemkey]);
    }
  };

  this.parseDefaultValStr = function (v) {
    return {};
  };

  this.isSameType = function (v) {
    for (var itemkey in this.dicttype) {
      if (!this.dicttype[itemkey].isSameType(v[itemkey])) {
        return false;
      }
    }

    return true;
  };
};

KBEngine.datatypes["UINT8"] = new KBEngine.DATATYPE_UINT8();
KBEngine.datatypes["UINT16"] = new KBEngine.DATATYPE_UINT16();
KBEngine.datatypes["UINT32"] = new KBEngine.DATATYPE_UINT32();
KBEngine.datatypes["UINT64"] = new KBEngine.DATATYPE_UINT64();
KBEngine.datatypes["INT8"] = new KBEngine.DATATYPE_INT8();
KBEngine.datatypes["INT16"] = new KBEngine.DATATYPE_INT16();
KBEngine.datatypes["INT32"] = new KBEngine.DATATYPE_INT32();
KBEngine.datatypes["INT64"] = new KBEngine.DATATYPE_INT64();
KBEngine.datatypes["FLOAT"] = new KBEngine.DATATYPE_FLOAT();
KBEngine.datatypes["DOUBLE"] = new KBEngine.DATATYPE_DOUBLE();
KBEngine.datatypes["STRING"] = new KBEngine.DATATYPE_STRING();
KBEngine.datatypes["VECTOR2"] = new KBEngine.DATATYPE_VECTOR2();
KBEngine.datatypes["VECTOR3"] = new KBEngine.DATATYPE_VECTOR3();
KBEngine.datatypes["VECTOR4"] = new KBEngine.DATATYPE_VECTOR4();
KBEngine.datatypes["PYTHON"] = new KBEngine.DATATYPE_PYTHON();
KBEngine.datatypes["UNICODE"] = new KBEngine.DATATYPE_UNICODE();
KBEngine.datatypes["ENTITYCALL"] = new KBEngine.DATATYPE_ENTITYCALL();
KBEngine.datatypes["BLOB"] = new KBEngine.DATATYPE_BLOB();
/*-----------------------------------------------------------------------------------------
												KBEngine args
-----------------------------------------------------------------------------------------*/

KBEngine.KBEngineArgs = function () {
  this.ip = "127.0.0.1";
  this.port = 20013;
  this.updateHZ = 100;
  this.serverHeartbeatTick = 15; // Reference: http://kbengine.github.io/docs/programming/clientsdkprogramming.html, client types

  this.clientType = 5; // 在Entity初始化时是否触发属性的set_*事件(callPropertysSetMethods)

  this.isOnInitCallPropertysSetMethods = true; // 是否用wss, 默认使用ws

  this.isWss = false;
};
/*-----------------------------------------------------------------------------------------
												KBEngine app
-----------------------------------------------------------------------------------------*/


KBEngine.EventTypes = {
  // Create new account.
  // <para> param1(string): accountName</para>
  // <para> param2(string): password</para>
  // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
  createAccount: "createAccount",
  // Login to server.
  // <para> param1(string): accountName</para>
  // <para> param2(string): password</para>
  // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
  login: "login",
  // Logout to baseapp, called when exiting the client.	
  logout: "logout",
  // Relogin to baseapp.
  reloginBaseapp: "reloginBaseapp",
  // Request server binding account Email.
  // <para> param1(string): emailAddress</para>
  bindAccountEmail: "bindAccountEmail",
  // Request to set up a new password for the account. Note: account must be online.
  // <para> param1(string): old_password</para>
  // <para> param2(string): new_password</para>
  newPassword: "newPassword",
  // ------------------------------------连接相关------------------------------------
  // Kicked of the current server.
  // <para> param1(uint16): retcode. // server_errors</para>
  onKicked: "onKicked",
  // Disconnected from the server.
  onDisconnected: "onDisconnected",
  // Status of connection server.
  // <para> param1(bool): success or fail</para>
  onConnectionState: "onConnectionState",
  onConnectionState2: "onConnectionState2",
  // ------------------------------------logon相关------------------------------------
  // Create account feedback results.
  // <para> param1(uint16): retcode. // server_errors</para>
  // <para> param2(bytes): datas. // If you use third-party account system, the system may fill some of the third-party additional datas. </para>
  onCreateAccountResult: "onCreateAccountResult",
  // Engine version mismatch.
  // <para> param1(string): clientVersion
  // <para> param2(string): serverVersion
  onVersionNotMatch: "onVersionNotMatch",
  // script version mismatch.
  // <para> param1(string): clientScriptVersion
  // <para> param2(string): serverScriptVersion
  onScriptVersionNotMatch: "onScriptVersionNotMatch",
  // Login failed.
  // <para> param1(uint16): retcode. // server_errors</para>
  onLoginFailed: "onLoginFailed",
  // Login to baseapp.
  onLoginBaseapp: "onLoginBaseapp",
  // Login baseapp failed.
  // <para> param1(uint16): retcode. // server_errors</para>
  onLoginBaseappFailed: "onLoginBaseappFailed",
  // Relogin to baseapp.
  onReloginBaseapp: "onReloginBaseapp",
  // Relogin baseapp success.
  onReloginBaseappSuccessfully: "onReloginBaseappSuccessfully",
  // Relogin baseapp failed.
  // <para> param1(uint16): retcode. // server_errors</para>
  onReloginBaseappFailed: "onReloginBaseappFailed",
  // ------------------------------------实体cell相关事件------------------------------------
  // Entity enter the client-world.
  // <para> param1: Entity</para>
  onEnterWorld: "onEnterWorld",
  // Entity leave the client-world.
  // <para> param1: Entity</para>
  onLeaveWorld: "onLeaveWorld",
  // Player enter the new space.
  // <para> param1: Entity</para>
  onEnterSpace: "onEnterSpace",
  // Player leave the space.
  // <para> param1: Entity</para>
  onLeaveSpace: "onLeaveSpace",
  // Sets the current position of the entity.
  // <para> param1: Entity</para>
  set_position: "set_position",
  // Sets the current direction of the entity.
  // <para> param1: Entity</para>
  set_direction: "set_direction",
  // The entity position is updated, you can smooth the moving entity to new location.
  // <para> param1: Entity</para>
  updatePosition: "updatePosition",
  // The current space is specified by the geometry mapping.
  // Popular said is to load the specified Map Resources.
  // <para> param1(string): resPath</para>
  addSpaceGeometryMapping: "addSpaceGeometryMapping",
  // Server spaceData set data.
  // <para> param1(int32): spaceID</para>
  // <para> param2(string): key</para>
  // <para> param3(string): value</para>
  onSetSpaceData: "onSetSpaceData",
  // Start downloading data.
  // <para> param1(int32): rspaceID</para>
  // <para> param2(string): key</para>
  onDelSpaceData: "onDelSpaceData",
  // Triggered when the entity is controlled or out of control.
  // <para> param1: Entity</para>
  // <para> param2(bool): isControlled</para>
  onControlled: "onControlled",
  // Lose controlled entity.
  // <para> param1: Entity</para>
  onLoseControlledEntity: "onLoseControlledEntity",
  // ------------------------------------数据下载相关------------------------------------
  // Start downloading data.
  // <para> param1(uint16): resouce id</para>
  // <para> param2(uint32): data size</para>
  // <para> param3(string): description</para>
  onStreamDataStarted: "onStreamDataStarted",
  // Receive data.
  // <para> param1(uint16): resouce id</para>
  // <para> param2(bytes): datas</para>
  onStreamDataRecv: "onStreamDataRecv",
  // The downloaded data is completed.
  // <para> param1(uint16): resouce id</para>
  onStreamDataCompleted: "onStreamDataCompleted"
};

KBEngine.KBEngineApp = function (kbengineArgs) {
  console.assert(KBEngine.app == null || KBEngine.app == undefined, "Assertion of KBEngine.app not is null");
  KBEngine.app = this;
  this.args = kbengineArgs;
  this.username = "testhtml51";
  this.password = "123456";
  this.clientdatas = "";
  this.encryptedKey = "";
  this.loginappMessageImported = false;
  this.baseappMessageImported = false;
  this.serverErrorsDescrImported = false;
  this.entitydefImported = false;

  KBEngine.getSingleton = function () {
    console.assert(KBEngine.app != undefined, "KBEngineApp is null");
    return KBEngine.app;
  }; // 描述服务端返回的错误信息


  KBEngine.ServerErr = function () {
    this.name = "";
    this.descr = "";
    this.id = 0;
  };

  this.serverErrs = {}; // 登录loginapp的地址

  this.ip = this.args.ip;
  this.port = this.args.port;
  this.isWss = this.args.isWss;
  this.protocol = this.isWss ? "wss://" : "ws://"; // 服务端分配的baseapp地址

  this.baseappIP = "";
  this.baseappPort = 0;
  this.currMsgID = 0;
  this.currMsgCount = 0;
  this.currMsgLen = 0;
  KBEngine.FragmentDataTypes = {
    FRAGMENT_DATA_UNKNOW: 0,
    FRAGMENT_DATA_MESSAGE_ID: 1,
    FRAGMENT_DATA_MESSAGE_LENGTH: 2,
    FRAGMENT_DATA_MESSAGE_LENGTH1: 3,
    FRAGMENT_DATA_MESSAGE_BODY: 4
  };
  this.fragmentStream = null;
  this.fragmentDatasFlag = KBEngine.FragmentDataTypes.FRAGMENT_DATA_UNKNOW;
  this.fragmentDatasRemain = 0;

  this.resetSocket = function () {
    try {
      if (KBEngine.app.socket != undefined && KBEngine.app.socket != null) {
        var sock = KBEngine.app.socket;
        sock.onopen = undefined;
        sock.onerror = undefined;
        sock.onmessage = undefined;
        sock.onclose = undefined;
        KBEngine.app.socket = null;
        sock.close();
      }
    } catch (e) {}
  };

  this.reset = function () {
    if (KBEngine.app.entities != undefined && KBEngine.app.entities != null) {
      KBEngine.app.clearEntities(true);
    }

    KBEngine.app.resetSocket();
    KBEngine.app.currserver = "loginapp";
    KBEngine.app.currstate = "create";
    KBEngine.app.currconnect = "loginapp"; // 扩展数据

    KBEngine.app.serverdatas = ""; // 版本信息

    KBEngine.app.serverVersion = "";
    KBEngine.app.serverScriptVersion = "";
    KBEngine.app.serverProtocolMD5 = "";
    KBEngine.app.serverEntityDefMD5 = "";
    KBEngine.app.clientVersion = "1.2.7"; //KBEngine.app.clientVersion = "1.2.10";

    KBEngine.app.clientScriptVersion = "0.1.0"; // player的相关信息

    KBEngine.app.entity_uuid = null;
    KBEngine.app.entity_id = 0;
    KBEngine.app.entity_type = ""; // 这个参数的选择必须与kbengine_defs.xml::cellapp/aliasEntityID的参数保持一致

    KBEngine.app.useAliasEntityID = true; // 当前玩家最后一次同步到服务端的位置与朝向与服务端最后一次同步过来的位置

    KBEngine.app.entityServerPos = new KBEngine.Vector3(0.0, 0.0, 0.0); // 客户端所有的实体

    KBEngine.app.entities = {};
    KBEngine.app.entityIDAliasIDList = [];
    KBEngine.app.controlledEntities = []; // 空间的信息

    KBEngine.app.spacedata = {};
    KBEngine.app.spaceID = 0;
    KBEngine.app.spaceResPath = "";
    KBEngine.app.isLoadedGeometry = false;
    var dateObject = new Date();
    KBEngine.app.lastTickTime = dateObject.getTime();
    KBEngine.app.lastTickCBTime = dateObject.getTime();
    KBEngine.mappingDataType(); // 当前组件类别， 配套服务端体系

    KBEngine.app.component = "client";
  };

  this.installEvents = function () {
    KBEngine.Event.register(KBEngine.EventTypes.createAccount, KBEngine.app, "createAccount");
    KBEngine.Event.register(KBEngine.EventTypes.login, KBEngine.app, "login");
    KBEngine.Event.register(KBEngine.EventTypes.logout, KBEngine.app, "logout");
    KBEngine.Event.register(KBEngine.EventTypes.reloginBaseapp, KBEngine.app, "reloginBaseapp");
    KBEngine.Event.register(KBEngine.EventTypes.bindAccountEmail, KBEngine.app, "bindAccountEmail");
    KBEngine.Event.register(KBEngine.EventTypes.newPassword, KBEngine.app, "newPassword");
  };

  this.uninstallEvents = function () {
    KBEngine.Event.deregister(KBEngine.EventTypes.createAccount, KBEngine.app);
    KBEngine.Event.deregister(KBEngine.EventTypes.login, KBEngine.app);
    KBEngine.Event.deregister(KBEngine.EventTypes.logout, KBEngine.app);
    KBEngine.Event.deregister(KBEngine.EventTypes.reloginBaseapp, KBEngine.app);
    KBEngine.Event.deregister(KBEngine.EventTypes.bindAccountEmail, KBEngine.app);
    KBEngine.Event.deregister(KBEngine.EventTypes.newPassword, KBEngine.app);
  };

  this.hello = function () {
    var bundle = new KBEngine.Bundle();
    if (KBEngine.app.currserver == "loginapp") bundle.newMessage(KBEngine.messages.Loginapp_hello);else bundle.newMessage(KBEngine.messages.Baseapp_hello);
    bundle.writeString(KBEngine.app.clientVersion);
    bundle.writeString(KBEngine.app.clientScriptVersion);
    bundle.writeBlob(KBEngine.app.encryptedKey);
    bundle.send(KBEngine.app);
  };

  this.player = function () {
    return KBEngine.app.entities[KBEngine.app.entity_id];
  };

  this.findEntity = function (entityID) {
    return KBEngine.app.entities[entityID];
  };

  this.connect = function (addr) {
    console.assert(KBEngine.app.socket == null, "Assertion of socket not is null");

    try {
      KBEngine.app.socket = new WebSocket(addr);
    } catch (e) {
      KBEngine.ERROR_MSG('WebSocket init error(' + e.toString() + ')!');
      KBEngine.Event.fire(KBEngine.EventTypes.onConnectionState2, false);
      return;
    }

    KBEngine.app.socket.binaryType = "arraybuffer";
    KBEngine.app.socket.onopen = KBEngine.app.onopen;
    KBEngine.app.socket.onerror = KBEngine.app.onerror_before_onopen;
    KBEngine.app.socket.onmessage = KBEngine.app.onmessage;
    KBEngine.app.socket.onclose = KBEngine.app.onclose;
  };

  this.disconnect = function () {
    KBEngine.app.resetSocket();
  };

  this.onopen = function () {
    KBEngine.INFO_MSG('connect success!');
    KBEngine.app.socket.onerror = KBEngine.app.onerror_after_onopen;
    KBEngine.Event.fire(KBEngine.EventTypes.onConnectionState, true);
  };

  this.onerror_before_onopen = function (evt) {
    KBEngine.ERROR_MSG('onerror_before_onopen error:' + evt.data);
    KBEngine.app.resetSocket();
    KBEngine.Event.fire(KBEngine.EventTypes.onConnectionState, false);
  };

  this.onerror_after_onopen = function (evt) {
    KBEngine.ERROR_MSG('onerror_after_onopen error:' + evt.data);
    KBEngine.app.resetSocket();
    KBEngine.Event.fire(KBEngine.EventTypes.onDisconnected);
  };

  this.onmessage = function (msg) {
    var stream = new KBEngine.MemoryStream(msg.data);
    stream.wpos = msg.data.byteLength;
    var app = KBEngine.app;
    var FragmentDataTypes = KBEngine.FragmentDataTypes;

    while (stream.length() > 0 || app.fragmentStream != null) {
      if (app.fragmentDatasFlag == FragmentDataTypes.FRAGMENT_DATA_UNKNOW) {
        if (app.currMsgID == 0) {
          if (KBEngine.MESSAGE_ID_LENGTH > 1 && stream.length() < KBEngine.MESSAGE_ID_LENGTH) {
            app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_ID, stream, KBEngine.MESSAGE_ID_LENGTH);
            break;
          }

          app.currMsgID = stream.readUint16();
        }

        var msgHandler = KBEngine.clientmessages[app.currMsgID];

        if (!msgHandler) {
          app.currMsgID = 0;
          app.currMsgLen = 0;
          KBEngine.ERROR_MSG("KBEngineApp::onmessage[" + app.currserver + "]: not found msg(" + app.currMsgID + ")!");
          break;
        }

        if (app.currMsgLen == 0) {
          var msglen = msgHandler.length;

          if (msglen == -1) {
            if (stream.length() < KBEngine.MESSAGE_LENGTH_LENGTH) {
              app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH, stream, KBEngine.MESSAGE_LENGTH_LENGTH);
              break;
            } else {
              msglen = stream.readUint16();
              app.currMsgLen = msglen; // 扩展长度

              if (msglen == KBEngine.MESSAGE_MAX_SIZE) {
                if (stream.length() < KBEngine.MESSAGE_LENGTH1_LENGTH) {
                  app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH1, stream, KBEngine.MESSAGE_LENGTH1_LENGTH);
                  break;
                }

                app.currMsgLen = stream.readUint32();
              }
            }
          } else {
            app.currMsgLen = msglen;
          }
        }

        if (app.fragmentStream != null && app.fragmentStream.length() >= app.currMsgLen) {
          msgHandler.handleMessage(app.fragmentStream);
          app.fragmentStream = null;
        } else if (stream.length() < app.currMsgLen && stream.length() > 0) {
          app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY, stream, app.currMsgLen);
          break;
        } else {
          var wpos = stream.wpos;
          var rpos = stream.rpos + msglen;
          stream.wpos = rpos;
          msgHandler.handleMessage(stream);
          stream.wpos = wpos;
          stream.rpos = rpos;
        }

        app.currMsgID = 0;
        app.currMsgLen = 0;
        app.fragmentStream = null;
      } else {
        if (app.mergeFragmentMessage(stream)) break;
      }
    }
  };

  this.writeFragmentMessage = function (FragmentDataType, stream, datasize) {
    if (!(stream instanceof KBEngine.MemoryStream)) {
      KBEngine.ERROR_MSG("writeFragmentMessage(): stream must be MemoryStream instances!");
      return;
    }

    var app = KBEngine.app;
    var opsize = stream.length();
    app.fragmentDatasRemain = datasize - opsize;
    app.fragmentDatasFlag = FragmentDataType;
    app.fragmentStream = stream;
  };

  this.mergeFragmentMessage = function (stream) {
    if (!(stream instanceof KBEngine.MemoryStream)) {
      KBEngine.ERROR_MSG("mergeFragmentMessage(): stream must be MemoryStream instances!");
      return false;
    }

    var opsize = stream.length();
    if (opsize == 0) return false;
    var app = KBEngine.app;
    var fragmentStream = app.fragmentStream;
    console.assert(fragmentStream != null);

    if (opsize >= app.fragmentDatasRemain) {
      var FragmentDataTypes = KBEngine.FragmentDataTypes;
      fragmentStream.append(stream, stream.rpos, app.fragmentDatasRemain);

      switch (app.fragmentDatasFlag) {
        case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_ID:
          app.currMsgID = fragmentStream.readUint16();
          app.fragmentStream = null;
          break;

        case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH:
          app.currMsgLen = fragmentStream.readUint16();
          app.fragmentStream = null;
          break;

        case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH1:
          app.currMsgLen = fragmentStream.readUint32();
          app.fragmentStream = null;
          break;

        case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY:
        default:
          break;
      }

      stream.rpos += app.fragmentDatasRemain;
      app.fragmentDatasFlag = FragmentDataTypes.FRAGMENT_DATA_UNKNOW;
      app.fragmentDatasRemain = 0;
      return false;
    } else {
      fragmentStream.append(stream, stream.rpos, opsize);
      app.fragmentDatasRemain -= opsize;
      stream.done();
      return true;
    }
  };

  this.onclose = function () {
    KBEngine.INFO_MSG('connect close:' + KBEngine.app.currserver);

    if (KBEngine.app.currconnect != KBEngine.app.currserver) {
      return;
    }

    KBEngine.app.resetSocket();
    KBEngine.Event.fire(KBEngine.EventTypes.onDisconnected); //if(KBEngine.app.currserver != "loginapp")
    //	KBEngine.app.reset();
  };

  this.send = function (msg) {
    KBEngine.app.socket.send(msg);
  };

  this.close = function () {
    KBEngine.INFO_MSG('KBEngine::close()');
    KBEngine.app.socket.close();
    KBEngine.app.reset();
  };

  this.update = function () {
    if (KBEngine.app.socket == null) return;
    var dateObject = new Date();

    if ((dateObject.getTime() - KBEngine.app.lastTickTime) / 1000 > KBEngine.app.args.serverHeartbeatTick / 2) {
      // 如果心跳回调接收时间小于心跳发送时间，说明没有收到回调
      // 此时应该通知客户端掉线了
      if (KBEngine.app.lastTickCBTime < KBEngine.app.lastTickTime) {
        KBEngine.ERROR_MSG("sendTick: Receive appTick timeout!"); ////////////////////////////////////////////////

        KBEngine.app.resetSocket();
        KBEngine.Event.fire(KBEngine.EventTypes.onDisconnected); ////////////////////////////////////////////////

        KBEngine.app.socket.close();
        return;
      }

      if (KBEngine.app.currserver == "loginapp") {
        if (KBEngine.messages.Loginapp_onClientActiveTick != undefined) {
          var bundle = new KBEngine.Bundle();
          bundle.newMessage(KBEngine.messages.Loginapp_onClientActiveTick);
          bundle.send(KBEngine.app);
        }
      } else {
        if (KBEngine.messages.Baseapp_onClientActiveTick != undefined) {
          var bundle = new KBEngine.Bundle();
          bundle.newMessage(KBEngine.messages.Baseapp_onClientActiveTick);
          bundle.send(KBEngine.app);
        }
      }

      KBEngine.app.lastTickTime = dateObject.getTime();
    }

    KBEngine.app.updatePlayerToServer();
  };
  /*
  	服务器心跳回调
  */


  this.Client_onAppActiveTickCB = function () {
    var dateObject = new Date();
    KBEngine.app.lastTickCBTime = dateObject.getTime();
  };
  /*
  	通过错误id得到错误描述
  */


  this.serverErr = function (id) {
    var e = KBEngine.app.serverErrs[id];

    if (e == undefined) {
      return "";
    }

    return e.name + " [" + e.descr + "]";
  };
  /*
  	服务端错误描述导入了
  */


  this.Client_onImportServerErrorsDescr = function (stream) {
    var size = stream.readUint16();

    while (size > 0) {
      size -= 1;
      var e = new KBEngine.ServerErr();
      e.id = stream.readUint16();
      e.name = KBEngine.utf8ArrayToString(stream.readBlob());
      e.descr = KBEngine.utf8ArrayToString(stream.readBlob());
      KBEngine.app.serverErrs[e.id] = e;
      KBEngine.INFO_MSG("Client_onImportServerErrorsDescr: id=" + e.id + ", name=" + e.name + ", descr=" + e.descr);
    }
  };

  this.onOpenLoginapp_login = function () {
    KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_login: successfully!");
    KBEngine.Event.fire(KBEngine.EventTypes.onConnectionState, true);
    KBEngine.app.currserver = "loginapp";
    KBEngine.app.currstate = "login";

    if (!KBEngine.app.loginappMessageImported) {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_importClientMessages);
      bundle.send(KBEngine.app);
      KBEngine.app.socket.onmessage = KBEngine.app.Client_onImportClientMessages;
      KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_login: start importClientMessages ...");
      KBEngine.Event.fire("Loginapp_importClientMessages");
    } else {
      KBEngine.app.onImportClientMessagesCompleted();
    }
  };

  this.onOpenLoginapp_createAccount = function () {
    KBEngine.Event.fire(KBEngine.EventTypes.onConnectionState, true);
    KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_createAccount: successfully!");
    KBEngine.app.currserver = "loginapp";
    KBEngine.app.currstate = "createAccount";

    if (!KBEngine.app.loginappMessageImported) {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_importClientMessages);
      bundle.send(KBEngine.app);
      KBEngine.app.socket.onmessage = KBEngine.app.Client_onImportClientMessages;
      KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_createAccount: start importClientMessages ...");
      KBEngine.Event.fire("Loginapp_importClientMessages");
    } else {
      KBEngine.app.onImportClientMessagesCompleted();
    }
  };

  this.onImportClientMessagesCompleted = function () {
    KBEngine.INFO_MSG("KBEngineApp::onImportClientMessagesCompleted: successfully!");
    KBEngine.app.socket.onmessage = KBEngine.app.onmessage;
    KBEngine.app.hello();

    if (KBEngine.app.currserver == "loginapp") {
      if (!KBEngine.app.serverErrorsDescrImported) {
        KBEngine.INFO_MSG("KBEngine::onImportClientMessagesCompleted(): send importServerErrorsDescr!");
        KBEngine.app.serverErrorsDescrImported = true;
        var bundle = new KBEngine.Bundle();
        bundle.newMessage(KBEngine.messages.Loginapp_importServerErrorsDescr);
        bundle.send(KBEngine.app);
      }

      if (KBEngine.app.currstate == "login") KBEngine.app.login_loginapp(false);else if (KBEngine.app.currstate == "resetpassword") KBEngine.app.resetpassword_loginapp(false);else KBEngine.app.createAccount_loginapp(false);
      KBEngine.app.loginappMessageImported = true;
    } else {
      KBEngine.app.baseappMessageImported = true;

      if (!KBEngine.app.entitydefImported) {
        KBEngine.INFO_MSG("KBEngineApp::onImportClientMessagesCompleted: start importEntityDef ...");
        var bundle = new KBEngine.Bundle();
        bundle.newMessage(KBEngine.messages.Baseapp_importClientEntityDef);
        bundle.send(KBEngine.app);
        KBEngine.Event.fire("Baseapp_importClientEntityDef");
      } else {
        KBEngine.app.onImportEntityDefCompleted();
      }
    }
  };

  this.createDataTypeFromStreams = function (stream, canprint) {
    var aliassize = stream.readUint16();
    KBEngine.INFO_MSG("KBEngineApp::createDataTypeFromStreams: importAlias(size=" + aliassize + ")!");

    while (aliassize > 0) {
      aliassize--;
      KBEngine.app.createDataTypeFromStream(stream, canprint);
    }

    ;

    for (var datatype in KBEngine.datatypes) {
      if (KBEngine.datatypes[datatype] != undefined) {
        KBEngine.datatypes[datatype].bind();
      }
    }
  };

  this.createDataTypeFromStream = function (stream, canprint) {
    var utype = stream.readUint16();
    var name = stream.readString();
    var valname = stream.readString();
    /* 有一些匿名类型，我们需要提供一个唯一名称放到datatypes中
    	如：
    	<onRemoveAvatar>
    		<Arg>	ARRAY <of> INT8 </of>		</Arg>
    	</onRemoveAvatar>				
    */

    if (valname.length == 0) valname = "Null_" + utype;
    if (canprint) KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: importAlias(" + name + ":" + valname + ")!");

    if (name == "FIXED_DICT") {
      var datatype = new KBEngine.DATATYPE_FIXED_DICT();
      var keysize = stream.readUint8();
      datatype.implementedBy = stream.readString();

      while (keysize > 0) {
        keysize--;
        var keyname = stream.readString();
        var keyutype = stream.readUint16();
        datatype.dicttype[keyname] = keyutype;
      }

      ;
      KBEngine.datatypes[valname] = datatype;
    } else if (name == "ARRAY") {
      var uitemtype = stream.readUint16();
      var datatype = new KBEngine.DATATYPE_ARRAY();
      datatype.type = uitemtype;
      KBEngine.datatypes[valname] = datatype;
    } else {
      KBEngine.datatypes[valname] = KBEngine.datatypes[name];
    }

    KBEngine.datatypes[utype] = KBEngine.datatypes[valname]; // 将用户自定义的类型补充到映射表中

    KBEngine.datatype2id[valname] = utype;
  };

  this.Client_onImportClientEntityDef = function (stream) {
    KBEngine.app.createDataTypeFromStreams(stream, true);

    while (stream.length() > 0) {
      var scriptmodule_name = stream.readString();
      var scriptUtype = stream.readUint16();
      var propertysize = stream.readUint16();
      var methodsize = stream.readUint16();
      var base_methodsize = stream.readUint16();
      var cell_methodsize = stream.readUint16();
      KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: import(" + scriptmodule_name + "), propertys(" + propertysize + "), " + "clientMethods(" + methodsize + "), baseMethods(" + base_methodsize + "), cellMethods(" + cell_methodsize + ")!");
      KBEngine.moduledefs[scriptmodule_name] = {};
      var currModuleDefs = KBEngine.moduledefs[scriptmodule_name];
      currModuleDefs["name"] = scriptmodule_name;
      currModuleDefs["propertys"] = {};
      currModuleDefs["methods"] = {};
      currModuleDefs["base_methods"] = {};
      currModuleDefs["cell_methods"] = {};
      KBEngine.moduledefs[scriptUtype] = currModuleDefs;
      var self_propertys = currModuleDefs["propertys"];
      var self_methods = currModuleDefs["methods"];
      var self_base_methods = currModuleDefs["base_methods"];
      var self_cell_methods = currModuleDefs["cell_methods"];
      var Class = KBEngine[scriptmodule_name];

      while (propertysize > 0) {
        propertysize--;
        var properUtype = stream.readUint16();
        var properFlags = stream.readUint32();
        var aliasID = stream.readInt16();
        var name = stream.readString();
        var defaultValStr = stream.readString();
        var utype = KBEngine.datatypes[stream.readUint16()];
        var setmethod = null;

        if (Class != undefined) {
          setmethod = Class.prototype["set_" + name];
          if (setmethod == undefined) setmethod = null;
        }

        var savedata = [properUtype, aliasID, name, defaultValStr, utype, setmethod, properFlags];
        self_propertys[name] = savedata;

        if (aliasID != -1) {
          self_propertys[aliasID] = savedata;
          currModuleDefs["usePropertyDescrAlias"] = true;
        } else {
          self_propertys[properUtype] = savedata;
          currModuleDefs["usePropertyDescrAlias"] = false;
        }

        KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), property(" + name + "/" + properUtype + ").");
      }

      ;

      while (methodsize > 0) {
        methodsize--;
        var methodUtype = stream.readUint16();
        var aliasID = stream.readInt16();
        var name = stream.readString();
        var argssize = stream.readUint8();
        var args = [];

        while (argssize > 0) {
          argssize--;
          args.push(KBEngine.datatypes[stream.readUint16()]);
        }

        ;
        var savedata = [methodUtype, aliasID, name, args];
        self_methods[name] = savedata;

        if (aliasID != -1) {
          self_methods[aliasID] = savedata;
          currModuleDefs["useMethodDescrAlias"] = true;
        } else {
          self_methods[methodUtype] = savedata;
          currModuleDefs["useMethodDescrAlias"] = false;
        }

        KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), method(" + name + ").");
      }

      ;

      while (base_methodsize > 0) {
        base_methodsize--;
        var methodUtype = stream.readUint16();
        var aliasID = stream.readInt16();
        var name = stream.readString();
        var argssize = stream.readUint8();
        var args = [];

        while (argssize > 0) {
          argssize--;
          args.push(KBEngine.datatypes[stream.readUint16()]);
        }

        ;
        self_base_methods[name] = [methodUtype, aliasID, name, args];
        KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), base_method(" + name + ").");
      }

      ;

      while (cell_methodsize > 0) {
        cell_methodsize--;
        var methodUtype = stream.readUint16();
        var aliasID = stream.readInt16();
        var name = stream.readString();
        var argssize = stream.readUint8();
        var args = [];

        while (argssize > 0) {
          argssize--;
          args.push(KBEngine.datatypes[stream.readUint16()]);
        }

        ;
        self_cell_methods[name] = [methodUtype, aliasID, name, args];
        KBEngine.INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), cell_method(" + name + ").");
      }

      ;
      var defmethod = KBEngine[scriptmodule_name];

      if (defmethod == undefined) {
        KBEngine.ERROR_MSG("KBEngineApp::Client_onImportClientEntityDef: module(" + scriptmodule_name + ") not found!");
      }

      for (var name in currModuleDefs.propertys) {
        var infos = currModuleDefs.propertys[name];
        var properUtype = infos[0];
        var aliasID = infos[1];
        var name = infos[2];
        var defaultValStr = infos[3];
        var utype = infos[4];
        if (defmethod != undefined) defmethod.prototype[name] = utype.parseDefaultValStr(defaultValStr);
      }

      ;

      for (var name in currModuleDefs.methods) {
        var infos = currModuleDefs.methods[name];
        var properUtype = infos[0];
        var aliasID = infos[1];
        var name = infos[2];
        var args = infos[3];

        if (defmethod != undefined && defmethod.prototype[name] == undefined) {
          KBEngine.WARNING_MSG(scriptmodule_name + ":: method(" + name + ") no implement!");
        }
      }

      ;
    }

    KBEngine.app.onImportEntityDefCompleted();
  };

  this.Client_onVersionNotMatch = function (stream) {
    KBEngine.app.serverVersion = stream.readString();
    KBEngine.ERROR_MSG("Client_onVersionNotMatch: verInfo=" + KBEngine.app.clientVersion + " not match(server: " + KBEngine.app.serverVersion + ")");
    KBEngine.Event.fire(KBEngine.EventTypes.onVersionNotMatch, KBEngine.app.clientVersion, KBEngine.app.serverVersion);
  };

  this.Client_onScriptVersionNotMatch = function (stream) {
    KBEngine.app.serverScriptVersion = stream.readString();
    KBEngine.ERROR_MSG("Client_onScriptVersionNotMatch: verInfo=" + KBEngine.app.clientScriptVersion + " not match(server: " + KBEngine.app.serverScriptVersion + ")");
    KBEngine.Event.fire(KBEngine.EventTypes.onScriptVersionNotMatch, KBEngine.app.clientScriptVersion, KBEngine.app.serverScriptVersion);
  };

  this.onImportEntityDefCompleted = function () {
    KBEngine.INFO_MSG("KBEngineApp::onImportEntityDefCompleted: successfully!");
    KBEngine.app.entitydefImported = true;
    KBEngine.app.login_baseapp(false);
  };

  this.importClientMessages = function (stream) {
    var app = KBEngine.app;

    while (app.currMsgCount > 0) {
      app.currMsgCount--;
      var msgid = stream.readUint16();
      var msglen = stream.readInt16();
      var msgname = stream.readString();
      var argtype = stream.readInt8();
      var argsize = stream.readUint8();
      var argstypes = new Array(argsize);

      for (var i = 0; i < argsize; i++) {
        argstypes[i] = stream.readUint8();
      }

      var handler = null;
      var isClientMethod = msgname.indexOf("Client_") >= 0;

      if (isClientMethod) {
        handler = app[msgname];

        if (handler == null || handler == undefined) {
          KBEngine.WARNING_MSG("KBEngineApp::onImportClientMessages[" + app.currserver + "]: interface(" + msgname + "/" + msgid + ") no implement!");
          handler = null;
        } else {
          KBEngine.INFO_MSG("KBEngineApp::onImportClientMessages: import(" + msgname + ") successfully!");
        }
      }

      if (msgname.length > 0) {
        KBEngine.messages[msgname] = new KBEngine.Message(msgid, msgname, msglen, argtype, argstypes, handler);
        if (isClientMethod) KBEngine.clientmessages[msgid] = KBEngine.messages[msgname];else KBEngine.messages[KBEngine.app.currserver][msgid] = KBEngine.messages[msgname];
      } else {
        KBEngine.messages[app.currserver][msgid] = new KBEngine.Message(msgid, msgname, msglen, argtype, argstypes, handler);
      }
    }

    ;
    app.onImportClientMessagesCompleted();
    app.currMsgID = 0;
    app.currMsgLen = 0;
    app.currMsgCount = 0;
    app.fragmentStream = null;
  };

  this.Client_onImportClientMessages = function (msg) {
    var stream = new KBEngine.MemoryStream(msg.data);
    stream.wpos = msg.data.byteLength;
    var app = KBEngine.app;

    if (app.currMsgID == 0) {
      app.currMsgID = stream.readUint16();
    }

    if (app.currMsgID == KBEngine.messages.onImportClientMessages.id) {
      if (app.currMsgLen == 0) {
        app.currMsgLen = stream.readUint16();
        app.currMsgCount = stream.readUint16();
      }

      var FragmentDataTypes = KBEngine.FragmentDataTypes;

      if (stream.length() + 2 < app.currMsgLen && app.fragmentStream == null) {
        app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY, stream, app.currMsgLen - 2);
      } else if (app.fragmentStream != null) {
        app.mergeFragmentMessage(stream);

        if (app.fragmentStream.length() + 2 >= app.currMsgLen) {
          app.importClientMessages(app.fragmentStream);
        }
      } else {
        app.importClientMessages(stream);
      }
    } else {
      KBEngine.ERROR_MSG("KBEngineApp::onmessage: not found msg(" + app.currMsgID + ")!");
    }
  };

  this.createAccount = function (username, password, datas) {
    KBEngine.app.reset();
    KBEngine.app.username = username;
    KBEngine.app.password = password;
    KBEngine.app.clientdatas = datas;
    KBEngine.app.createAccount_loginapp(true);
  };

  this.getServerAddr = function (ip, port) {
    var serverAddr = KBEngine.app.protocol + ip;

    if (port != "") {
      serverAddr += ":" + port;
    }

    return serverAddr;
  };

  this.createAccount_loginapp = function (noconnect) {
    cc.log("this.createAccount_loginapp");

    if (noconnect) {
      var serverAddr = this.getServerAddr(KBEngine.app.ip, KBEngine.app.port);
      KBEngine.INFO_MSG("KBEngineApp::createAccount_loginapp: start connect to " + serverAddr + "!");
      KBEngine.app.currconnect = "loginapp";
      KBEngine.app.connect(serverAddr);
      KBEngine.app.socket.onopen = KBEngine.app.onOpenLoginapp_createAccount;
    } else {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_reqCreateAccount);
      bundle.writeString(KBEngine.app.username);
      bundle.writeString(KBEngine.app.password);
      bundle.writeBlob(KBEngine.app.clientdatas);
      bundle.send(KBEngine.app);
    }
  };

  this.bindAccountEmail = function (emailAddress) {
    var bundle = new KBEngine.Bundle();
    bundle.newMessage(KBEngine.messages.Baseapp_reqAccountBindEmail);
    bundle.writeInt32(KBEngine.app.entity_id);
    bundle.writeString(KBEngine.app.password);
    bundle.writeString(emailAddress);
    bundle.send(KBEngine.app);
  };

  this.newPassword = function (old_password, new_password) {
    var bundle = new KBEngine.Bundle();
    bundle.newMessage(KBEngine.messages.Baseapp_reqAccountNewPassword);
    bundle.writeInt32(KBEngine.app.entity_id);
    bundle.writeString(old_password);
    bundle.writeString(new_password);
    bundle.send(KBEngine.app);
  };

  this.login = function (username, password, datas) {
    KBEngine.app.reset();
    KBEngine.app.username = username;
    KBEngine.app.password = password;
    KBEngine.app.clientdatas = datas;
    KBEngine.app.login_loginapp(true);
  };

  this.logout = function () {
    var bundle = new KBEngine.Bundle();
    bundle.newMessage(KBEngine.messages.Baseapp_logoutBaseapp);
    bundle.writeUint64(KBEngine.app.entity_uuid);
    bundle.writeInt32(KBEngine.app.entity_id);
    bundle.send(KBEngine.app);
  };

  this.login_loginapp = function (noconnect) {
    //cc.log("send login_loginapp")
    if (noconnect) {
      var serverAddr = this.getServerAddr(KBEngine.app.ip, KBEngine.app.port);
      KBEngine.INFO_MSG("KBEngineApp::login_loginapp: start connect to " + serverAddr + "!");
      KBEngine.app.currconnect = "loginapp";
      KBEngine.app.connect(serverAddr);
      KBEngine.app.socket.onopen = KBEngine.app.onOpenLoginapp_login;
    } else {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_login);
      bundle.writeInt8(KBEngine.app.args.clientType); // clientType

      bundle.writeBlob(KBEngine.app.clientdatas);
      bundle.writeString(KBEngine.app.username);
      bundle.writeString(KBEngine.app.password);
      bundle.send(KBEngine.app);
    }
  };

  this.onOpenLoginapp_resetpassword = function () {
    KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_resetpassword: successfully!");
    KBEngine.app.currserver = "loginapp";
    KBEngine.app.currstate = "resetpassword";

    if (!KBEngine.app.loginappMessageImported) {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_importClientMessages);
      bundle.send(KBEngine.app);
      KBEngine.app.socket.onmessage = KBEngine.app.Client_onImportClientMessages;
      KBEngine.INFO_MSG("KBEngineApp::onOpenLoginapp_resetpassword: start importClientMessages ...");
    } else {
      KBEngine.app.onImportClientMessagesCompleted();
    }
  };

  this.reset_password = function (username) {
    KBEngine.app.reset();
    KBEngine.app.username = username;
    KBEngine.app.resetpassword_loginapp(true);
  };

  this.resetpassword_loginapp = function (noconnect) {
    if (noconnect) {
      var serverAddr = this.getServerAddr(KBEngine.app.ip, KBEngine.app.port);
      KBEngine.INFO_MSG("KBEngineApp::resetpassword_loginapp: start connect to " + serverAddr + "!");
      KBEngine.app.currconnect = "loginapp";
      KBEngine.app.connect(serverAddr);
      KBEngine.app.socket.onopen = KBEngine.app.onOpenLoginapp_resetpassword;
    } else {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Loginapp_reqAccountResetPassword);
      bundle.writeString(KBEngine.app.username);
      bundle.send(KBEngine.app);
    }
  };

  this.onOpenBaseapp = function () {
    KBEngine.INFO_MSG("KBEngineApp::onOpenBaseapp: successfully!");
    KBEngine.app.currserver = "baseapp";

    if (!KBEngine.app.baseappMessageImported) {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Baseapp_importClientMessages);
      bundle.send(KBEngine.app);
      KBEngine.app.socket.onmessage = KBEngine.app.Client_onImportClientMessages;
      KBEngine.Event.fire("Baseapp_importClientMessages");
    } else {
      KBEngine.app.onImportClientMessagesCompleted();
    }
  };

  this.login_baseapp = function (noconnect) {
    if (noconnect) {
      KBEngine.Event.fire(KBEngine.EventTypes.onLoginBaseapp);
      var serverAddr = this.getServerAddr(KBEngine.app.baseappIp, KBEngine.app.baseappPort);
      KBEngine.INFO_MSG("KBEngineApp::login_baseapp: start connect to " + serverAddr + "!");
      KBEngine.app.currconnect = "baseapp";
      KBEngine.app.connect(serverAddr);
      if (KBEngine.app.socket != undefined && KBEngine.app.socket != null) KBEngine.app.socket.onopen = KBEngine.app.onOpenBaseapp;
    } else {
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Baseapp_loginBaseapp);
      bundle.writeString(KBEngine.app.username);
      bundle.writeString(KBEngine.app.password);
      bundle.send(KBEngine.app);
    }
  };

  this.reloginBaseapp = function () {
    var dateObject = new Date();
    KBEngine.app.lastTickTime = dateObject.getTime();
    KBEngine.app.lastTickCBTime = dateObject.getTime();
    if (KBEngine.app.socket != undefined && KBEngine.app.socket != null) return;
    KBEngine.app.resetSocket();
    KBEngine.Event.fire(KBEngine.EventTypes.onReloginBaseapp);
    var serverAddr = this.getServerAddr(KBEngine.app.baseappIp, KBEngine.app.baseappPort);
    KBEngine.INFO_MSG("KBEngineApp::reloginBaseapp: start connect to " + serverAddr + "!");
    KBEngine.app.currconnect = "baseapp";
    KBEngine.app.connect(serverAddr);
    if (KBEngine.app.socket != undefined && KBEngine.app.socket != null) KBEngine.app.socket.onopen = KBEngine.app.onReOpenBaseapp;
  };

  this.onReOpenBaseapp = function () {
    KBEngine.INFO_MSG("KBEngineApp::onReOpenBaseapp: successfully!");
    KBEngine.app.currserver = "baseapp";
    var bundle = new KBEngine.Bundle();
    bundle.newMessage(KBEngine.messages.Baseapp_reloginBaseapp);
    bundle.writeString(KBEngine.app.username);
    bundle.writeString(KBEngine.app.password);
    bundle.writeUint64(KBEngine.app.entity_uuid);
    bundle.writeInt32(KBEngine.app.entity_id); //用我的Entity_id在baseapp.findEntity(id)

    bundle.send(KBEngine.app);
    var dateObject = new Date();
    KBEngine.app.lastTickCBTime = dateObject.getTime();
  };

  this.Client_onHelloCB = function (args) {
    KBEngine.app.serverVersion = args.readString();
    KBEngine.app.serverScriptVersion = args.readString();
    KBEngine.app.serverProtocolMD5 = args.readString();
    KBEngine.app.serverEntityDefMD5 = args.readString();
    var ctype = args.readInt32();
    KBEngine.INFO_MSG("KBEngineApp::Client_onHelloCB: verInfo(" + KBEngine.app.serverVersion + "), scriptVerInfo(" + KBEngine.app.serverScriptVersion + "), serverProtocolMD5(" + KBEngine.app.serverProtocolMD5 + "), serverEntityDefMD5(" + KBEngine.app.serverEntityDefMD5 + "), ctype(" + ctype + ")!");
    var dateObject = new Date();
    KBEngine.app.lastTickCBTime = dateObject.getTime();
  };

  this.Client_onLoginFailed = function (args) {
    var failedcode = args.readUint16();
    KBEngine.app.serverdatas = args.readBlob();
    KBEngine.ERROR_MSG("KBEngineApp::Client_onLoginFailed: failedcode(" + KBEngine.app.serverErrs[failedcode].name + "), datas(" + KBEngine.app.serverdatas.length + ")!");
    KBEngine.Event.fire(KBEngine.EventTypes.onLoginFailed, failedcode);
  };

  this.Client_onLoginSuccessfully = function (args) {
    var accountName = args.readString();
    KBEngine.app.username = accountName;
    KBEngine.app.baseappIp = args.readString();
    KBEngine.app.baseappPort = args.readUint16();
    KBEngine.app.serverdatas = args.readBlob();
    cc.log("this.Client_onLoginSuccessfully111");
    KBEngine.INFO_MSG("KBEngineApp::Client_onLoginSuccessfully: accountName(" + accountName + "), addr(" + KBEngine.app.baseappIp + ":" + KBEngine.app.baseappPort + "), datas(" + KBEngine.app.serverdatas.length + ")!");
    KBEngine.app.disconnect();
    KBEngine.app.login_baseapp(true);
  };

  this.Client_onLoginBaseappFailed = function (failedcode) {
    KBEngine.ERROR_MSG("KBEngineApp::Client_onLoginBaseappFailed: failedcode(" + KBEngine.app.serverErrs[failedcode].name + ")!");
    KBEngine.Event.fire(KBEngine.onLoginBaseappFailed.onLoginBaseappFailed, failedcode);
  };

  this.Client_onReloginBaseappFailed = function (failedcode) {
    KBEngine.ERROR_MSG("KBEngineApp::Client_onReloginBaseappFailed: failedcode(" + KBEngine.app.serverErrs[failedcode].name + ")!");
    KBEngine.Event.fire(KBEngine.EventTypes.onReloginBaseappFailed, failedcode);
  };

  this.Client_onReloginBaseappSuccessfully = function (stream) {
    KBEngine.app.entity_uuid = stream.readUint64();
    KBEngine.DEBUG_MSG("KBEngineApp::Client_onReloginBaseappSuccessfully: " + KBEngine.app.username);
    KBEngine.Event.fire(KBEngine.EventTypes.onReloginBaseappSuccessfully);
  };

  this.entityclass = {};

  this.getentityclass = function (entityType) {
    var runclass = KBEngine.app.entityclass[entityType];

    if (runclass == undefined) {
      runclass = KBEngine[entityType];

      if (runclass == undefined) {
        KBEngine.ERROR_MSG("KBEngineApp::getentityclass: entityType(" + entityType + ") is error!");
        return runclass;
      } else KBEngine.app.entityclass[entityType] = runclass;
    }

    return runclass;
  };

  this.Client_onCreatedProxies = function (rndUUID, eid, entityType) {
    KBEngine.INFO_MSG("KBEngineApp::Client_onCreatedProxies: eid(" + eid + "), entityType(" + entityType + ")!");
    var entity = KBEngine.app.entities[eid];
    KBEngine.app.entity_uuid = rndUUID;
    KBEngine.app.entity_id = eid;

    if (entity == undefined) {
      var runclass = KBEngine.app.getentityclass(entityType);
      if (runclass == undefined) return;
      var entity = new runclass();
      entity.id = eid;
      entity.className = entityType;
      entity.base = new KBEngine.EntityCall();
      entity.base.id = eid;
      entity.base.className = entityType;
      entity.base.type = KBEngine.ENTITYCALL_TYPE_BASE;
      KBEngine.app.entities[eid] = entity;
      var entityMessage = KBEngine.bufferedCreateEntityMessages[eid];

      if (entityMessage != undefined) {
        KBEngine.app.Client_onUpdatePropertys(entityMessage);
        delete KBEngine.bufferedCreateEntityMessages[eid];
      }

      entity.__init__();

      entity.inited = true;
      if (KBEngine.app.args.isOnInitCallPropertysSetMethods) entity.callPropertysSetMethods();
    } else {
      var entityMessage = KBEngine.bufferedCreateEntityMessages[eid];

      if (entityMessage != undefined) {
        KBEngine.app.Client_onUpdatePropertys(entityMessage);
        delete KBEngine.bufferedCreateEntityMessages[eid];
      }
    }
  };

  this.getViewEntityIDFromStream = function (stream) {
    var id = 0;

    if (KBEngine.app.entityIDAliasIDList.Length > 255) {
      id = stream.readInt32();
    } else {
      var aliasID = stream.readUint8(); // 如果为0且客户端上一步是重登陆或者重连操作并且服务端entity在断线期间一直处于在线状态
      // 则可以忽略这个错误, 因为cellapp可能一直在向baseapp发送同步消息， 当客户端重连上时未等
      // 服务端初始化步骤开始则收到同步信息, 此时这里就会出错。

      if (KBEngine.app.entityIDAliasIDList.length <= aliasID) return 0;
      id = KBEngine.app.entityIDAliasIDList[aliasID];
    }

    return id;
  };

  this.onUpdatePropertys_ = function (eid, stream) {
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      var entityMessage = KBEngine.bufferedCreateEntityMessages[eid];

      if (entityMessage != undefined) {
        KBEngine.ERROR_MSG("KBEngineApp::Client_onUpdatePropertys: entity(" + eid + ") not found!");
        return;
      }

      var stream1 = new KBEngine.MemoryStream(stream.buffer);
      stream1.wpos = stream.wpos;
      stream1.rpos = stream.rpos - 4;
      KBEngine.bufferedCreateEntityMessages[eid] = stream1;
      return;
    }

    var currModule = KBEngine.moduledefs[entity.className];
    var pdatas = currModule.propertys;

    while (stream.length() > 0) {
      var utype = 0;
      if (currModule.usePropertyDescrAlias) utype = stream.readUint8();else utype = stream.readUint16();
      var propertydata = pdatas[utype];
      var setmethod = propertydata[5];
      var flags = propertydata[6];
      var val = propertydata[4].createFromStream(stream);
      var oldval = entity[propertydata[2]];
      KBEngine.INFO_MSG("KBEngineApp::Client_onUpdatePropertys: " + entity.className + "(id=" + eid + " " + propertydata[2] + ", val=" + val + ")!");

      if (propertydata[2] == "position") {
        cc.log("val.y", val.y);
        val.y = 0;
      }

      entity[propertydata[2]] = val;

      if (setmethod != null) {
        // base类属性或者进入世界后cell类属性会触发set_*方法
        if (flags == 0x00000020 || flags == 0x00000040) {
          if (entity.inited) setmethod.call(entity, oldval);
        } else {
          if (entity.inWorld) {
            cc.log("setmethod=", setmethod);
            setmethod.call(entity, oldval);
          }
        }
      }
    }
  };

  this.Client_onUpdatePropertysOptimized = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    KBEngine.app.onUpdatePropertys_(eid, stream);
  };

  this.Client_onUpdatePropertys = function (stream) {
    var eid = stream.readInt32();
    KBEngine.app.onUpdatePropertys_(eid, stream);
  };

  this.onRemoteMethodCall_ = function (eid, stream) {
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onRemoteMethodCall: entity(" + eid + ") not found!");
      return;
    }

    var methodUtype = 0;
    if (KBEngine.moduledefs[entity.className].useMethodDescrAlias) methodUtype = stream.readUint8();else methodUtype = stream.readUint16();
    var methoddata = KBEngine.moduledefs[entity.className].methods[methodUtype];
    var args = [];
    var argsdata = methoddata[3];

    for (var i = 0; i < argsdata.length; i++) {
      args.push(argsdata[i].createFromStream(stream));
    }

    if (entity[methoddata[2]] != undefined) {
      entity[methoddata[2]].apply(entity, args);
    } else {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onRemoteMethodCall: entity(" + eid + ") not found method(" + methoddata[2] + ")!");
    }
  };

  this.Client_onRemoteMethodCallOptimized = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    KBEngine.app.onRemoteMethodCall_(eid, stream);
  };

  this.Client_onRemoteMethodCall = function (stream) {
    var eid = stream.readInt32();
    KBEngine.app.onRemoteMethodCall_(eid, stream);
  };

  this.Client_onEntityEnterWorld = function (stream) {
    var eid = stream.readInt32();
    if (KBEngine.app.entity_id > 0 && eid != KBEngine.app.entity_id) KBEngine.app.entityIDAliasIDList.push(eid);
    var entityType;
    if (KBEngine.moduledefs.Length > 255) entityType = stream.readUint16();else entityType = stream.readUint8();
    var isOnGround = true;
    if (stream.length() > 0) isOnGround = stream.readInt8();
    cc.log("entityType=", entityType);
    entityType = KBEngine.moduledefs[entityType].name;
    KBEngine.INFO_MSG("KBEngineApp::Client_onEntityEnterWorld: " + entityType + "(" + eid + "), spaceID(" + KBEngine.app.spaceID + "), isOnGround(" + isOnGround + ")!");
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      var entityMessage = KBEngine.bufferedCreateEntityMessages[eid];

      if (entityMessage == undefined) {
        KBEngine.ERROR_MSG("KBEngineApp::Client_onEntityEnterWorld: entity(" + eid + ") not found!");
        return;
      }

      var runclass = KBEngine.app.getentityclass(entityType);
      if (runclass == undefined) return;
      var entity = new runclass();
      entity.id = eid;
      entity.className = entityType;
      entity.cell = new KBEngine.EntityCall();
      entity.cell.id = eid;
      entity.cell.className = entityType;
      entity.cell.type = KBEngine.ENTITYCALL_TYPE_CELL;
      KBEngine.app.entities[eid] = entity;
      KBEngine.app.Client_onUpdatePropertys(entityMessage);
      delete KBEngine.bufferedCreateEntityMessages[eid];
      entity.isOnGround = isOnGround > 0;

      entity.__init__();

      entity.inited = true;
      entity.inWorld = true;
      entity.enterWorld();
      if (KBEngine.app.args.isOnInitCallPropertysSetMethods) entity.callPropertysSetMethods();
      entity.set_direction(entity.direction);
      entity.set_position(entity.position);
    } else {
      if (!entity.inWorld) {
        entity.cell = new KBEngine.EntityCall();
        entity.cell.id = eid;
        entity.cell.className = entityType;
        entity.cell.type = KBEngine.ENTITYCALL_TYPE_CELL; // 安全起见， 这里清空一下
        // 如果服务端上使用giveClientTo切换控制权
        // 之前的实体已经进入世界， 切换后的实体也进入世界， 这里可能会残留之前那个实体进入世界的信息

        KBEngine.app.entityIDAliasIDList = [];
        KBEngine.app.entities = {};
        KBEngine.app.entities[entity.id] = entity;
        entity.set_direction(entity.direction);
        entity.set_position(entity.position);
        KBEngine.app.entityServerPos.x = entity.position.x;
        KBEngine.app.entityServerPos.y = entity.position.y;
        KBEngine.app.entityServerPos.z = entity.position.z;
        entity.isOnGround = isOnGround > 0;
        entity.inWorld = true;
        entity.enterWorld();
        if (KBEngine.app.args.isOnInitCallPropertysSetMethods) entity.callPropertysSetMethods();
      }
    }
  };

  this.Client_onEntityLeaveWorldOptimized = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    KBEngine.app.Client_onEntityLeaveWorld(eid);
  };

  this.Client_onEntityLeaveWorld = function (eid) {
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onEntityLeaveWorld: entity(" + eid + ") not found!");
      return;
    }

    if (entity.inWorld) entity.leaveWorld();

    if (KBEngine.app.entity_id > 0 && eid != KBEngine.app.entity_id) {
      var newArray0 = [];

      for (var i = 0; i < KBEngine.app.controlledEntities.length; i++) {
        if (KBEngine.app.controlledEntities[i] != eid) {
          newArray0.push(KBEngine.app.controlledEntities[i]);
        } else {
          KBEngine.Event.fire(KBEngine.EventTypes.onLoseControlledEntity);
        }
      }

      KBEngine.app.controlledEntities = newArray0;
      delete KBEngine.app.entities[eid];
      var newArray = [];

      for (var i = 0; i < KBEngine.app.entityIDAliasIDList.length; i++) {
        if (KBEngine.app.entityIDAliasIDList[i] != eid) {
          newArray.push(KBEngine.app.entityIDAliasIDList[i]);
        }
      }

      KBEngine.app.entityIDAliasIDList = newArray;
    } else {
      KBEngine.app.clearSpace(false);
      entity.cell = null;
    }
  };

  this.Client_onEntityDestroyed = function (eid) {
    KBEngine.INFO_MSG("KBEngineApp::Client_onEntityDestroyed: entity(" + eid + ")!");
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onEntityDestroyed: entity(" + eid + ") not found!");
      return;
    }

    if (entity.inWorld) {
      if (KBEngine.app.entity_id == eid) KBEngine.app.clearSpace(false);
      entity.leaveWorld();
    }

    delete KBEngine.app.entities[eid];
  };

  this.Client_onEntityEnterSpace = function (stream) {
    var eid = stream.readInt32();
    KBEngine.app.spaceID = stream.readUint32();
    var isOnGround = true;
    if (stream.length() > 0) isOnGround = stream.readInt8();
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onEntityEnterSpace: entity(" + eid + ") not found!");
      return;
    }

    entity.isOnGround = isOnGround;
    KBEngine.app.entityServerPos.x = entity.position.x;
    KBEngine.app.entityServerPos.y = entity.position.y;
    KBEngine.app.entityServerPos.z = entity.position.z;
    entity.enterSpace();
  };

  this.Client_onEntityLeaveSpace = function (eid) {
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onEntityLeaveSpace: entity(" + eid + ") not found!");
      return;
    }

    KBEngine.app.clearSpace(false);
    entity.leaveSpace();
  };

  this.Client_onKicked = function (failedcode) {
    KBEngine.ERROR_MSG("KBEngineApp::Client_onKicked: failedcode(" + KBEngine.app.serverErrs[failedcode].name + ")!");
    KBEngine.Event.fire(KBEngine.EventTypes.onKicked, failedcode);
  };

  this.Client_onCreateAccountResult = function (stream) {
    var retcode = stream.readUint16();
    var datas = stream.readBlob();
    KBEngine.Event.fire(KBEngine.EventTypes.onCreateAccountResult, retcode, datas);

    if (retcode != 0) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onCreateAccountResult: " + KBEngine.app.username + " create is failed! code=" + KBEngine.app.serverErrs[retcode].name + "!");
      return;
    }

    KBEngine.INFO_MSG("KBEngineApp::Client_onCreateAccountResult: " + KBEngine.app.username + " create is successfully!");
  };

  this.Client_onControlEntity = function (eid, isControlled) {
    var eid = stream.readInt32();
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onControlEntity: entity(" + eid + ") not found!");
      return;
    }

    var isCont = isControlled != 0;

    if (isCont) {
      // 如果被控制者是玩家自己，那表示玩家自己被其它人控制了
      // 所以玩家自己不应该进入这个被控制列表
      if (KBEngine.app.player().id != entity.id) {
        KBEngine.app.controlledEntities.push(entity);
      }
    } else {
      var newArray = [];

      for (var i = 0; i < KBEngine.app.controlledEntities.length; i++) {
        if (KBEngine.app.controlledEntities[i] != entity.id) newArray.push(KBEngine.app.controlledEntities[i]);
      }

      KBEngine.app.controlledEntities = newArray;
    }

    entity.isControlled = isCont;

    try {
      entity.onControlled(isCont);
      KBEngine.Event.fire(KBEngine.EventTypes.onControlled, entity, isCont);
    } catch (e) {
      KBEngine.ERROR_MSG("KBEngine::Client_onControlEntity: entity id = '" + eid + "', is controlled = '" + isCont + "', error = '" + e + "'");
    }
  };

  this.updatePlayerToServer = function () {
    var player = KBEngine.app.player();
    if (player == undefined || player.inWorld == false || KBEngine.app.spaceID == 0 || player.isControlled) return;

    if (player.entityLastLocalPos.distance(player.position) > 0.001 || player.entityLastLocalDir.distance(player.direction) > 0.001) {
      // 记录玩家最后一次上报位置时自身当前的位置
      player.entityLastLocalPos.x = player.position.x;
      player.entityLastLocalPos.y = player.position.y;
      player.entityLastLocalPos.z = player.position.z;
      player.entityLastLocalDir.x = player.direction.x;
      player.entityLastLocalDir.y = player.direction.y;
      player.entityLastLocalDir.z = player.direction.z;
      var bundle = new KBEngine.Bundle();
      bundle.newMessage(KBEngine.messages.Baseapp_onUpdateDataFromClient);
      bundle.writeFloat(player.position.x);
      bundle.writeFloat(player.position.y);
      bundle.writeFloat(player.position.z);
      bundle.writeFloat(player.direction.x);
      bundle.writeFloat(player.direction.y);
      bundle.writeFloat(player.direction.z);
      bundle.writeUint8(player.isOnGround);
      bundle.writeUint32(KBEngine.app.spaceID);
      bundle.send(KBEngine.app);
    } // 开始同步所有被控制了的entity的位置


    for (var eid in KBEngine.app.controlledEntities) {
      var entity = KBEngine.app.controlledEntities[i];
      position = entity.position;
      direction = entity.direction;
      posHasChanged = entity.entityLastLocalPos.distance(position) > 0.001;
      dirHasChanged = entity.entityLastLocalDir.distance(direction) > 0.001;

      if (posHasChanged || dirHasChanged) {
        entity.entityLastLocalPos = position;
        entity.entityLastLocalDir = direction;
        var bundle = new KBEngine.Bundle();
        bundle.newMessage(KBEngine.messages.Baseapp_onUpdateDataFromClientForControlledEntity);
        bundle.writeInt32(entity.id);
        bundle.writeFloat(position.x);
        bundle.writeFloat(position.y);
        bundle.writeFloat(position.z);
        bundle.writeFloat(direction.x);
        bundle.writeFloat(direction.y);
        bundle.writeFloat(direction.z);
        bundle.writeUint8(entity.isOnGround);
        bundle.writeUint32(KBEngine.app.spaceID);
        bundle.send(KBEngine.app);
      }
    }
  };

  this.addSpaceGeometryMapping = function (spaceID, respath) {
    KBEngine.INFO_MSG("KBEngineApp::addSpaceGeometryMapping: spaceID(" + spaceID + "), respath(" + respath + ")!");
    KBEngine.app.spaceID = spaceID;
    KBEngine.app.spaceResPath = respath;
    KBEngine.Event.fire(KBEngine.EventTypes.addSpaceGeometryMapping, respath);
  };

  this.clearSpace = function (isAll) {
    KBEngine.app.entityIDAliasIDList = [];
    KBEngine.app.spacedata = {};
    KBEngine.app.clearEntities(isAll);
    KBEngine.app.isLoadedGeometry = false;
    KBEngine.app.spaceID = 0;
  };

  this.clearEntities = function (isAll) {
    KBEngine.app.controlledEntities = [];

    if (!isAll) {
      var entity = KBEngine.app.player();

      for (var eid in KBEngine.app.entities) {
        if (eid == entity.id) continue;

        if (KBEngine.app.entities[eid].inWorld) {
          KBEngine.app.entities[eid].leaveWorld();
        }

        KBEngine.app.entities[eid].onDestroy();
      }

      KBEngine.app.entities = {};
      KBEngine.app.entities[entity.id] = entity;
    } else {
      for (var eid in KBEngine.app.entities) {
        if (KBEngine.app.entities[eid].inWorld) {
          KBEngine.app.entities[eid].leaveWorld();
        }

        KBEngine.app.entities[eid].onDestroy();
      }

      KBEngine.app.entities = {};
    }
  };

  this.Client_initSpaceData = function (stream) {
    KBEngine.app.clearSpace(false);
    KBEngine.app.spaceID = stream.readInt32();

    while (stream.length() > 0) {
      var key = stream.readString();
      var value = stream.readString();
      KBEngine.app.Client_setSpaceData(KBEngine.app.spaceID, key, value);
    } //KBEngine.Event.fire(KBEngine.EventTypes.onSetSpaceData);


    KBEngine.INFO_MSG("KBEngineApp::Client_initSpaceData: spaceID(" + KBEngine.app.spaceID + "), datas(" + KBEngine.app.spacedata + ")!");
  };

  this.Client_setSpaceData = function (spaceID, key, value) {
    KBEngine.INFO_MSG("KBEngineApp::Client_setSpaceData: spaceID(" + spaceID + "), key(" + key + "), value(" + value + ")!");
    KBEngine.app.spacedata[key] = value;
    if (key == "_mapping") KBEngine.app.addSpaceGeometryMapping(spaceID, value);
    KBEngine.Event.fire(KBEngine.EventTypes.onSetSpaceData, spaceID, key, value);
  };

  this.Client_delSpaceData = function (spaceID, key) {
    KBEngine.INFO_MSG("KBEngineApp::Client_delSpaceData: spaceID(" + spaceID + "), key(" + key + ")!");
    delete KBEngine.app.spacedata[key];
    KBEngine.Event.fire(KBEngine.EventTypes.onDelSpaceData, spaceID, key);
  };

  this.Client_getSpaceData = function (spaceID, key) {
    return KBEngine.app.spacedata[key];
  };

  this.Client_onUpdateBasePos = function (x, y, z) {
    KBEngine.app.entityServerPos.x = x;
    KBEngine.app.entityServerPos.y = y;
    KBEngine.app.entityServerPos.z = z;
  };

  this.Client_onUpdateBasePosXZ = function (x, z) {
    KBEngine.app.entityServerPos.x = x;
    KBEngine.app.entityServerPos.z = z;
  };

  this.Client_onUpdateData = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onUpdateData: entity(" + eid + ") not found!");
      return;
    }
  };

  this.Client_onSetEntityPosAndDir = function (stream) {
    var eid = stream.readInt32();
    var entity = KBEngine.app.entities[eid];

    if (entity == undefined) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onSetEntityPosAndDir: entity(" + eid + ") not found!");
      return;
    }

    entity.position.x = stream.readFloat();
    entity.position.y = stream.readFloat();
    entity.position.z = stream.readFloat();
    entity.direction.x = stream.readFloat();
    entity.direction.y = stream.readFloat();
    entity.direction.z = stream.readFloat(); // 记录玩家最后一次上报位置时自身当前的位置

    entity.entityLastLocalPos.x = entity.position.x;
    entity.entityLastLocalPos.y = entity.position.y;
    entity.entityLastLocalPos.z = entity.position.z;
    entity.entityLastLocalDir.x = entity.direction.x;
    entity.entityLastLocalDir.y = entity.direction.y;
    entity.entityLastLocalDir.z = entity.direction.z;
    entity.set_direction(entity.direction);
    entity.set_position(entity.position);
  };

  this.Client_onUpdateData_ypr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var y = stream.readInt8();
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, y, p, r, -1);
  };

  this.Client_onUpdateData_yp = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var y = stream.readInt8();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, y, p, KBEngine.KBE_FLT_MAX, -1);
  };

  this.Client_onUpdateData_yr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var y = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, y, KBEngine.KBE_FLT_MAX, r, -1);
  };

  this.Client_onUpdateData_pr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, p, r, -1);
  };

  this.Client_onUpdateData_y = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var y = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, y, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, -1);
  };

  this.Client_onUpdateData_p = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, p, KBEngine.KBE_FLT_MAX, -1);
  };

  this.Client_onUpdateData_r = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, r, -1);
  };

  this.Client_onUpdateData_xz = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, 1);
  };

  this.Client_onUpdateData_xz_ypr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readInt8();
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], y, p, r, 1);
  };

  this.Client_onUpdateData_xz_yp = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readInt8();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], y, p, KBEngine.KBE_FLT_MAX, 1);
  };

  this.Client_onUpdateData_xz_yr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], y, KBEngine.KBE_FLT_MAX, r, 1);
  };

  this.Client_onUpdateData_xz_pr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], KBEngine.KBE_FLT_MAX, p, r, 1);
  };

  this.Client_onUpdateData_xz_y = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], y, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, 1);
  };

  this.Client_onUpdateData_xz_p = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], KBEngine.KBE_FLT_MAX, p, KBEngine.KBE_FLT_MAX, 1);
  };

  this.Client_onUpdateData_xz_r = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], KBEngine.KBE_FLT_MAX, xz[1], KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, r, 1);
  };

  this.Client_onUpdateData_xyz = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, 0);
  };

  this.Client_onUpdateData_xyz_ypr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var yaw = stream.readInt8();
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], yaw, p, r, 0);
  };

  this.Client_onUpdateData_xyz_yp = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var yaw = stream.readInt8();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], yaw, p, KBEngine.KBE_FLT_MAX, 0);
  };

  this.Client_onUpdateData_xyz_yr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var yaw = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], yaw, KBEngine.KBE_FLT_MAX, r, 0);
  };

  this.Client_onUpdateData_xyz_pr = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var p = stream.readInt8();
    var r = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, x, y, z, KBEngine.KBE_FLT_MAX, p, r, 0);
  };

  this.Client_onUpdateData_xyz_y = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var yaw = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], yaw, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, 0);
  };

  this.Client_onUpdateData_xyz_p = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], KBEngine.KBE_FLT_MAX, p, KBEngine.KBE_FLT_MAX, 0);
  };

  this.Client_onUpdateData_xyz_r = function (stream) {
    var eid = KBEngine.app.getViewEntityIDFromStream(stream);
    var xz = stream.readPackXZ();
    var y = stream.readPackY();
    var p = stream.readInt8();

    KBEngine.app._updateVolatileData(eid, xz[0], y, xz[1], r, KBEngine.KBE_FLT_MAX, KBEngine.KBE_FLT_MAX, 0);
  };

  this._updateVolatileData = function (entityID, x, y, z, yaw, pitch, roll, isOnGround) {
    var entity = KBEngine.app.entities[entityID];

    if (entity == undefined) {
      // 如果为0且客户端上一步是重登陆或者重连操作并且服务端entity在断线期间一直处于在线状态
      // 则可以忽略这个错误, 因为cellapp可能一直在向baseapp发送同步消息， 当客户端重连上时未等
      // 服务端初始化步骤开始则收到同步信息, 此时这里就会出错。			
      KBEngine.ERROR_MSG("KBEngineApp::_updateVolatileData: entity(" + entityID + ") not found!");
      return;
    } // 小于0不设置


    if (isOnGround >= 0) {
      entity.isOnGround = isOnGround > 0;
    }

    var changeDirection = false;

    if (roll != KBEngine.KBE_FLT_MAX) {
      changeDirection = true;
      entity.direction.x = KBEngine.int82angle(roll, false);
    }

    if (pitch != KBEngine.KBE_FLT_MAX) {
      changeDirection = true;
      entity.direction.y = KBEngine.int82angle(pitch, false);
    }

    if (yaw != KBEngine.KBE_FLT_MAX) {
      changeDirection = true;
      entity.direction.z = KBEngine.int82angle(yaw, false);
    }

    var done = false;

    if (changeDirection == true) {
      KBEngine.Event.fire(KBEngine.EventTypes.set_direction, entity);
      done = true;
    }

    var positionChanged = false;
    if (x != KBEngine.KBE_FLT_MAX || y != KBEngine.KBE_FLT_MAX || z != KBEngine.KBE_FLT_MAX) positionChanged = true;
    if (x == KBEngine.KBE_FLT_MAX) x = 0.0;
    if (y == KBEngine.KBE_FLT_MAX) y = 0.0;
    if (z == KBEngine.KBE_FLT_MAX) z = 0.0;

    if (positionChanged) {
      entity.position.x = x + KBEngine.app.entityServerPos.x;
      entity.position.y = y + KBEngine.app.entityServerPos.y;
      entity.position.z = z + KBEngine.app.entityServerPos.z;
      done = true;
      KBEngine.Event.fire(KBEngine.EventTypes.updatePosition, entity);
    }

    if (done) entity.onUpdateVolatileData();
  };

  this.Client_onStreamDataStarted = function (id, datasize, descr) {
    KBEngine.Event.fire(KBEngine.EventTypes.onStreamDataStarted, id, datasize, descr);
  };

  this.Client_onStreamDataRecv = function (stream) {
    var id = stream.readUint16();
    var data = stream.readBlob();
    KBEngine.Event.fire(KBEngine.EventTypes.onStreamDataRecv, id, data);
  };

  this.Client_onStreamDataCompleted = function (id) {
    KBEngine.Event.fire(KBEngine.EventTypes.onStreamDataCompleted, id);
  };

  this.Client_onReqAccountResetPasswordCB = function (failedcode) {
    if (failedcode != 0) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onReqAccountResetPasswordCB: " + KBEngine.app.username + " is failed! code=" + KBEngine.app.serverErrs[failedcode].name + "!");
      return;
    }

    KBEngine.INFO_MSG("KBEngineApp::Client_onReqAccountResetPasswordCB: " + KBEngine.app.username + " is successfully!");
  };

  this.Client_onReqAccountBindEmailCB = function (failedcode) {
    if (failedcode != 0) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onReqAccountBindEmailCB: " + KBEngine.app.username + " is failed! code=" + KBEngine.app.serverErrs[failedcode].name + "!");
      return;
    }

    KBEngine.INFO_MSG("KBEngineApp::Client_onReqAccountBindEmailCB: " + KBEngine.app.username + " is successfully!");
  };

  this.Client_onReqAccountNewPasswordCB = function (failedcode) {
    if (failedcode != 0) {
      KBEngine.ERROR_MSG("KBEngineApp::Client_onReqAccountNewPasswordCB: " + KBEngine.app.username + " is failed! code=" + KBEngine.app.serverErrs[failedcode].name + "!");
      return;
    }

    KBEngine.INFO_MSG("KBEngineApp::Client_onReqAccountNewPasswordCB: " + KBEngine.app.username + " is successfully!");
  };
};

KBEngine.create = function (kbengineArgs) {
  if (KBEngine.app != undefined) return; // 一些平台如小程序上可能没有assert

  if (console.assert == undefined) {
    console.assert = function (bRet, s) {
      if (!bRet) {
        KBEngine.ERROR_MSG(s);
      }
    };
  }

  if (kbengineArgs.constructor != KBEngine.KBEngineArgs) {
    KBEngine.ERROR_MSG("KBEngine.create(): args(" + kbengineArgs + ") error! not is KBEngine.KBEngineArgs");
    return;
  }

  new KBEngine.KBEngineApp(kbengineArgs);
  KBEngine.app.reset();
  KBEngine.app.installEvents();
  KBEngine.idInterval = setInterval(KBEngine.app.update, kbengineArgs.updateHZ);
};

KBEngine.destroy = function () {
  if (KBEngine.idInterval != undefined) clearInterval(KBEngine.idInterval);
  if (KBEngine.app == undefined) return;
  KBEngine.app.uninstallEvents();
  KBEngine.app.reset();
  KBEngine.app = undefined;
};

try {
  if (module != undefined) {
    module.exports = KBEngine;
  }
} catch (e) {}

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xca2JlbmdpbmUuanMiXSwibmFtZXMiOlsiS0JFbmdpbmUiLCJDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwiZm5UZXN0IiwidGVzdCIsInh5eiIsInByb3RvIiwiT2JqZWN0IiwiY3JlYXRlIiwibmFtZSIsImZuIiwidG1wIiwicmV0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJuZXdDbGFzcyIsImN0b3IiLCJoYXNPd25Qcm9wZXJ0eSIsIlN1YkNsYXNzIiwiRW1wdHlDbGFzcyIsImNvbnN0cnVjdG9yIiwiQXJyYXlCdWZmZXIiLCJ0cmFuc2ZlciIsInNvdXJjZSIsImxlbmd0aCIsImRlc3QiLCJUeXBlRXJyb3IiLCJieXRlTGVuZ3RoIiwiYnVmIiwiVWludDhBcnJheSIsInNldCIsIlJhbmdlRXJyb3IiLCJ3aW5kb3ciLCJQQUNLRVRfTUFYX1NJWkUiLCJQQUNLRVRfTUFYX1NJWkVfVENQIiwiUEFDS0VUX01BWF9TSVpFX1VEUCIsIk1FU1NBR0VfSURfTEVOR1RIIiwiTUVTU0FHRV9MRU5HVEhfTEVOR1RIIiwiTUVTU0FHRV9MRU5HVEgxX0xFTkdUSCIsIk1FU1NBR0VfTUFYX1NJWkUiLCJDTElFTlRfTk9fRkxPQVQiLCJLQkVfRkxUX01BWCIsIklOVDY0IiwibG8iLCJoaSIsInNpZ24iLCJ0b1N0cmluZyIsInJlc3VsdCIsImxvdyIsImhpZ2giLCJpIiwiVUlOVDY0IiwiSU5GT19NU0ciLCJzIiwiY29uc29sZSIsImluZm8iLCJERUJVR19NU0ciLCJkZWJ1ZyIsIkVSUk9SX01TRyIsImVycm9yIiwiV0FSTklOR19NU0ciLCJ3YXJuIiwidXRmOEFycmF5VG9TdHJpbmciLCJhcnJheSIsIm91dCIsImxlbiIsImMiLCJjaGFyMiIsImNoYXIzIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwic3RyaW5nVG9VVEY4Qnl0ZXMiLCJzdHIiLCJ1dGY4IiwiY2hhcmNvZGUiLCJjaGFyQ29kZUF0IiwicHVzaCIsIkV2ZW50SW5mbyIsImNsYXNzaW5zdCIsImNhbGxiYWNrZm4iLCJGaXJlZEV2ZW50IiwiZXZ0TmFtZSIsImV2dEluZm8iLCJhcnMiLCJFdmVudCIsIl9ldmVudHMiLCJfaXNQYXVzZSIsIl9maXJlZEV2ZW50cyIsInJlZ2lzdGVyIiwic3RyQ2FsbGJhY2siLCJ1bmRlZmluZWQiLCJldnRsc3QiLCJkZXJlZ2lzdGVyQWxsIiwiaXRlbWtleSIsImRlcmVnaXN0ZXIiLCJmb3VuZCIsInNwbGljZSIsInJlbW92ZUZpcmVkRXZlbnQiLCJyZW1vdmVBbGxGaXJlZEV2ZW50IiwiZmlyZWRFdmVudHMiLCJldnQiLCJmaXJlIiwiZW9iaiIsInBhdXNlIiwicmVzdW1lIiwic2hpZnQiLCJNZW1vcnlTdHJlYW0iLCJzaXplX29yX2J1ZmZlciIsImJ1ZmZlciIsInJwb3MiLCJ3cG9zIiwiUGFja0Zsb2F0WFR5cGUiLCJfdW5pb25EYXRhIiwiZnYiLCJGbG9hdDMyQXJyYXkiLCJ1diIsIlVpbnQzMkFycmF5IiwiaXYiLCJJbnQzMkFycmF5IiwicmVhZEludDgiLCJJbnQ4QXJyYXkiLCJyZWFkSW50MTYiLCJ2IiwicmVhZFVpbnQxNiIsInJlYWRJbnQzMiIsInJlYWRVaW50MzIiLCJyZWFkSW50NjQiLCJyZWFkVWludDgiLCJyZWFkVWludDY0IiwicmVhZEZsb2F0IiwiZSIsInNsaWNlIiwicmVhZERvdWJsZSIsIkZsb2F0NjRBcnJheSIsInJlYWRTdHJpbmciLCJFcnJvciIsInJlYWRCbG9iIiwic2l6ZSIsInJlYWRTdHJlYW0iLCJyZWFkUGFja1haIiwieFBhY2tEYXRhIiwielBhY2tEYXRhIiwidjEiLCJ2MiIsInYzIiwiZGF0YSIsIkFycmF5IiwicmVhZFBhY2tZIiwid3JpdGVJbnQ4Iiwid3JpdGVJbnQxNiIsIndyaXRlSW50MzIiLCJ3cml0ZUludDY0Iiwid3JpdGVVaW50OCIsIndyaXRlVWludDE2Iiwid3JpdGVVaW50MzIiLCJ3cml0ZVVpbnQ2NCIsIndyaXRlRmxvYXQiLCJidWYxIiwiYnVmMiIsIndyaXRlRG91YmxlIiwid3JpdGVCbG9iIiwic3BhY2UiLCJ3cml0ZVN0cmluZyIsImlkeCIsImFwcGVuZCIsInN0cmVhbSIsIm9mZnNldCIsInJlYWRTa2lwIiwicmVhZEVPRiIsImRvbmUiLCJnZXRidWZmZXIiLCJjbGVhciIsIkJ1bmRsZSIsIm1lbW9yeXN0cmVhbXMiLCJudW1NZXNzYWdlIiwibWVzc2FnZUxlbmd0aEJ1ZmZlciIsIm1lc3NhZ2VMZW5ndGgiLCJtc2d0eXBlIiwibmV3TWVzc2FnZSIsImZpbmkiLCJpZCIsIndyaXRlTXNnTGVuZ3RoIiwiaXNzZW5kIiwic2VuZCIsIm5ldHdvcmsiLCJ0bXBTdHJlYW0iLCJjaGVja1N0cmVhbSIsInJlYWRlciIsImRhdGF0eXBlMmlkIiwibWFwcGluZ0RhdGFUeXBlIiwid3JpdGVyIiwiYXJnVHlwZSIsImJpbmR3cml0ZXIiLCJ3cml0ZVN0cmVhbSIsImJpbmRSZWFkZXIiLCJNZXNzYWdlIiwiYXJnc3R5cGUiLCJhcmdzIiwiaGFuZGxlciIsImFyZ3NUeXBlIiwiY3JlYXRlRnJvbVN0cmVhbSIsIm1zZ3N0cmVhbSIsImNhbGwiLCJoYW5kbGVNZXNzYWdlIiwiYXBwIiwibWVzc2FnZXMiLCJjbGllbnRtZXNzYWdlcyIsImJ1ZmZlcmVkQ3JlYXRlRW50aXR5TWVzc2FnZXMiLCJWZWN0b3IyIiwieCIsInkiLCJkaXN0YW5jZSIsInBvcyIsIk1hdGgiLCJzcXJ0IiwiYWRkIiwidmVjMyIsInN1YiIsIm11bCIsIm51bSIsImRpdiIsIm5lZyIsIlZlY3RvcjMiLCJ6IiwiVmVjdG9yNCIsInciLCJ2ZWM0IiwiY2xhbXBmIiwidmFsdWUiLCJtaW5faW5jbHVzaXZlIiwibWF4X2luY2x1c2l2ZSIsInRlbXAiLCJpbnQ4MmFuZ2xlIiwiYW5nbGUiLCJoYWxmIiwiUEkiLCJhbmdsZTJpbnQ4IiwiZmxvb3IiLCJmbG9hdCIsImZsb29yZiIsIkVudGl0eSIsImNsYXNzTmFtZSIsInBvc2l0aW9uIiwiZGlyZWN0aW9uIiwidmVsb2NpdHkiLCJjZWxsIiwiYmFzZSIsImluV29ybGQiLCJpbml0ZWQiLCJpc0NvbnRyb2xsZWQiLCJlbnRpdHlMYXN0TG9jYWxQb3MiLCJlbnRpdHlMYXN0TG9jYWxEaXIiLCJpc09uR3JvdW5kIiwiaG9sZHMiLCJyb29tS2V5YyIsIl9faW5pdF9fIiwiY2FsbFByb3BlcnR5c1NldE1ldGhvZHMiLCJjdXJyTW9kdWxlIiwibW9kdWxlZGVmcyIsInByb3BlcnR5cyIsInByb3BlcnR5ZGF0YSIsInByb3BlclV0eXBlIiwic2V0bWV0aG9kIiwiZmxhZ3MiLCJvbGR2YWwiLCJpc1BsYXllciIsIm9uRGVzdHJveSIsIm9uQ29udHJvbGxlZCIsImJJc0NvbnRyb2xsZWQiLCJlbnRpdHlfaWQiLCJiYXNlQ2FsbCIsIm1ldGhvZCIsImJhc2VfbWV0aG9kcyIsIm1ldGhvZElEIiwibmV3Q2FsbCIsImJ1bmRsZSIsImlzU2FtZVR5cGUiLCJhZGRUb1N0cmVhbSIsInNlbmRDYWxsIiwiY2VsbENhbGwiLCJjZWxsX21ldGhvZHMiLCJlbnRlcldvcmxkIiwib25FbnRlcldvcmxkIiwiY2MiLCJsb2ciLCJFdmVudFR5cGVzIiwibGVhdmVXb3JsZCIsIm9uTGVhdmVXb3JsZCIsImVudGVyU3BhY2UiLCJvbkVudGVyU3BhY2UiLCJzZXRfcG9zaXRpb24iLCJzZXRfZGlyZWN0aW9uIiwibGVhdmVTcGFjZSIsIm9uTGVhdmVTcGFjZSIsInNldF9yb29tS2V5YyIsIm9sZCIsImpvaW4iLCJzZXRfaG9sZHMiLCJlbnRpdHlTZXJ2ZXJQb3MiLCJvblVwZGF0ZVZvbGF0aWxlRGF0YSIsIkVOVElUWUNBTExfVFlQRV9DRUxMIiwiRU5USVRZQ0FMTF9UWVBFX0JBU0UiLCJFbnRpdHlDYWxsIiwidHlwZSIsIm5ldHdvcmtJbnRlcmZhY2UiLCJpc0Jhc2UiLCJpc0NlbGwiLCJCYXNlYXBwX29uUmVtb3RlQ2FsbENlbGxNZXRob2RGcm9tQ2xpZW50IiwiRW50aXR5X29uUmVtb3RlTWV0aG9kQ2FsbCIsImRhdGF0eXBlcyIsIkRBVEFUWVBFX1VJTlQ4IiwiYmluZCIsInBhcnNlRGVmYXVsdFZhbFN0ciIsInBhcnNlSW50IiwiREFUQVRZUEVfVUlOVDE2IiwiREFUQVRZUEVfVUlOVDMyIiwiREFUQVRZUEVfVUlOVDY0IiwiREFUQVRZUEVfSU5UOCIsIkRBVEFUWVBFX0lOVDE2IiwiREFUQVRZUEVfSU5UMzIiLCJEQVRBVFlQRV9JTlQ2NCIsIkRBVEFUWVBFX0ZMT0FUIiwicGFyc2VGbG9hdCIsIkRBVEFUWVBFX0RPVUJMRSIsIkRBVEFUWVBFX1NUUklORyIsIkRBVEFUWVBFX1ZFQ1RPUjIiLCJEQVRBVFlQRV9WRUNUT1IzIiwiREFUQVRZUEVfVkVDVE9SNCIsIkRBVEFUWVBFX1BZVEhPTiIsIkRBVEFUWVBFX1VOSUNPREUiLCJEQVRBVFlQRV9FTlRJVFlDQUxMIiwiY2lkIiwidXR5cGUiLCJEQVRBVFlQRV9CTE9CIiwiREFUQVRZUEVfQVJSQVkiLCJkYXRhcyIsIkRBVEFUWVBFX0ZJWEVEX0RJQ1QiLCJkaWN0dHlwZSIsImltcGxlbWVudGVkQnkiLCJLQkVuZ2luZUFyZ3MiLCJpcCIsInBvcnQiLCJ1cGRhdGVIWiIsInNlcnZlckhlYXJ0YmVhdFRpY2siLCJjbGllbnRUeXBlIiwiaXNPbkluaXRDYWxsUHJvcGVydHlzU2V0TWV0aG9kcyIsImlzV3NzIiwiY3JlYXRlQWNjb3VudCIsImxvZ2luIiwibG9nb3V0IiwicmVsb2dpbkJhc2VhcHAiLCJiaW5kQWNjb3VudEVtYWlsIiwibmV3UGFzc3dvcmQiLCJvbktpY2tlZCIsIm9uRGlzY29ubmVjdGVkIiwib25Db25uZWN0aW9uU3RhdGUiLCJvbkNvbm5lY3Rpb25TdGF0ZTIiLCJvbkNyZWF0ZUFjY291bnRSZXN1bHQiLCJvblZlcnNpb25Ob3RNYXRjaCIsIm9uU2NyaXB0VmVyc2lvbk5vdE1hdGNoIiwib25Mb2dpbkZhaWxlZCIsIm9uTG9naW5CYXNlYXBwIiwib25Mb2dpbkJhc2VhcHBGYWlsZWQiLCJvblJlbG9naW5CYXNlYXBwIiwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSIsIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWQiLCJ1cGRhdGVQb3NpdGlvbiIsImFkZFNwYWNlR2VvbWV0cnlNYXBwaW5nIiwib25TZXRTcGFjZURhdGEiLCJvbkRlbFNwYWNlRGF0YSIsIm9uTG9zZUNvbnRyb2xsZWRFbnRpdHkiLCJvblN0cmVhbURhdGFTdGFydGVkIiwib25TdHJlYW1EYXRhUmVjdiIsIm9uU3RyZWFtRGF0YUNvbXBsZXRlZCIsIktCRW5naW5lQXBwIiwia2JlbmdpbmVBcmdzIiwiYXNzZXJ0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImNsaWVudGRhdGFzIiwiZW5jcnlwdGVkS2V5IiwibG9naW5hcHBNZXNzYWdlSW1wb3J0ZWQiLCJiYXNlYXBwTWVzc2FnZUltcG9ydGVkIiwic2VydmVyRXJyb3JzRGVzY3JJbXBvcnRlZCIsImVudGl0eWRlZkltcG9ydGVkIiwiZ2V0U2luZ2xldG9uIiwiU2VydmVyRXJyIiwiZGVzY3IiLCJzZXJ2ZXJFcnJzIiwicHJvdG9jb2wiLCJiYXNlYXBwSVAiLCJiYXNlYXBwUG9ydCIsImN1cnJNc2dJRCIsImN1cnJNc2dDb3VudCIsImN1cnJNc2dMZW4iLCJGcmFnbWVudERhdGFUeXBlcyIsIkZSQUdNRU5UX0RBVEFfVU5LTk9XIiwiRlJBR01FTlRfREFUQV9NRVNTQUdFX0lEIiwiRlJBR01FTlRfREFUQV9NRVNTQUdFX0xFTkdUSCIsIkZSQUdNRU5UX0RBVEFfTUVTU0FHRV9MRU5HVEgxIiwiRlJBR01FTlRfREFUQV9NRVNTQUdFX0JPRFkiLCJmcmFnbWVudFN0cmVhbSIsImZyYWdtZW50RGF0YXNGbGFnIiwiZnJhZ21lbnREYXRhc1JlbWFpbiIsInJlc2V0U29ja2V0Iiwic29ja2V0Iiwic29jayIsIm9ub3BlbiIsIm9uZXJyb3IiLCJvbm1lc3NhZ2UiLCJvbmNsb3NlIiwiY2xvc2UiLCJyZXNldCIsImVudGl0aWVzIiwiY2xlYXJFbnRpdGllcyIsImN1cnJzZXJ2ZXIiLCJjdXJyc3RhdGUiLCJjdXJyY29ubmVjdCIsInNlcnZlcmRhdGFzIiwic2VydmVyVmVyc2lvbiIsInNlcnZlclNjcmlwdFZlcnNpb24iLCJzZXJ2ZXJQcm90b2NvbE1ENSIsInNlcnZlckVudGl0eURlZk1ENSIsImNsaWVudFZlcnNpb24iLCJjbGllbnRTY3JpcHRWZXJzaW9uIiwiZW50aXR5X3V1aWQiLCJlbnRpdHlfdHlwZSIsInVzZUFsaWFzRW50aXR5SUQiLCJlbnRpdHlJREFsaWFzSURMaXN0IiwiY29udHJvbGxlZEVudGl0aWVzIiwic3BhY2VkYXRhIiwic3BhY2VJRCIsInNwYWNlUmVzUGF0aCIsImlzTG9hZGVkR2VvbWV0cnkiLCJkYXRlT2JqZWN0IiwiRGF0ZSIsImxhc3RUaWNrVGltZSIsImdldFRpbWUiLCJsYXN0VGlja0NCVGltZSIsImNvbXBvbmVudCIsImluc3RhbGxFdmVudHMiLCJ1bmluc3RhbGxFdmVudHMiLCJoZWxsbyIsIkxvZ2luYXBwX2hlbGxvIiwiQmFzZWFwcF9oZWxsbyIsInBsYXllciIsImZpbmRFbnRpdHkiLCJlbnRpdHlJRCIsImNvbm5lY3QiLCJhZGRyIiwiV2ViU29ja2V0IiwiYmluYXJ5VHlwZSIsIm9uZXJyb3JfYmVmb3JlX29ub3BlbiIsImRpc2Nvbm5lY3QiLCJvbmVycm9yX2FmdGVyX29ub3BlbiIsIm1zZyIsIndyaXRlRnJhZ21lbnRNZXNzYWdlIiwibXNnSGFuZGxlciIsIm1zZ2xlbiIsIm1lcmdlRnJhZ21lbnRNZXNzYWdlIiwiRnJhZ21lbnREYXRhVHlwZSIsImRhdGFzaXplIiwib3BzaXplIiwidXBkYXRlIiwiTG9naW5hcHBfb25DbGllbnRBY3RpdmVUaWNrIiwiQmFzZWFwcF9vbkNsaWVudEFjdGl2ZVRpY2siLCJ1cGRhdGVQbGF5ZXJUb1NlcnZlciIsIkNsaWVudF9vbkFwcEFjdGl2ZVRpY2tDQiIsInNlcnZlckVyciIsIkNsaWVudF9vbkltcG9ydFNlcnZlckVycm9yc0Rlc2NyIiwib25PcGVuTG9naW5hcHBfbG9naW4iLCJMb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyIsIkNsaWVudF9vbkltcG9ydENsaWVudE1lc3NhZ2VzIiwib25JbXBvcnRDbGllbnRNZXNzYWdlc0NvbXBsZXRlZCIsIm9uT3BlbkxvZ2luYXBwX2NyZWF0ZUFjY291bnQiLCJMb2dpbmFwcF9pbXBvcnRTZXJ2ZXJFcnJvcnNEZXNjciIsImxvZ2luX2xvZ2luYXBwIiwicmVzZXRwYXNzd29yZF9sb2dpbmFwcCIsImNyZWF0ZUFjY291bnRfbG9naW5hcHAiLCJCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZiIsIm9uSW1wb3J0RW50aXR5RGVmQ29tcGxldGVkIiwiY3JlYXRlRGF0YVR5cGVGcm9tU3RyZWFtcyIsImNhbnByaW50IiwiYWxpYXNzaXplIiwiY3JlYXRlRGF0YVR5cGVGcm9tU3RyZWFtIiwiZGF0YXR5cGUiLCJ2YWxuYW1lIiwia2V5c2l6ZSIsImtleW5hbWUiLCJrZXl1dHlwZSIsInVpdGVtdHlwZSIsIkNsaWVudF9vbkltcG9ydENsaWVudEVudGl0eURlZiIsInNjcmlwdG1vZHVsZV9uYW1lIiwic2NyaXB0VXR5cGUiLCJwcm9wZXJ0eXNpemUiLCJtZXRob2RzaXplIiwiYmFzZV9tZXRob2RzaXplIiwiY2VsbF9tZXRob2RzaXplIiwiY3Vyck1vZHVsZURlZnMiLCJzZWxmX3Byb3BlcnR5cyIsInNlbGZfbWV0aG9kcyIsInNlbGZfYmFzZV9tZXRob2RzIiwic2VsZl9jZWxsX21ldGhvZHMiLCJwcm9wZXJGbGFncyIsImFsaWFzSUQiLCJkZWZhdWx0VmFsU3RyIiwic2F2ZWRhdGEiLCJtZXRob2RVdHlwZSIsImFyZ3NzaXplIiwiZGVmbWV0aG9kIiwiaW5mb3MiLCJtZXRob2RzIiwiQ2xpZW50X29uVmVyc2lvbk5vdE1hdGNoIiwiQ2xpZW50X29uU2NyaXB0VmVyc2lvbk5vdE1hdGNoIiwibG9naW5fYmFzZWFwcCIsImltcG9ydENsaWVudE1lc3NhZ2VzIiwibXNnaWQiLCJtc2duYW1lIiwiYXJndHlwZSIsImFyZ3NpemUiLCJhcmdzdHlwZXMiLCJpc0NsaWVudE1ldGhvZCIsImluZGV4T2YiLCJvbkltcG9ydENsaWVudE1lc3NhZ2VzIiwiZ2V0U2VydmVyQWRkciIsInNlcnZlckFkZHIiLCJub2Nvbm5lY3QiLCJMb2dpbmFwcF9yZXFDcmVhdGVBY2NvdW50IiwiZW1haWxBZGRyZXNzIiwiQmFzZWFwcF9yZXFBY2NvdW50QmluZEVtYWlsIiwib2xkX3Bhc3N3b3JkIiwibmV3X3Bhc3N3b3JkIiwiQmFzZWFwcF9yZXFBY2NvdW50TmV3UGFzc3dvcmQiLCJCYXNlYXBwX2xvZ291dEJhc2VhcHAiLCJMb2dpbmFwcF9sb2dpbiIsIm9uT3BlbkxvZ2luYXBwX3Jlc2V0cGFzc3dvcmQiLCJyZXNldF9wYXNzd29yZCIsIkxvZ2luYXBwX3JlcUFjY291bnRSZXNldFBhc3N3b3JkIiwib25PcGVuQmFzZWFwcCIsIkJhc2VhcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMiLCJiYXNlYXBwSXAiLCJCYXNlYXBwX2xvZ2luQmFzZWFwcCIsIm9uUmVPcGVuQmFzZWFwcCIsIkJhc2VhcHBfcmVsb2dpbkJhc2VhcHAiLCJDbGllbnRfb25IZWxsb0NCIiwiY3R5cGUiLCJDbGllbnRfb25Mb2dpbkZhaWxlZCIsImZhaWxlZGNvZGUiLCJDbGllbnRfb25Mb2dpblN1Y2Nlc3NmdWxseSIsImFjY291bnROYW1lIiwiQ2xpZW50X29uTG9naW5CYXNlYXBwRmFpbGVkIiwiQ2xpZW50X29uUmVsb2dpbkJhc2VhcHBGYWlsZWQiLCJDbGllbnRfb25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSIsImVudGl0eWNsYXNzIiwiZ2V0ZW50aXR5Y2xhc3MiLCJlbnRpdHlUeXBlIiwicnVuY2xhc3MiLCJDbGllbnRfb25DcmVhdGVkUHJveGllcyIsInJuZFVVSUQiLCJlaWQiLCJlbnRpdHkiLCJlbnRpdHlNZXNzYWdlIiwiQ2xpZW50X29uVXBkYXRlUHJvcGVydHlzIiwiZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbSIsIkxlbmd0aCIsIm9uVXBkYXRlUHJvcGVydHlzXyIsInN0cmVhbTEiLCJwZGF0YXMiLCJ1c2VQcm9wZXJ0eURlc2NyQWxpYXMiLCJ2YWwiLCJDbGllbnRfb25VcGRhdGVQcm9wZXJ0eXNPcHRpbWl6ZWQiLCJvblJlbW90ZU1ldGhvZENhbGxfIiwidXNlTWV0aG9kRGVzY3JBbGlhcyIsIm1ldGhvZGRhdGEiLCJhcmdzZGF0YSIsIkNsaWVudF9vblJlbW90ZU1ldGhvZENhbGxPcHRpbWl6ZWQiLCJDbGllbnRfb25SZW1vdGVNZXRob2RDYWxsIiwiQ2xpZW50X29uRW50aXR5RW50ZXJXb3JsZCIsIkNsaWVudF9vbkVudGl0eUxlYXZlV29ybGRPcHRpbWl6ZWQiLCJDbGllbnRfb25FbnRpdHlMZWF2ZVdvcmxkIiwibmV3QXJyYXkwIiwibmV3QXJyYXkiLCJjbGVhclNwYWNlIiwiQ2xpZW50X29uRW50aXR5RGVzdHJveWVkIiwiQ2xpZW50X29uRW50aXR5RW50ZXJTcGFjZSIsIkNsaWVudF9vbkVudGl0eUxlYXZlU3BhY2UiLCJDbGllbnRfb25LaWNrZWQiLCJDbGllbnRfb25DcmVhdGVBY2NvdW50UmVzdWx0IiwicmV0Y29kZSIsIkNsaWVudF9vbkNvbnRyb2xFbnRpdHkiLCJpc0NvbnQiLCJCYXNlYXBwX29uVXBkYXRlRGF0YUZyb21DbGllbnQiLCJwb3NIYXNDaGFuZ2VkIiwiZGlySGFzQ2hhbmdlZCIsIkJhc2VhcHBfb25VcGRhdGVEYXRhRnJvbUNsaWVudEZvckNvbnRyb2xsZWRFbnRpdHkiLCJyZXNwYXRoIiwiaXNBbGwiLCJDbGllbnRfaW5pdFNwYWNlRGF0YSIsImtleSIsIkNsaWVudF9zZXRTcGFjZURhdGEiLCJDbGllbnRfZGVsU3BhY2VEYXRhIiwiQ2xpZW50X2dldFNwYWNlRGF0YSIsIkNsaWVudF9vblVwZGF0ZUJhc2VQb3MiLCJDbGllbnRfb25VcGRhdGVCYXNlUG9zWFoiLCJDbGllbnRfb25VcGRhdGVEYXRhIiwiQ2xpZW50X29uU2V0RW50aXR5UG9zQW5kRGlyIiwiQ2xpZW50X29uVXBkYXRlRGF0YV95cHIiLCJwIiwiciIsIl91cGRhdGVWb2xhdGlsZURhdGEiLCJDbGllbnRfb25VcGRhdGVEYXRhX3lwIiwiQ2xpZW50X29uVXBkYXRlRGF0YV95ciIsIkNsaWVudF9vblVwZGF0ZURhdGFfcHIiLCJDbGllbnRfb25VcGRhdGVEYXRhX3kiLCJDbGllbnRfb25VcGRhdGVEYXRhX3AiLCJDbGllbnRfb25VcGRhdGVEYXRhX3IiLCJDbGllbnRfb25VcGRhdGVEYXRhX3h6IiwieHoiLCJDbGllbnRfb25VcGRhdGVEYXRhX3h6X3lwciIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHpfeXAiLCJDbGllbnRfb25VcGRhdGVEYXRhX3h6X3lyIiwiQ2xpZW50X29uVXBkYXRlRGF0YV94el9wciIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHpfeSIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHpfcCIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHpfciIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHl6IiwiQ2xpZW50X29uVXBkYXRlRGF0YV94eXpfeXByIiwieWF3IiwiQ2xpZW50X29uVXBkYXRlRGF0YV94eXpfeXAiLCJDbGllbnRfb25VcGRhdGVEYXRhX3h5el95ciIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHl6X3ByIiwiQ2xpZW50X29uVXBkYXRlRGF0YV94eXpfeSIsIkNsaWVudF9vblVwZGF0ZURhdGFfeHl6X3AiLCJDbGllbnRfb25VcGRhdGVEYXRhX3h5el9yIiwicGl0Y2giLCJyb2xsIiwiY2hhbmdlRGlyZWN0aW9uIiwicG9zaXRpb25DaGFuZ2VkIiwiQ2xpZW50X29uU3RyZWFtRGF0YVN0YXJ0ZWQiLCJDbGllbnRfb25TdHJlYW1EYXRhUmVjdiIsIkNsaWVudF9vblN0cmVhbURhdGFDb21wbGV0ZWQiLCJDbGllbnRfb25SZXFBY2NvdW50UmVzZXRQYXNzd29yZENCIiwiQ2xpZW50X29uUmVxQWNjb3VudEJpbmRFbWFpbENCIiwiQ2xpZW50X29uUmVxQWNjb3VudE5ld1Bhc3N3b3JkQ0IiLCJiUmV0IiwiaWRJbnRlcnZhbCIsInNldEludGVydmFsIiwiZGVzdHJveSIsImNsZWFySW50ZXJ2YWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FB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YUFBYSxDQUFDM29CLFFBQVEsQ0FBQ3dvQixVQUFWLENBQWI7QUFFRCxNQUFHeG9CLFFBQVEsQ0FBQytNLEdBQVQsSUFBZ0JsSCxTQUFuQixFQUNDO0FBRUQ3RixFQUFBQSxRQUFRLENBQUMrTSxHQUFULENBQWE2TyxlQUFiO0FBQ0E1YixFQUFBQSxRQUFRLENBQUMrTSxHQUFULENBQWFnTixLQUFiO0FBQ0EvWixFQUFBQSxRQUFRLENBQUMrTSxHQUFULEdBQWVsSCxTQUFmO0FBQ0EsQ0FYRDs7QUFhQSxJQUNBO0FBQ0MsTUFBRytpQixNQUFNLElBQUkvaUIsU0FBYixFQUNBO0FBQ0MraUIsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN29CLFFBQWpCO0FBQ0E7QUFDRCxDQU5ELENBT0EsT0FBTXFJLENBQU4sRUFDQSxDQUVDIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgS0JFbmdpbmUgPSBLQkVuZ2luZSB8fCB7fTtcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdCAgICBcdEphdmFTY3JpcHQgSW5oZXJpdGFuY2VcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4vKiBTaW1wbGUgSmF2YVNjcmlwdCBJbmhlcml0YW5jZSBmb3IgRVMgNS4xXHJcbiAqIGJhc2VkIG9uIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9zaW1wbGUtamF2YXNjcmlwdC1pbmhlcml0YW5jZS9cclxuICogIChpbnNwaXJlZCBieSBiYXNlMiBhbmQgUHJvdG90eXBlKVxyXG4gKiBNSVQgTGljZW5zZWQuXHJcbiAqL1xyXG5cclxuLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcclxuS0JFbmdpbmUuQ2xhc3MgPSBmdW5jdGlvbigpe307XHJcbi8vIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xyXG5LQkVuZ2luZS5DbGFzcy5leHRlbmQgPSBmdW5jdGlvbihwcm9wcykge1xyXG5cdHZhciBfc3VwZXIgPSB0aGlzLnByb3RvdHlwZTtcclxuICAgIHZhciBmblRlc3QgPSAveHl6Ly50ZXN0KGZ1bmN0aW9uKCl7eHl6O30pID8gL1xcYl9zdXBlclxcYi8gOiAvLiovO1xyXG5cdC8vIFNldCB1cCB0aGUgcHJvdG90eXBlIHRvIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBjbGFzc1xyXG5cdC8vIChidXQgd2l0aG91dCBydW5uaW5nIHRoZSBjdG9yIGNvbnN0cnVjdG9yKVxyXG5cdHZhciBwcm90byA9IE9iamVjdC5jcmVhdGUoX3N1cGVyKTtcclxuXHJcblx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcclxuXHRmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XHJcblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBvdmVyd3JpdGluZyBhbiBleGlzdGluZyBmdW5jdGlvblxyXG5cdFx0cHJvdG9bbmFtZV0gPSB0eXBlb2YgcHJvcHNbbmFtZV0gPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcHNbbmFtZV0pXHJcblx0XHRcdD8gKGZ1bmN0aW9uKG5hbWUsIGZuKXtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgdG1wID0gdGhpcy5fc3VwZXI7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2RcclxuXHRcdFx0XHRcdC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcclxuXHRcdFx0XHRcdHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZSBtZXRob2Qgb25seSBuZWVkIHRvIGJlIGJvdW5kIHRlbXBvcmFyaWx5LCBzbyB3ZVxyXG5cdFx0XHRcdFx0Ly8gcmVtb3ZlIGl0IHdoZW4gd2UncmUgZG9uZSBleGVjdXRpbmdcclxuXHRcdFx0XHRcdHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdFx0dGhpcy5fc3VwZXIgPSB0bXA7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KShuYW1lLCBwcm9wc1tuYW1lXSlcclxuXHRcdFx0OiBwcm9wc1tuYW1lXTtcclxuXHR9XHJcblxyXG5cdC8vIFRoZSBuZXcgY29uc3RydWN0b3JcclxuXHR2YXIgbmV3Q2xhc3MgPSB0eXBlb2YgcHJvdG8uY3RvciA9PT0gXCJmdW5jdGlvblwiXHJcblx0XHQ/IHByb3RvLmhhc093blByb3BlcnR5KFwiY3RvclwiKVxyXG5cdFx0XHQ/IHByb3RvLmN0b3IgLy8gQWxsIGNvbnN0cnVjdGlvbiBpcyBhY3R1YWxseSBkb25lIGluIHRoZSBjdG9yIG1ldGhvZFxyXG5cdFx0XHQ6IGZ1bmN0aW9uIFN1YkNsYXNzKCl7IF9zdXBlci5jdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cclxuXHRcdDogZnVuY3Rpb24gRW1wdHlDbGFzcygpe307XHJcblxyXG5cdC8vIFBvcHVsYXRlIG91ciBjb25zdHJ1Y3RlZCBwcm90b3R5cGUgb2JqZWN0XHJcblx0bmV3Q2xhc3MucHJvdG90eXBlID0gcHJvdG87XHJcblxyXG5cdC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XHJcblx0cHJvdG8uY29uc3RydWN0b3IgPSBuZXdDbGFzcztcclxuXHJcblx0Ly8gQW5kIG1ha2UgdGhpcyBjbGFzcyBleHRlbmRhYmxlXHJcblx0bmV3Q2xhc3MuZXh0ZW5kID0gS0JFbmdpbmUuQ2xhc3MuZXh0ZW5kO1xyXG5cclxuXHRyZXR1cm4gbmV3Q2xhc3M7XHJcbn07XHJcblxyXG4vKlxyXG5cdOWmguaenEFycmF5QnVmZmVy5rKh5pyJdHJhbnNmZXIoKeeahOaWueazlSwg5YiZ5Li6QXJyYXlCdWZmZXLmt7vliqB0cmFuc2Zlcigp5pa55rOVXHJcblx06K+l5pa55rOV5Zue5LiA5Liq5paw55qEQXJyYXlCdWZmZXLvvIwg5YW25YaF5a655Y+W6Ieqb2xkQnVmZmVy55qE5pWw5o2u77yM5bm25LiU5qC55o2uIG5ld0J5dGVMZW5ndGgg55qE5aSn5bCP5p2l5a+55pWw5o2u6L+b6KGM5oiq5Y+WXHJcblx05Y+C6ICDOmh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5QnVmZmVyL3RyYW5zZmVyXHJcbiAqL1xyXG5pZighQXJyYXlCdWZmZXIudHJhbnNmZXIpIHtcclxuICAgIEFycmF5QnVmZmVyLnRyYW5zZmVyID0gZnVuY3Rpb24gKHNvdXJjZSwgbGVuZ3RoKSB7XHJcbiAgICAgICAgc291cmNlID0gT2JqZWN0KHNvdXJjZSk7XHJcblx0XHR2YXIgZGVzdCA9IG5ldyBBcnJheUJ1ZmZlcihsZW5ndGgpO1xyXG5cdFx0XHJcbiAgICAgICAgaWYoIShzb3VyY2UgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgIShkZXN0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheUJ1ZmZlci50cmFuc2ZlciwgZXJyb3I6IFNvdXJjZSBhbmQgZGVzdGluYXRpb24gbXVzdCBiZSBBcnJheUJ1ZmZlciBpbnN0YW5jZXNcIik7XHJcblx0XHR9XHJcblx0XHRcclxuICAgICAgICBpZihkZXN0LmJ5dGVMZW5ndGggPj0gc291cmNlLmJ5dGVMZW5ndGgpIHtcclxuXHRcdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGRlc3QpO1xyXG5cdFx0XHRidWYuc2V0KG5ldyBVaW50OEFycmF5KHNvdXJjZSksIDApO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiQXJyYXlCdWZmZXIudHJhbnNmZXIsIGVycm9yOiBkZXN0aW5hdGlvbiBoYXMgbm90IGVub3VnaCBzcGFjZVwiKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRlc3Q7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLy8gZXhwb3J0XHJcbndpbmRvdy5DbGFzcyA9IEtCRW5naW5lLkNsYXNzO1xyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRnbG9iYWxcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5QQUNLRVRfTUFYX1NJWkVcdFx0ID0gMTUwMDtcclxuS0JFbmdpbmUuUEFDS0VUX01BWF9TSVpFX1RDUFx0ID0gMTQ2MDtcclxuS0JFbmdpbmUuUEFDS0VUX01BWF9TSVpFX1VEUFx0ID0gMTQ3MjtcclxuXHJcbktCRW5naW5lLk1FU1NBR0VfSURfTEVOR1RIXHRcdCA9IDI7XHJcbktCRW5naW5lLk1FU1NBR0VfTEVOR1RIX0xFTkdUSFx0ID0gMjtcclxuS0JFbmdpbmUuTUVTU0FHRV9MRU5HVEgxX0xFTkdUSCAgPSA0O1xyXG5LQkVuZ2luZS5NRVNTQUdFX01BWF9TSVpFXHRcdCA9IDY1NTM1O1xyXG5cclxuS0JFbmdpbmUuQ0xJRU5UX05PX0ZMT0FUXHRcdCA9IDA7XHJcbktCRW5naW5lLktCRV9GTFRfTUFYXHRcdFx0ID0gMy40MDI4MjM0NjZlKzM4O1xyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRudW1iZXI2NGJpdHNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5JTlQ2NCA9IGZ1bmN0aW9uKGxvLCBoaSlcclxue1xyXG5cdHRoaXMubG8gPSBsbztcclxuXHR0aGlzLmhpID0gaGk7XHJcblx0XHJcblx0dGhpcy5zaWduID0gMTtcclxuXHRcclxuXHRpZihoaSA+PSAyMTQ3NDgzNjQ4KVxyXG5cdHtcclxuXHRcdHRoaXMuc2lnbiA9IC0xO1xyXG5cdFx0aWYodGhpcy5sbyA+IDApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMubG8gPSAoNDI5NDk2NzI5NiAtIHRoaXMubG8pICYgMHhmZmZmZmZmZjtcclxuXHRcdFx0dGhpcy5oaSA9IDQyOTQ5NjcyOTUgLSB0aGlzLmhpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmxvID0gKDQyOTQ5NjcyOTYgLSB0aGlzLmxvKSAmIDB4ZmZmZmZmZmY7XHJcblx0XHRcdHRoaXMuaGkgPSA0Mjk0OTY3Mjk2IC0gdGhpcy5oaTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5zaWduIDwgMClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0ICs9IFwiLVwiXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBsb3cgPSB0aGlzLmxvLnRvU3RyaW5nKDE2KTtcclxuXHRcdHZhciBoaWdoID0gdGhpcy5oaS50b1N0cmluZygxNik7XHJcblx0XHRcclxuXHRcdGlmKHRoaXMuaGkgPiAwKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQgKz0gaGlnaDtcclxuXHRcdFx0Zm9yKHZhciBpID0gOCAtIGxvdy5sZW5ndGg7IGkgPiAwOyAtLWkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXN1bHQgKz0gXCIwXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJlc3VsdCArPSBsb3c7XHJcblx0XHRcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLlVJTlQ2NCA9IGZ1bmN0aW9uKGxvLCBoaSlcclxue1xyXG5cdHRoaXMubG8gPSBsbztcclxuXHR0aGlzLmhpID0gaGk7XHJcblx0XHJcblx0dGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgbG93ID0gdGhpcy5sby50b1N0cmluZygxNik7XHJcblx0XHR2YXIgaGlnaCA9IHRoaXMuaGkudG9TdHJpbmcoMTYpO1xyXG5cdFx0XHJcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcclxuXHRcdGlmKHRoaXMuaGkgPiAwKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQgKz0gaGlnaDtcclxuXHRcdFx0Zm9yKHZhciBpID0gOCAtIGxvdy5sZW5ndGg7IGkgPiAwOyAtLWkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXN1bHQgKz0gXCIwXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJlc3VsdCArPSBsb3c7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWJ1Z1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbktCRW5naW5lLklORk9fTVNHID0gZnVuY3Rpb24ocylcclxue1xyXG5cdGNvbnNvbGUuaW5mbyhzKTtcclxufVxyXG5cclxuS0JFbmdpbmUuREVCVUdfTVNHID0gZnVuY3Rpb24ocylcclxue1xyXG5cdGNvbnNvbGUuZGVidWcocyk7XHJcbn1cclxuXHJcbktCRW5naW5lLkVSUk9SX01TRyA9IGZ1bmN0aW9uKHMpXHJcbntcclxuXHRjb25zb2xlLmVycm9yKHMpO1xyXG59XHJcblxyXG5LQkVuZ2luZS5XQVJOSU5HX01TRyA9IGZ1bmN0aW9uKHMpXHJcbntcclxuXHRjb25zb2xlLndhcm4ocyk7XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5nXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuS0JFbmdpbmUudXRmOEFycmF5VG9TdHJpbmcgPSBmdW5jdGlvbihhcnJheSlcclxue1xyXG4gICAgdmFyIG91dCwgaSwgbGVuLCBjO1xyXG4gICAgdmFyIGNoYXIyLCBjaGFyMztcclxuXHJcbiAgICBvdXQgPSBcIlwiO1xyXG4gICAgbGVuID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgaSA9IDA7XHJcblxyXG4gICAgd2hpbGUoaSA8IGxlbilcclxuICAgIHtcclxuICAgICAgICBjID0gYXJyYXlbaSsrXTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGMgPj4gNClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiBjYXNlIDI6IGNhc2UgMzogY2FzZSA0OiBjYXNlIDU6IGNhc2UgNjogY2FzZSA3OlxyXG4gICAgICAgICAgICAvLyAweHh4eHh4eFxyXG4gICAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6IGNhc2UgMTM6XHJcbiAgICAgICAgICAgIC8vIDExMHggeHh4eCAgIDEweHggeHh4eFxyXG4gICAgICAgICAgICBjaGFyMiA9IGFycmF5W2krK107XHJcbiAgICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MUYpIDw8IDYpIHwgKGNoYXIyICYgMHgzRikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNDpcclxuICAgICAgICAgICAgICAgIC8vIDExMTAgeHh4eCAgMTB4eCB4eHh4ICAxMHh4IHh4eHhcclxuICAgICAgICAgICAgICAgIGNoYXIyID0gYXJyYXlbaSsrXTtcclxuICAgICAgICAgICAgICAgIGNoYXIzID0gYXJyYXlbaSsrXTtcclxuICAgICAgICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MEYpIDw8IDEyKSB8XHJcbiAgICAgICAgICAgICAgICAgICAgKChjaGFyMiAmIDB4M0YpIDw8IDYpIHxcclxuICAgICAgICAgICAgICAgICAgICAoKGNoYXIzICYgMHgzRikgPDwgMCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcblxyXG5LQkVuZ2luZS5zdHJpbmdUb1VURjhCeXRlcyA9IGZ1bmN0aW9uKHN0cikgXHJcbntcclxuICAgIHZhciB1dGY4ID0gW107XHJcbiAgICBmb3IgKHZhciBpPTA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoY2hhcmNvZGUgPCAweDgwKSB1dGY4LnB1c2goY2hhcmNvZGUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGNoYXJjb2RlIDwgMHg4MDApIHtcclxuICAgICAgICAgICAgdXRmOC5wdXNoKDB4YzAgfCAoY2hhcmNvZGUgPj4gNiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgMHg4MCB8IChjaGFyY29kZSAmIDB4M2YpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2hhcmNvZGUgPCAweGQ4MDAgfHwgY2hhcmNvZGUgPj0gMHhlMDAwKSB7XHJcbiAgICAgICAgICAgIHV0ZjgucHVzaCgweGUwIHwgKGNoYXJjb2RlID4+IDEyKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAweDgwIHwgKChjaGFyY29kZT4+NikgJiAweDNmKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAweDgwIHwgKGNoYXJjb2RlICYgMHgzZikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdXJyb2dhdGUgcGFpclxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIC8vIFVURi0xNiBlbmNvZGVzIDB4MTAwMDAtMHgxMEZGRkYgYnlcclxuICAgICAgICAgICAgLy8gc3VidHJhY3RpbmcgMHgxMDAwMCBhbmQgc3BsaXR0aW5nIHRoZVxyXG4gICAgICAgICAgICAvLyAyMCBiaXRzIG9mIDB4MC0weEZGRkZGIGludG8gdHdvIGhhbHZlc1xyXG4gICAgICAgICAgICBjaGFyY29kZSA9IDB4MTAwMDAgKyAoKChjaGFyY29kZSAmIDB4M2ZmKTw8MTApXHJcbiAgICAgICAgICAgICAgICAgICAgICB8IChzdHIuY2hhckNvZGVBdChpKSAmIDB4M2ZmKSlcclxuICAgICAgICAgICAgdXRmOC5wdXNoKDB4ZjAgfCAoY2hhcmNvZGUgPj4xOCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgMHg4MCB8ICgoY2hhcmNvZGU+PjEyKSAmIDB4M2YpLCBcclxuICAgICAgICAgICAgICAgICAgICAgIDB4ODAgfCAoKGNoYXJjb2RlPj42KSAmIDB4M2YpLCBcclxuICAgICAgICAgICAgICAgICAgICAgIDB4ODAgfCAoY2hhcmNvZGUgJiAweDNmKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHV0Zjg7XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnRcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5FdmVudEluZm8gPSBmdW5jdGlvbihjbGFzc2luc3QsIGNhbGxiYWNrZm4pXHJcbntcclxuXHR0aGlzLmNhbGxiYWNrZm4gPSBjYWxsYmFja2ZuO1xyXG5cdHRoaXMuY2xhc3NpbnN0ID0gY2xhc3NpbnN0O1xyXG59XHJcblxyXG5LQkVuZ2luZS5GaXJlZEV2ZW50ID0gZnVuY3Rpb24oZXZ0TmFtZSwgZXZ0SW5mbywgYXJzKVxyXG57XHJcblx0dGhpcy5ldnROYW1lID0gZXZ0TmFtZTtcclxuXHR0aGlzLmV2dEluZm8gPSBldnRJbmZvO1xyXG5cdHRoaXMuYXJzID0gYXJzO1xyXG59XHJcblxyXG5LQkVuZ2luZS5FdmVudCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuX2V2ZW50cyA9IHt9O1xyXG5cdHRoaXMuX2lzUGF1c2UgPSBmYWxzZTtcclxuXHR0aGlzLl9maXJlZEV2ZW50cyA9IFtdO1xyXG5cdFxyXG5cdHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbihldnROYW1lLCBjbGFzc2luc3QsIHN0ckNhbGxiYWNrKVxyXG5cdHtcclxuXHRcdHZhciBjYWxsYmFja2ZuID0gY2xhc3NpbnN0W3N0ckNhbGxiYWNrXTtcclxuXHRcdGlmKGNhbGxiYWNrZm4gPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coJ0tCRW5naW5lLkV2ZW50OjpmaXJlOiBub3QgZm91bmQgc3RyQ2FsbGJhY2soJyArIGNsYXNzaW5zdCAgKyBcIikhXCIrc3RyQ2FsbGJhY2spOyAgXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZXZ0bHN0ID0gdGhpcy5fZXZlbnRzW2V2dE5hbWVdO1xyXG5cdFx0aWYoZXZ0bHN0ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0ZXZ0bHN0ID0gW107XHJcblx0XHRcdHRoaXMuX2V2ZW50c1tldnROYW1lXSA9IGV2dGxzdDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIGluZm8gPSBuZXcgS0JFbmdpbmUuRXZlbnRJbmZvKGNsYXNzaW5zdCwgY2FsbGJhY2tmbik7XHJcblx0XHRldnRsc3QucHVzaChpbmZvKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuZGVyZWdpc3RlckFsbCA9IGZ1bmN0aW9uKGNsYXNzaW5zdClcclxuXHR7XHJcblx0XHRmb3IodmFyIGl0ZW1rZXkgaW4gdGhpcy5fZXZlbnRzKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmRlcmVnaXN0ZXIoaXRlbWtleSwgY2xhc3NpbnN0KTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy5kZXJlZ2lzdGVyID0gZnVuY3Rpb24oZXZ0TmFtZSwgY2xhc3NpbnN0KVxyXG5cdHtcclxuXHRcdHZhciBldnRsc3QgPSB0aGlzLl9ldmVudHNbZXZ0TmFtZV07XHJcblxyXG5cdFx0aWYoZXZ0bHN0ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlKHRydWUpXHJcblx0XHR7XHJcblx0XHRcdHZhciBmb3VuZCA9IGZhbHNlO1xyXG5cdFx0XHRmb3IodmFyIGk9MDsgaTxldnRsc3QubGVuZ3RoOyBpKyspXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgaW5mbyA9IGV2dGxzdFtpXTtcclxuXHRcdFx0XHRpZihpbmZvLmNsYXNzaW5zdCA9PSBjbGFzc2luc3QpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXZ0bHN0LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdGZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoIWZvdW5kKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVtb3ZlRmlyZWRFdmVudChldnROYW1lLCBjbGFzc2luc3QpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5yZW1vdmVBbGxGaXJlZEV2ZW50ID0gZnVuY3Rpb24oY2xhc3NpbnN0KVxyXG5cdHtcclxuXHRcdHRoaXMucmVtb3ZlRmlyZWRFdmVudChcIlwiLCBjbGFzc2luc3QpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5yZW1vdmVGaXJlZEV2ZW50ID0gZnVuY3Rpb24oZXZ0TmFtZSwgY2xhc3NpbnN0KVxyXG5cdHtcclxuXHRcdHZhciBmaXJlZEV2ZW50cyA9IHRoaXMuX2ZpcmVkRXZlbnRzO1xyXG5cdFx0d2hpbGUodHJ1ZSlcclxuXHRcdHtcclxuXHRcdFx0dmFyIGZvdW5kID0gZmFsc2U7XHJcblx0XHRcdGZvcih2YXIgaT0wOyBpPGZpcmVkRXZlbnRzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIGV2dCA9IGZpcmVkRXZlbnRzW2ldO1xyXG5cdFx0XHRcdGlmKChldnROYW1lID09IFwiXCIgfHwgZXZ0LmV2dE5hbWUgPT0gZXZ0TmFtZSkgJiYgZXZ0LmV2dEluZm8uY2xhc3NpbnN0ID09IGNsYXNzaW5zdClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaXJlZEV2ZW50cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRmb3VuZCA9IHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCFmb3VuZClcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy5maXJlID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKVxyXG5cdFx0e1xyXG5cdFx0XHQvL0tCRW5naW5lLkVSUk9SX01TRygnS0JFbmdpbmUuRXZlbnQ6OmZpcmU6IG5vdCBmb3VuZCBldmVudE5hbWUhJyk7ICBcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBldnROYW1lID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0dmFyIGV2dGxzdCA9IHRoaXMuX2V2ZW50c1tldnROYW1lXTtcclxuXHRcdFxyXG5cdFx0aWYoZXZ0bHN0ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuO1x0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgYXJzID0gW107XHJcblx0XHRmb3IodmFyIGk9MTsgaTxhcmd1bWVudHMubGVuZ3RoOyBpKyspIFxyXG5cdFx0XHRhcnMucHVzaChhcmd1bWVudHNbaV0pO1xyXG5cdFx0XHJcblx0XHRmb3IodmFyIGk9MDsgaTxldnRsc3QubGVuZ3RoOyBpKyspXHJcblx0XHR7XHJcblx0XHRcdHZhciBpbmZvID0gZXZ0bHN0W2ldO1xyXG5cclxuXHRcdFx0aWYoIXRoaXMuX2lzUGF1c2UpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZihhcnMubGVuZ3RoIDwgMSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpbmZvLmNhbGxiYWNrZm4uYXBwbHkoaW5mby5jbGFzc2luc3QpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aW5mby5jYWxsYmFja2ZuLmFwcGx5KGluZm8uY2xhc3NpbnN0LCBhcnMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgZW9iaiA9IG5ldyBLQkVuZ2luZS5GaXJlZEV2ZW50KGV2dE5hbWUsIGluZm8sIGFycyk7XHJcblx0XHRcdFx0dGhpcy5fZmlyZWRFdmVudHMucHVzaChlb2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCkgXHJcblx0e1xyXG5cdFx0dGhpcy5faXNQYXVzZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHR0aGlzLnJlc3VtZSA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLl9pc1BhdXNlID0gZmFsc2U7XHJcblxyXG5cdFx0dmFyIGZpcmVkRXZlbnRzID0gdGhpcy5fZmlyZWRFdmVudHM7XHJcblx0XHR3aGlsZShmaXJlZEV2ZW50cy5sZW5ndGggPiAwKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgZXZ0ID0gZmlyZWRFdmVudHMuc2hpZnQoKTtcclxuXHRcdFx0dmFyIGluZm8gPSBldnQuZXZ0SW5mbztcclxuXHRcdFx0dmFyIGFycyA9IGV2dC5hcnM7XHJcblxyXG5cdFx0XHRpZihhcnMubGVuZ3RoIDwgMSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGluZm8uY2FsbGJhY2tmbi5hcHBseShpbmZvLmNsYXNzaW5zdCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aW5mby5jYWxsYmFja2ZuLmFwcGx5KGluZm8uY2xhc3NpbnN0LCBhcnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5FdmVudCA9IG5ldyBLQkVuZ2luZS5FdmVudCgpO1xyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtZW1vcnlzdHJlYW1cclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5NZW1vcnlTdHJlYW0gPSBmdW5jdGlvbihzaXplX29yX2J1ZmZlcilcclxue1xyXG5cdGlmKHNpemVfb3JfYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5idWZmZXIgPSBzaXplX29yX2J1ZmZlcjtcclxuXHR9XHJcblx0ZWxzZVxyXG5cdHtcclxuXHRcdHRoaXMuYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHNpemVfb3JfYnVmZmVyKTtcclxuXHR9XHJcblxyXG5cdHRoaXMucnBvcyA9IDA7XHJcblx0dGhpcy53cG9zID0gMDtcclxuXHRcclxuXHQvKlxyXG5cdFx0dW5pb24gUGFja0Zsb2F0WFR5cGVcclxuXHRcdHtcclxuXHRcdFx0ZmxvYXRcdGZ2O1xyXG5cdFx0XHR1aW50MzJcdHV2O1xyXG5cdFx0XHRpbnRcdFx0aXY7XHJcblx0XHR9O1x0XHJcblx0Ki9cclxuXHRLQkVuZ2luZS5NZW1vcnlTdHJlYW0uUGFja0Zsb2F0WFR5cGUgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy5fdW5pb25EYXRhID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG5cdFx0dGhpcy5mdiA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fdW5pb25EYXRhLCAwLCAxKTtcclxuXHRcdHRoaXMudXYgPSBuZXcgVWludDMyQXJyYXkodGhpcy5fdW5pb25EYXRhLCAwLCAxKTtcclxuXHRcdHRoaXMuaXYgPSBuZXcgSW50MzJBcnJheSh0aGlzLl91bmlvbkRhdGEsIDAsIDEpO1xyXG5cdH07XHJcblx0XHRcdFxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dGhpcy5yZWFkSW50OCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgYnVmID0gbmV3IEludDhBcnJheSh0aGlzLmJ1ZmZlciwgdGhpcy5ycG9zLCAxKTtcclxuXHRcdHRoaXMucnBvcyArPSAxO1xyXG5cdFx0cmV0dXJuIGJ1ZlswXTtcclxuXHR9XHJcblxyXG5cdHRoaXMucmVhZEludDE2ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciB2ID0gdGhpcy5yZWFkVWludDE2KCk7XHJcblx0XHRpZih2ID49IDMyNzY4KVxyXG5cdFx0XHR2IC09IDY1NTM2O1xyXG5cdFx0cmV0dXJuIHY7XHJcblx0fVxyXG5cdFx0XHJcblx0dGhpcy5yZWFkSW50MzIgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dmFyIHYgPSB0aGlzLnJlYWRVaW50MzIoKTtcclxuXHRcdGlmKHYgPj0gMjE0NzQ4MzY0OClcclxuXHRcdFx0diAtPSA0Mjk0OTY3Mjk2O1xyXG5cdFx0cmV0dXJuIHY7XHJcblx0fVxyXG5cclxuXHR0aGlzLnJlYWRJbnQ2NCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgbG8gPSB0aGlzLnJlYWRJbnQzMigpO1xyXG5cdFx0dmFyIGhpID0gdGhpcy5yZWFkSW50MzIoKTtcclxuXHRcdHJldHVybiBuZXcgS0JFbmdpbmUuSU5UNjQobG8sIGhpKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5yZWFkVWludDggPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLCB0aGlzLnJwb3MsIDEpO1xyXG5cdFx0dGhpcy5ycG9zICs9IDE7XHJcblx0XHRyZXR1cm4gYnVmWzBdO1xyXG5cdH1cclxuXHJcblx0dGhpcy5yZWFkVWludDE2ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlciwgdGhpcy5ycG9zKTtcclxuXHRcdHRoaXMucnBvcyArPSAyO1xyXG5cdFx0cmV0dXJuICgoYnVmWzFdICYgMHhmZikgPDwgOCkgKyAoYnVmWzBdICYgMHhmZik7XHJcblx0fVxyXG5cdFx0XHJcblx0dGhpcy5yZWFkVWludDMyID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlciwgdGhpcy5ycG9zKTtcclxuXHRcdHRoaXMucnBvcyArPSA0O1xyXG5cdFx0cmV0dXJuIChidWZbM10gPDwgMjQpICsgKGJ1ZlsyXSA8PCAxNikgKyAoYnVmWzFdIDw8IDgpICsgYnVmWzBdO1xyXG5cdH1cclxuXHJcblx0dGhpcy5yZWFkVWludDY0ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBsbyA9IHRoaXMucmVhZFVpbnQzMigpO1xyXG5cdFx0dmFyIGhpID0gdGhpcy5yZWFkVWludDMyKCk7XHJcblx0XHRyZXR1cm4gbmV3IEtCRW5naW5lLlVJTlQ2NChsbywgaGkpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnJlYWRGbG9hdCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR0cnlcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJ1ZiA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5idWZmZXIsIHRoaXMucnBvcywgMSk7XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmJ1ZmZlci5zbGljZSh0aGlzLnJwb3MsIHRoaXMucnBvcyArIDQpKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5ycG9zICs9IDQ7XHJcblx0XHRyZXR1cm4gYnVmWzBdO1xyXG5cdH1cclxuXHJcblx0dGhpcy5yZWFkRG91YmxlID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHRyeVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVmID0gbmV3IEZsb2F0NjRBcnJheSh0aGlzLmJ1ZmZlciwgdGhpcy5ycG9zLCAxKTtcclxuXHRcdH1cclxuXHRcdGNhdGNoKGUpXHJcblx0XHR7XHJcblx0XHRcdHZhciBidWYgPSBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuYnVmZmVyLnNsaWNlKHRoaXMucnBvcywgdGhpcy5ycG9zICsgOCksIDAsIDEpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLnJwb3MgKz0gODtcclxuXHRcdHJldHVybiBidWZbMF07XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucmVhZFN0cmluZyA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsIHRoaXMucnBvcyk7XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgcyA9IFwiXCI7XHJcblx0XHRcclxuXHRcdHdoaWxlKHRydWUpXHJcblx0XHR7XHJcblx0XHRcdGlmKGJ1ZltpXSAhPSAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aSsrO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpKys7XHJcblx0XHRcdFxyXG5cdFx0XHRpZih0aGlzLnJwb3MgKyBpID49IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGgpXHJcblx0XHRcdFx0dGhyb3cobmV3IEVycm9yKFwiS0JFbmdpbmUuTWVtb3J5U3RyZWFtOjpyZWFkU3RyaW5nOiBycG9zKFwiICsgKHRoaXMucnBvcyArIGkpICsgXCIpPj1cIiArIFxyXG5cdFx0XHRcdFx0dGhpcy5idWZmZXIuYnl0ZUxlbmd0aCArIFwiIG92ZXJmbG93IVwiKSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMucnBvcyArPSBpO1xyXG5cdFx0cmV0dXJuIHM7XHJcblx0fVxyXG5cclxuXHR0aGlzLnJlYWRCbG9iID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBzaXplID0gdGhpcy5yZWFkVWludDMyKCk7XHJcblx0XHR2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsIHRoaXMucnBvcywgc2l6ZSk7XHJcblx0XHR0aGlzLnJwb3MgKz0gc2l6ZTtcclxuXHRcdHJldHVybiBidWY7XHJcblx0fVxyXG5cclxuXHR0aGlzLnJlYWRTdHJlYW0gPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLCB0aGlzLnJwb3MsIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggLSB0aGlzLnJwb3MpO1xyXG5cdFx0dGhpcy5ycG9zID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuXHRcdHJldHVybiBuZXcgS0JFbmdpbmUuTWVtb3J5U3RyZWFtKGJ1Zik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucmVhZFBhY2tYWiA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgeFBhY2tEYXRhID0gbmV3IEtCRW5naW5lLk1lbW9yeVN0cmVhbS5QYWNrRmxvYXRYVHlwZSgpO1xyXG5cdFx0dmFyIHpQYWNrRGF0YSA9IG5ldyBLQkVuZ2luZS5NZW1vcnlTdHJlYW0uUGFja0Zsb2F0WFR5cGUoKTtcclxuXHRcdFxyXG5cdFx0eFBhY2tEYXRhLmZ2WzBdID0gMC4wO1xyXG5cdFx0elBhY2tEYXRhLmZ2WzBdID0gMC4wO1xyXG5cclxuXHRcdHhQYWNrRGF0YS51dlswXSA9IDB4NDAwMDAwMDA7XHJcblx0XHR6UGFja0RhdGEudXZbMF0gPSAweDQwMDAwMDAwO1xyXG5cdFx0XHRcclxuXHRcdHZhciB2MSA9IHRoaXMucmVhZFVpbnQ4KCk7XHJcblx0XHR2YXIgdjIgPSB0aGlzLnJlYWRVaW50OCgpO1xyXG5cdFx0dmFyIHYzID0gdGhpcy5yZWFkVWludDgoKTtcclxuXHJcblx0XHR2YXIgZGF0YSA9IDA7XHJcblx0XHRkYXRhIHw9ICh2MSA8PCAxNik7XHJcblx0XHRkYXRhIHw9ICh2MiA8PCA4KTtcclxuXHRcdGRhdGEgfD0gdjM7XHJcblxyXG5cdFx0eFBhY2tEYXRhLnV2WzBdIHw9IChkYXRhICYgMHg3ZmYwMDApIDw8IDM7XHJcblx0XHR6UGFja0RhdGEudXZbMF0gfD0gKGRhdGEgJiAweDAwMDdmZikgPDwgMTU7XHJcblxyXG5cdFx0eFBhY2tEYXRhLmZ2WzBdIC09IDIuMDtcclxuXHRcdHpQYWNrRGF0YS5mdlswXSAtPSAyLjA7XHJcblx0XHJcblx0XHR4UGFja0RhdGEudXZbMF0gfD0gKGRhdGEgJiAweDgwMDAwMCkgPDwgODtcclxuXHRcdHpQYWNrRGF0YS51dlswXSB8PSAoZGF0YSAmIDB4MDAwODAwKSA8PCAyMDtcclxuXHRcdFx0XHJcblx0XHR2YXIgZGF0YSA9IG5ldyBBcnJheSgyKTtcclxuXHRcdGRhdGFbMF0gPSB4UGFja0RhdGEuZnZbMF07XHJcblx0XHRkYXRhWzFdID0gelBhY2tEYXRhLmZ2WzBdO1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHR0aGlzLnJlYWRQYWNrWSA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgdiA9IHRoaXMucmVhZFVpbnQxNigpO1xyXG5cdFx0cmV0dXJuIHY7XHJcblx0fVxyXG5cdFxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dGhpcy53cml0ZUludDggPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHZhciBidWYgPSBuZXcgSW50OEFycmF5KHRoaXMuYnVmZmVyLCB0aGlzLndwb3MsIDEpO1xyXG5cdFx0YnVmWzBdID0gdjtcclxuXHRcdHRoaXMud3BvcyArPSAxO1xyXG5cdH1cclxuXHJcblx0dGhpcy53cml0ZUludDE2ID0gZnVuY3Rpb24odilcclxuXHR7XHRcclxuXHRcdHRoaXMud3JpdGVJbnQ4KHYgJiAweGZmKTtcclxuXHRcdHRoaXMud3JpdGVJbnQ4KHYgPj4gOCAmIDB4ZmYpO1xyXG5cdH1cclxuXHRcdFxyXG5cdHRoaXMud3JpdGVJbnQzMiA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBpPTA7IGk8NDsgaSsrKVxyXG5cdFx0XHR0aGlzLndyaXRlSW50OCh2ID4+IGkgKiA4ICYgMHhmZik7XHJcblx0fVxyXG5cclxuXHR0aGlzLndyaXRlSW50NjQgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRoaXMud3JpdGVJbnQzMih2LmxvKTtcclxuXHRcdHRoaXMud3JpdGVJbnQzMih2LmhpKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy53cml0ZVVpbnQ4ID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsIHRoaXMud3BvcywgMSk7XHJcblx0XHRidWZbMF0gPSB2O1xyXG5cdFx0dGhpcy53cG9zICs9IDE7XHJcblx0fVxyXG5cclxuXHR0aGlzLndyaXRlVWludDE2ID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR0aGlzLndyaXRlVWludDgodiAmIDB4ZmYpO1xyXG5cdFx0dGhpcy53cml0ZVVpbnQ4KHYgPj4gOCAmIDB4ZmYpO1xyXG5cdH1cclxuXHRcdFxyXG5cdHRoaXMud3JpdGVVaW50MzIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGZvcih2YXIgaT0wOyBpPDQ7IGkrKylcclxuXHRcdFx0dGhpcy53cml0ZVVpbnQ4KHYgPj4gaSAqIDggJiAweGZmKTtcclxuXHR9XHJcblxyXG5cdHRoaXMud3JpdGVVaW50NjQgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRoaXMud3JpdGVVaW50MzIodi5sbyk7XHJcblx0XHR0aGlzLndyaXRlVWludDMyKHYuaGkpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLndyaXRlRmxvYXQgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRyeVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmJ1ZmZlciwgdGhpcy53cG9zLCAxKTtcclxuXHRcdFx0YnVmWzBdID0gdjtcclxuXHRcdH1cclxuXHRcdGNhdGNoKGUpXHJcblx0XHR7XHJcblx0XHRcdHZhciBidWYgPSBuZXcgRmxvYXQzMkFycmF5KDEpO1xyXG5cdFx0XHRidWZbMF0gPSB2O1xyXG5cdFx0XHR2YXIgYnVmMSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKTtcclxuXHRcdFx0dmFyIGJ1ZjIgPSBuZXcgVWludDhBcnJheShidWYuYnVmZmVyKTtcclxuXHRcdFx0YnVmMS5zZXQoYnVmMiwgdGhpcy53cG9zKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy53cG9zICs9IDQ7XHJcblx0fVxyXG5cclxuXHR0aGlzLndyaXRlRG91YmxlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR0cnlcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJ1ZiA9IG5ldyBGbG9hdDY0QXJyYXkodGhpcy5idWZmZXIsIHRoaXMud3BvcywgMSk7XHJcblx0XHRcdGJ1ZlswXSA9IHY7XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVmID0gbmV3IEZsb2F0NjRBcnJheSgxKTtcclxuXHRcdFx0YnVmWzBdID0gdjtcclxuXHRcdFx0dmFyIGJ1ZjEgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcik7XHJcblx0XHRcdHZhciBidWYyID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ1ZmZlcik7XHJcblx0XHRcdGJ1ZjEuc2V0KGJ1ZjIsIHRoaXMud3Bvcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53cG9zICs9IDg7XHJcblx0fVxyXG5cclxuXHR0aGlzLndyaXRlQmxvYiA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dmFyIHNpemUgPSB2Lmxlbmd0aDtcclxuXHRcdGlmKHNpemUgKyA0PiB0aGlzLnNwYWNlKCkpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIm1lbW9yeXN0cmVhbTo6d3JpdGVCbG9iOiBubyBmcmVlIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLndyaXRlVWludDMyKHNpemUpO1xyXG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLCB0aGlzLndwb3MsIHNpemUpO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YodikgPT0gXCJzdHJpbmdcIilcclxuXHRcdHtcclxuXHRcdFx0Zm9yKHZhciBpPTA7IGk8c2l6ZTsgaSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnVmW2ldID0gdi5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdGZvcih2YXIgaT0wOyBpPHNpemU7IGkrKylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJ1ZltpXSA9IHZbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy53cG9zICs9IHNpemU7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMud3JpdGVTdHJpbmcgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHYubGVuZ3RoID4gdGhpcy5zcGFjZSgpKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJtZW1vcnlzdHJlYW06OndyaXRlU3RyaW5nOiBubyBmcmVlIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsIHRoaXMud3Bvcyk7XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHRmb3IodmFyIGlkeD0wOyBpZHg8di5sZW5ndGg7IGlkeCsrKVxyXG5cdFx0e1xyXG5cdFx0XHRidWZbaSsrXSA9IHYuY2hhckNvZGVBdChpZHgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRidWZbaSsrXSA9IDA7XHJcblx0XHR0aGlzLndwb3MgKz0gaTtcclxuXHR9XHJcblxyXG5cdHRoaXMuYXBwZW5kID0gZnVuY3Rpb24oc3RyZWFtLCBvZmZzZXQsIHNpemUpXHJcblx0e1xyXG5cdFx0aWYoIShzdHJlYW0gaW5zdGFuY2VvZiBLQkVuZ2luZS5NZW1vcnlTdHJlYW0pKSBcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiTWVtb3J5U3RyZWFtOjphcHBlbmQoKTogc3RyZWFtIG11c3QgYmUgTWVtb3J5U3RyZWFtIGluc3RhbmNlc1wiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHNpemUgPiB0aGlzLnNwYWNlKCkpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuYnVmZmVyID0gQXJyYXlCdWZmZXIudHJhbnNmZXIodGhpcy5idWZmZXIsIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggKyBzaXplICogMik7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLCB0aGlzLndwb3MsIHNpemUpO1xyXG5cdFx0YnVmLnNldChuZXcgVWludDhBcnJheShzdHJlYW0uYnVmZmVyLCBvZmZzZXQsIHNpemUpLCAwKTtcclxuXHRcdHRoaXMud3BvcyArPSBzaXplO1xyXG5cdH1cclxuXHRcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMucmVhZFNraXAgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRoaXMucnBvcyArPSB2O1xyXG5cdH1cclxuXHRcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMuc3BhY2UgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggLSB0aGlzLndwb3M7XHJcblx0fVxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMubGVuZ3RoID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLndwb3MgLSB0aGlzLnJwb3M7XHJcblx0fVxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMucmVhZEVPRiA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCAtIHRoaXMucnBvcyA8PSAwO1xyXG5cdH1cclxuXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR0aGlzLmRvbmUgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy5ycG9zID0gdGhpcy53cG9zO1xyXG5cdH1cclxuXHRcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMuZ2V0YnVmZmVyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy5ycG9zLCB0aGlzLndwb3MpO1xyXG5cdH1cclxuXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR0aGlzLnNpemUgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcblx0fVxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy5ycG9zID0gMDtcclxuXHRcdHRoaXMud3BvcyA9IDA7XHJcblxyXG5cdFx0aWYodGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA+IEtCRW5naW5lLlBBQ0tFVF9NQVhfU0laRSlcclxuXHRcdFx0dGhpcy5idWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoS0JFbmdpbmUuUEFDS0VUX01BWF9TSVpFKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnVuZGxlXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuS0JFbmdpbmUuQnVuZGxlID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5tZW1vcnlzdHJlYW1zID0gbmV3IEFycmF5KCk7XHJcblx0dGhpcy5zdHJlYW0gPSBuZXcgS0JFbmdpbmUuTWVtb3J5U3RyZWFtKEtCRW5naW5lLlBBQ0tFVF9NQVhfU0laRV9UQ1ApO1xyXG5cdFxyXG5cdHRoaXMubnVtTWVzc2FnZSA9IDA7XHJcblx0dGhpcy5tZXNzYWdlTGVuZ3RoQnVmZmVyID0gbnVsbDtcclxuXHR0aGlzLm1lc3NhZ2VMZW5ndGggPSAwO1xyXG5cdHRoaXMubXNndHlwZSA9IG51bGw7XHJcblx0XHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR0aGlzLm5ld01lc3NhZ2UgPSBmdW5jdGlvbihtc2d0eXBlKVxyXG5cdHtcclxuXHRcdHRoaXMuZmluaShmYWxzZSk7XHJcblx0XHRcclxuXHRcdHRoaXMubXNndHlwZSA9IG1zZ3R5cGU7XHJcblx0XHR0aGlzLm51bU1lc3NhZ2UgKz0gMTtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5tc2d0eXBlLmxlbmd0aCA9PSAtMSlcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5tZXNzYWdlTGVuZ3RoQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5zdHJlYW0uYnVmZmVyLCB0aGlzLnN0cmVhbS53cG9zICsgS0JFbmdpbmUuTUVTU0FHRV9JRF9MRU5HVEgsIDIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLndyaXRlVWludDE2KG1zZ3R5cGUuaWQpO1xyXG5cdFx0XHJcblx0XHRpZih0aGlzLm1lc3NhZ2VMZW5ndGhCdWZmZXIpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMud3JpdGVVaW50MTYoMCk7XHJcblx0XHRcdHRoaXMubWVzc2FnZUxlbmd0aEJ1ZmZlclswXSA9IDA7XHJcblx0XHRcdHRoaXMubWVzc2FnZUxlbmd0aEJ1ZmZlclsxXSA9IDA7XHJcblx0XHRcdHRoaXMubWVzc2FnZUxlbmd0aCA9IDA7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMud3JpdGVNc2dMZW5ndGggPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHRoaXMubWVzc2FnZUxlbmd0aEJ1ZmZlcilcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5tZXNzYWdlTGVuZ3RoQnVmZmVyWzBdID0gdiAmIDB4ZmY7XHJcblx0XHRcdHRoaXMubWVzc2FnZUxlbmd0aEJ1ZmZlclsxXSA9IHYgPj4gOCAmIDB4ZmY7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dGhpcy5maW5pID0gZnVuY3Rpb24oaXNzZW5kKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMubnVtTWVzc2FnZSA+IDApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMud3JpdGVNc2dMZW5ndGgodGhpcy5tZXNzYWdlTGVuZ3RoKTtcclxuXHRcdFx0aWYodGhpcy5zdHJlYW0pXHJcblx0XHRcdFx0dGhpcy5tZW1vcnlzdHJlYW1zLnB1c2godGhpcy5zdHJlYW0pO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihpc3NlbmQpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMubWVzc2FnZUxlbmd0aEJ1ZmZlciA9IG51bGw7XHJcblx0XHRcdHRoaXMubnVtTWVzc2FnZSA9IDA7XHJcblx0XHRcdHRoaXMubXNndHlwZSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dGhpcy5zZW5kID0gZnVuY3Rpb24obmV0d29yaylcclxuXHR7XHJcblx0XHR0aGlzLmZpbmkodHJ1ZSk7XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaT0wOyBpPHRoaXMubWVtb3J5c3RyZWFtcy5sZW5ndGg7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0dmFyIHRtcFN0cmVhbSA9IHRoaXMubWVtb3J5c3RyZWFtc1tpXTtcclxuXHRcdFx0bmV0d29yay5zZW5kKHRtcFN0cmVhbS5nZXRidWZmZXIoKSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMubWVtb3J5c3RyZWFtcyA9IG5ldyBBcnJheSgpO1xyXG5cdFx0dGhpcy5zdHJlYW0gPSBuZXcgS0JFbmdpbmUuTWVtb3J5U3RyZWFtKEtCRW5naW5lLlBBQ0tFVF9NQVhfU0laRV9UQ1ApO1xyXG5cdH1cclxuXHRcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHRoaXMuY2hlY2tTdHJlYW0gPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHYgPiB0aGlzLnN0cmVhbS5zcGFjZSgpKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLm1lbW9yeXN0cmVhbXMucHVzaCh0aGlzLnN0cmVhbSk7XHJcblx0XHRcdHRoaXMuc3RyZWFtID0gbmV3IEtCRW5naW5lLk1lbW9yeVN0cmVhbShLQkVuZ2luZS5QQUNLRVRfTUFYX1NJWkVfVENQKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1lc3NhZ2VMZW5ndGggKz0gdjtcclxuXHR9XHJcblx0XHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR0aGlzLndyaXRlSW50OCA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSgxKTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlSW50OCh2KTtcclxuXHR9XHJcblxyXG5cdHRoaXMud3JpdGVJbnQxNiA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSgyKTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlSW50MTYodik7XHJcblx0fVxyXG5cdFx0XHJcblx0dGhpcy53cml0ZUludDMyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR0aGlzLmNoZWNrU3RyZWFtKDQpO1xyXG5cdFx0dGhpcy5zdHJlYW0ud3JpdGVJbnQzMih2KTtcclxuXHR9XHJcblxyXG5cdHRoaXMud3JpdGVJbnQ2NCA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSg4KTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlSW50NjQodik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMud3JpdGVVaW50OCA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSgxKTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlVWludDgodik7XHJcblx0fVxyXG5cclxuXHR0aGlzLndyaXRlVWludDE2ID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR0aGlzLmNoZWNrU3RyZWFtKDIpO1xyXG5cdFx0dGhpcy5zdHJlYW0ud3JpdGVVaW50MTYodik7XHJcblx0fVxyXG5cdFx0XHJcblx0dGhpcy53cml0ZVVpbnQzMiA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSg0KTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlVWludDMyKHYpO1xyXG5cdH1cclxuXHJcblx0dGhpcy53cml0ZVVpbnQ2NCA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSg4KTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlVWludDY0KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLndyaXRlRmxvYXQgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRoaXMuY2hlY2tTdHJlYW0oNCk7XHJcblx0XHR0aGlzLnN0cmVhbS53cml0ZUZsb2F0KHYpO1xyXG5cdH1cclxuXHJcblx0dGhpcy53cml0ZURvdWJsZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0dGhpcy5jaGVja1N0cmVhbSg4KTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlRG91YmxlKHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLndyaXRlU3RyaW5nID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHR0aGlzLmNoZWNrU3RyZWFtKHYubGVuZ3RoICsgMSk7XHJcblx0XHR0aGlzLnN0cmVhbS53cml0ZVN0cmluZyh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy53cml0ZUJsb2IgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHRoaXMuY2hlY2tTdHJlYW0odi5sZW5ndGggKyA0KTtcclxuXHRcdHRoaXMuc3RyZWFtLndyaXRlQmxvYih2KTtcclxuXHR9XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZXNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5yZWFkZXIgPSBuZXcgS0JFbmdpbmUuTWVtb3J5U3RyZWFtKDApO1xyXG5LQkVuZ2luZS5kYXRhdHlwZTJpZCA9IHt9O1xyXG5cclxuS0JFbmdpbmUubWFwcGluZ0RhdGFUeXBlID0gZnVuY3Rpb24od3JpdGVyLCBhcmdUeXBlKVxyXG57XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWQgPSB7fTtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlNUUklOR1wiXSA9IDE7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJTVEQ6OlNUUklOR1wiXSA9IDE7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVUlOVDhcIl0gPSAyO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiQk9PTFwiXSA9IDI7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJEQVRBVFlQRVwiXSA9IDI7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJDSEFSXCJdID0gMjtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkRFVEFJTF9UWVBFXCJdID0gMjtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkVOVElUWUNBTExfQ0FMTF9UWVBFXCJdID0gMjtcclxuXHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UMTZcIl0gPSAzO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVU5TSUdORUQgU0hPUlRcIl0gPSAzO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiU0VSVkVSX0VSUk9SX0NPREVcIl0gPSAzO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRU5USVRZX1RZUEVcIl0gPSAzO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRU5USVRZX1BST1BFUlRZX1VJRFwiXSA9IDM7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJFTlRJVFlfTUVUSE9EX1VJRFwiXSA9IDM7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJFTlRJVFlfU0NSSVBUX1VJRFwiXSA9IDM7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJEQVRBVFlQRV9VSURcIl0gPSAzO1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlVJTlQzMlwiXSA9IDQ7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UXCJdID0gNDtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlVOU0lHTkVEIElOVFwiXSA9IDQ7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJBUlJBWVNJWkVcIl0gPSA0O1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiU1BBQ0VfSURcIl0gPSA0O1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiR0FNRV9USU1FXCJdID0gNDtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlRJTUVSX0lEXCJdID0gNDtcclxuXHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UNjRcIl0gPSA1O1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiREJJRFwiXSA9IDU7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJDT01QT05FTlRfSURcIl0gPSA1O1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIklOVDhcIl0gPSA2O1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiQ09NUE9ORU5UX09SREVSXCJdID0gNjtcclxuXHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJJTlQxNlwiXSA9IDc7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJTSE9SVFwiXSA9IDc7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiSU5UMzJcIl0gPSA4O1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiSU5UXCJdID0gODtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkVOVElUWV9JRFwiXSA9IDg7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJDQUxMQkFDS19JRFwiXSA9IDg7XHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJDT01QT05FTlRfVFlQRVwiXSA9IDg7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiSU5UNjRcIl0gPSA5O1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlBZVEhPTlwiXSA9IDEwO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiUFlfRElDVFwiXSA9IDEwO1xyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiUFlfVFVQTEVcIl0gPSAxMDtcclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlBZX0xJU1RcIl0gPSAxMDtcclxuXHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJCTE9CXCJdID0gMTE7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVU5JQ09ERVwiXSA9IDEyO1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkZMT0FUXCJdID0gMTM7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRE9VQkxFXCJdID0gMTQ7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVkVDVE9SMlwiXSA9IDE1O1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlZFQ1RPUjNcIl0gPSAxNjtcclxuXHJcblx0S0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJWRUNUT1I0XCJdID0gMTc7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRklYRURfRElDVFwiXSA9IDE4O1xyXG5cclxuXHRLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkFSUkFZXCJdID0gMTk7XHJcblxyXG5cdEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRU5USVRZQ0FMTFwiXSA9IDIwO1xyXG59XHJcblxyXG5LQkVuZ2luZS5tYXBwaW5nRGF0YVR5cGUoKTtcclxuXHJcbktCRW5naW5lLmJpbmR3cml0ZXIgPSBmdW5jdGlvbih3cml0ZXIsIGFyZ1R5cGUpXHJcbntcclxuXHRpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVUlOVDhcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIHdyaXRlci53cml0ZVVpbnQ4O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UMTZcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIHdyaXRlci53cml0ZVVpbnQxNjtcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVUlOVDMyXCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiB3cml0ZXIud3JpdGVVaW50MzI7XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlVJTlQ2NFwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlVWludDY0O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJJTlQ4XCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiB3cml0ZXIud3JpdGVJbnQ4O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJJTlQxNlwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlSW50MTY7XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIklOVDMyXCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiB3cml0ZXIud3JpdGVJbnQzMjtcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiSU5UNjRcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIHdyaXRlci53cml0ZUludDY0O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJGTE9BVFwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlRmxvYXQ7XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkRPVUJMRVwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlRG91YmxlO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJTVFJJTkdcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIHdyaXRlci53cml0ZVN0cmluZztcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiRklYRURfRElDVFwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlU3RyZWFtO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJBUlJBWVwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gd3JpdGVyLndyaXRlU3RyZWFtO1xyXG5cdH1cclxuXHRlbHNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHdyaXRlci53cml0ZVN0cmVhbTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLmJpbmRSZWFkZXIgPSBmdW5jdGlvbihhcmdUeXBlKVxyXG57XHJcblx0aWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlVJTlQ4XCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFVpbnQ4O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UMTZcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkVWludDE2O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UMzJcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkVWludDMyO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJVSU5UNjRcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkVWludDY0O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJJTlQ4XCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZEludDg7XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIklOVDE2XCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZEludDE2O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJJTlQzMlwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRJbnQzMjtcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiSU5UNjRcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkSW50NjQ7XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkZMT0FUXCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZEZsb2F0O1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJET1VCTEVcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkRG91YmxlO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJTVFJJTkdcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkU3RyaW5nO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJQWVRIT05cIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkU3RyZWFtO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJWRUNUT1IyXCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFN0cmVhbTtcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVkVDVE9SM1wiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRTdHJlYW07XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIlZFQ1RPUjRcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkU3RyZWFtO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJCTE9CXCJdKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFN0cmVhbTtcclxuXHR9XHJcblx0ZWxzZSBpZihhcmdUeXBlID09IEtCRW5naW5lLmRhdGF0eXBlMmlkW1wiVU5JQ09ERVwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRTdHJlYW07XHJcblx0fVxyXG5cdGVsc2UgaWYoYXJnVHlwZSA9PSBLQkVuZ2luZS5kYXRhdHlwZTJpZFtcIkZJWEVEX0RJQ1RcIl0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkU3RyZWFtO1xyXG5cdH1cclxuXHRlbHNlIGlmKGFyZ1R5cGUgPT0gS0JFbmdpbmUuZGF0YXR5cGUyaWRbXCJBUlJBWVwiXSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRTdHJlYW07XHJcblx0fVxyXG5cdGVsc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRTdHJlYW07XHJcblx0fVxyXG59XHJcblx0XHJcbktCRW5naW5lLk1lc3NhZ2UgPSBmdW5jdGlvbihpZCwgbmFtZSwgbGVuZ3RoLCBhcmdzdHlwZSwgYXJncywgaGFuZGxlcilcclxue1xyXG5cdHRoaXMuaWQgPSBpZDtcclxuXHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG5cdHRoaXMuYXJnc1R5cGUgPSBhcmdzdHlwZTtcclxuXHRcclxuXHQvLyDnu5HlrprmiafooYxcclxuXHRmb3IodmFyIGk9MDsgaTxhcmdzLmxlbmd0aDsgaSsrKVxyXG5cdHtcclxuXHRcdGFyZ3NbaV0gPSBLQkVuZ2luZS5iaW5kUmVhZGVyKGFyZ3NbaV0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFyZ3MgPSBhcmdzO1xyXG5cdHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24obXNnc3RyZWFtKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuYXJncy5sZW5ndGggPD0gMClcclxuXHRcdFx0cmV0dXJuIG1zZ3N0cmVhbTtcclxuXHRcdFxyXG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmFyZ3MubGVuZ3RoKTtcclxuXHRcdGZvcih2YXIgaT0wOyBpPHRoaXMuYXJncy5sZW5ndGg7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0W2ldID0gdGhpcy5hcmdzW2ldLmNhbGwobXNnc3RyZWFtKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5oYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24obXNnc3RyZWFtKVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuaGFuZGxlciA9PSBudWxsKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZS5NZXNzYWdlOjpoYW5kbGVNZXNzYWdlOiBpbnRlcmZhY2UoXCIgKyB0aGlzLm5hbWUgKyBcIi9cIiArIHRoaXMuaWQgKyBcIikgbm8gaW1wbGVtZW50IVwiKTsgIFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5hcmdzLmxlbmd0aCA8PSAwKVxyXG5cdFx0e1xyXG5cdFx0XHRpZih0aGlzLmFyZ3NUeXBlIDwgMClcclxuXHRcdFx0XHR0aGlzLmhhbmRsZXIobXNnc3RyZWFtKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMuaGFuZGxlcigpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmhhbmRsZXIuYXBwbHkoS0JFbmdpbmUuYXBwLCB0aGlzLmNyZWF0ZUZyb21TdHJlYW0obXNnc3RyZWFtKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vLyDkuIrooYzmtojmga9cclxuS0JFbmdpbmUubWVzc2FnZXMgPSB7fTtcclxuS0JFbmdpbmUubWVzc2FnZXNbXCJsb2dpbmFwcFwiXSA9IHt9O1xyXG5LQkVuZ2luZS5tZXNzYWdlc1tcImJhc2VhcHBcIl0gPSB7fTtcclxuS0JFbmdpbmUuY2xpZW50bWVzc2FnZXMgPSB7fTtcclxuXHJcbktCRW5naW5lLm1lc3NhZ2VzW1wiTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXNcIl0gPSBuZXcgS0JFbmdpbmUuTWVzc2FnZSg1LCBcImltcG9ydENsaWVudE1lc3NhZ2VzXCIsIDAsIDAsIG5ldyBBcnJheSgpLCBudWxsKTtcclxuS0JFbmdpbmUubWVzc2FnZXNbXCJCYXNlYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzXCJdID0gbmV3IEtCRW5naW5lLk1lc3NhZ2UoMjA3LCBcImltcG9ydENsaWVudE1lc3NhZ2VzXCIsIDAsIDAsIG5ldyBBcnJheSgpLCBudWxsKTtcclxuS0JFbmdpbmUubWVzc2FnZXNbXCJCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZlwiXSA9IG5ldyBLQkVuZ2luZS5NZXNzYWdlKDIwOCwgXCJpbXBvcnRDbGllbnRFbnRpdHlEZWZcIiwgMCwgMCwgbmV3IEFycmF5KCksIG51bGwpO1xyXG5LQkVuZ2luZS5tZXNzYWdlc1tcIm9uSW1wb3J0Q2xpZW50TWVzc2FnZXNcIl0gPSBuZXcgS0JFbmdpbmUuTWVzc2FnZSg1MTgsIFwib25JbXBvcnRDbGllbnRNZXNzYWdlc1wiLCAtMSwgLTEsIG5ldyBBcnJheSgpLCBudWxsKTtcclxuXHJcbktCRW5naW5lLmJ1ZmZlcmVkQ3JlYXRlRW50aXR5TWVzc2FnZXMgPSB7fTtcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF0aFxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbktCRW5naW5lLlZlY3RvcjIgPSBLQkVuZ2luZS5DbGFzcy5leHRlbmQoXHJcbntcclxuXHRcdGN0b3I6ZnVuY3Rpb24gKHgsIHkpIHtcclxuXHRcdFx0dGhpcy54ID0geDtcclxuXHRcdFx0dGhpcy55ID0geTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cdFxyXG5cdFx0ZGlzdGFuY2UgOiBmdW5jdGlvbihwb3MpXHJcblx0XHR7XHJcblx0XHRcdHZhciB4ID0gcG9zLnggLSB0aGlzLng7XHJcblx0XHRcdHZhciB5ID0gcG9zLnkgLSB0aGlzLnk7XHJcblx0XHRcdHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGFkZCA6IGZ1bmN0aW9uKHZlYzMpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMueCArPSB2ZWMzLng7XHJcblx0XHRcdHRoaXMueSArPSB2ZWMzLnk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzdWI6IGZ1bmN0aW9uKHZlYzMpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMueCAtPSB2ZWMzLng7XHJcblx0XHRcdHRoaXMueSAtPSB2ZWMzLnk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRtdWw6IGZ1bmN0aW9uKG51bSlcclxuXHRcdHtcclxuXHRcdFx0dGhpcy54ICo9IG51bTtcclxuXHRcdFx0dGhpcy55ICo9IG51bTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRpdjogZnVuY3Rpb24obnVtKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnggLz0gbnVtO1xyXG5cdFx0XHR0aGlzLnkgLz0gbnVtO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0bmVnOiBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMueCA9IC10aGlzLng7XHJcblx0XHRcdHRoaXMueSA9IC10aGlzLnk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG59KTtcclxuXHJcbktCRW5naW5lLlZlY3RvcjMgPSBLQkVuZ2luZS5DbGFzcy5leHRlbmQoXHJcbntcclxuICAgIGN0b3I6ZnVuY3Rpb24gKHgsIHksIHopIHtcclxuXHRcdHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdFx0dGhpcy56ID0gejtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgZGlzdGFuY2UgOiBmdW5jdGlvbihwb3MpXHJcbiAgICB7XHJcbiAgICBcdHZhciB4ID0gcG9zLnggLSB0aGlzLng7XHJcbiAgICBcdHZhciB5ID0gcG9zLnkgLSB0aGlzLnk7XHJcbiAgICBcdHZhciB6ID0gcG9zLnogLSB0aGlzLno7XHJcbiAgICBcdHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcclxuXHR9LFxyXG5cdFxyXG5cdC8v5ZCR6YeP5Yqg5rOVXHJcblx0YWRkIDogZnVuY3Rpb24odmVjMylcclxuXHR7XHJcblx0XHR0aGlzLnggKz0gdmVjMy54O1xyXG5cdFx0dGhpcy55ICs9IHZlYzMueTtcclxuXHRcdHRoaXMueiArPSB2ZWMzLno7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvL+WQkemHj+WHj+azlVxyXG5cdHN1YjogZnVuY3Rpb24odmVjMylcclxuXHR7XHJcblx0XHR0aGlzLnggLT0gdmVjMy54O1xyXG5cdFx0dGhpcy55IC09IHZlYzMueTtcclxuXHRcdHRoaXMueiAtPSB2ZWMzLno7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvL+WQkemHj+S5mOazlVxyXG5cdG11bDogZnVuY3Rpb24obnVtKVxyXG5cdHtcclxuXHRcdHRoaXMueCAqPSBudW07XHJcblx0XHR0aGlzLnkgKj0gbnVtO1xyXG5cdFx0dGhpcy56ICo9IG51bTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8v5ZCR6YeP6Zmk5rOVXHJcblx0ZGl2OiBmdW5jdGlvbihudW0pXHJcblx0e1xyXG5cdFx0dGhpcy54IC89IG51bTtcclxuXHRcdHRoaXMueSAvPSBudW07XHJcblx0XHR0aGlzLnogLz0gbnVtO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8g5ZCR6YeP5Y+W5Y+NXHJcblx0bmVnOiBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy54ID0gLXRoaXMueDtcclxuXHRcdHRoaXMueSA9IC10aGlzLnk7XHJcblx0XHR0aGlzLnogPSAtdGhpcy56O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59KTtcclxuXHJcbktCRW5naW5lLlZlY3RvcjQgPSBLQkVuZ2luZS5DbGFzcy5leHRlbmQoXHJcbntcclxuXHRjdG9yOmZ1bmN0aW9uICh4LCB5LCB6LCB3KSB7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHRcdHRoaXMueiA9IHo7XHJcblx0XHR0aGlzLncgPSB3O1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblx0ZGlzdGFuY2UgOiBmdW5jdGlvbihwb3MpXHJcblx0e1xyXG5cdFx0dmFyIHggPSBwb3MueCAtIHRoaXMueDtcclxuXHRcdHZhciB5ID0gcG9zLnkgLSB0aGlzLnk7XHJcblx0XHR2YXIgeiA9IHBvcy56IC0gdGhpcy56O1xyXG5cdFx0dmFyIHcgPSBwb3MudyAtIHRoaXMudztcclxuXHRcdHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcgKTtcclxuXHR9LFxyXG5cclxuXHRhZGQgOiBmdW5jdGlvbih2ZWM0KVxyXG5cdHtcclxuXHRcdHRoaXMueCArPSB2ZWM0Lng7XHJcblx0XHR0aGlzLnkgKz0gdmVjNC55O1xyXG5cdFx0dGhpcy56ICs9IHZlYzQuejtcclxuXHRcdHRoaXMudyArPSB2ZWM0Lnc7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzdWI6IGZ1bmN0aW9uKHZlYzQpXHJcblx0e1xyXG5cdFx0dGhpcy54IC09IHZlYzQueDtcclxuXHRcdHRoaXMueSAtPSB2ZWM0Lnk7XHJcblx0XHR0aGlzLnogLT0gdmVjNC56O1xyXG5cdFx0dGhpcy53IC09IHZlYzQudztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG11bDogZnVuY3Rpb24obnVtKVxyXG5cdHtcclxuXHRcdHRoaXMueCAqPSBudW07XHJcblx0XHR0aGlzLnkgKj0gbnVtO1xyXG5cdFx0dGhpcy56ICo9IG51bTtcclxuXHRcdHRoaXMudyAqPSBudW07XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkaXY6IGZ1bmN0aW9uKG51bSlcclxuXHR7XHJcblx0XHR0aGlzLnggLz0gbnVtO1xyXG5cdFx0dGhpcy55IC89IG51bTtcclxuXHRcdHRoaXMueiAvPSBudW07XHJcblx0XHR0aGlzLncgLz0gbnVtO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0bmVnOiBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0dGhpcy54ID0gLXRoaXMueDtcclxuXHRcdHRoaXMueSA9IC10aGlzLnk7XHJcblx0XHR0aGlzLnogPSAtdGhpcy56O1xyXG5cdFx0dGhpcy53ID0gLXRoaXMudztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxyXG5LQkVuZ2luZS5jbGFtcGYgPSBmdW5jdGlvbiAodmFsdWUsIG1pbl9pbmNsdXNpdmUsIG1heF9pbmNsdXNpdmUpIFxyXG57XHJcbiAgICBpZiAobWluX2luY2x1c2l2ZSA+IG1heF9pbmNsdXNpdmUpIHtcclxuICAgICAgICB2YXIgdGVtcCA9IG1pbl9pbmNsdXNpdmU7XHJcbiAgICAgICAgbWluX2luY2x1c2l2ZSA9IG1heF9pbmNsdXNpdmU7XHJcbiAgICAgICAgbWF4X2luY2x1c2l2ZSA9IHRlbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUgPCBtaW5faW5jbHVzaXZlID8gbWluX2luY2x1c2l2ZSA6IHZhbHVlIDwgbWF4X2luY2x1c2l2ZSA/IHZhbHVlIDogbWF4X2luY2x1c2l2ZTtcclxufTtcclxuXHJcbktCRW5naW5lLmludDgyYW5nbGUgPSBmdW5jdGlvbihhbmdsZS8qaW50OCovLCBoYWxmLypib29sKi8pXHJcbntcclxuXHRyZXR1cm4gYW5nbGUgKiAoTWF0aC5QSSAvIChoYWxmID8gMjU0LjAgOiAxMjguMCkpO1xyXG59O1xyXG5cclxuS0JFbmdpbmUuYW5nbGUyaW50OCA9IGZ1bmN0aW9uKHYvKmZsb2F0Ki8sIGhhbGYvKmJvb2wqLylcclxue1xyXG5cdHZhciBhbmdsZSA9IDA7XHJcblx0aWYoIWhhbGYpXHJcblx0e1xyXG5cdFx0YW5nbGUgPSBNYXRoLmZsb29yKCh2ICogMTI4LjApIC8gZmxvYXQoTWF0aC5QSSkgKyAwLjUpO1xyXG5cdH1cclxuXHRlbHNlXHJcblx0e1xyXG5cdFx0YW5nbGUgPSBLQkVuZ2luZS5jbGFtcGYoZmxvb3JmKCAodiAqIDI1NC4wKSAvIGZsb2F0KE1hdGguUEkpICsgMC41KSwgLTEyOC4wLCAxMjcuMCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYW5nbGU7XHJcbn07XHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVudGl0eVxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbktCRW5naW5lLkVudGl0eSA9IEtCRW5naW5lLkNsYXNzLmV4dGVuZChcclxue1xyXG4gICAgY3RvcjpmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLmlkID0gMDtcclxuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJcIjtcclxuXHRcdHRoaXMucG9zaXRpb24gPSBuZXcgS0JFbmdpbmUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcclxuXHRcdHRoaXMuZGlyZWN0aW9uID0gbmV3IEtCRW5naW5lLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XHJcblx0XHR0aGlzLnZlbG9jaXR5ID0gMC4wXHJcblx0XHRcdFxyXG5cdFx0dGhpcy5jZWxsID0gbnVsbDtcclxuXHRcdHRoaXMuYmFzZSA9IG51bGw7XHJcblx0XHRcclxuXHRcdC8vIGVudGVyd29ybGTkuYvlkI7orr7nva7kuLp0cnVlXHJcblx0XHR0aGlzLmluV29ybGQgPSBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Ly8gX19pbml0X1/osIPnlKjkuYvlkI7orr7nva7kuLp0cnVlXHJcblx0XHR0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHQvLyDmmK/lkKbooqvmjqfliLZcclxuXHRcdHRoaXMuaXNDb250cm9sbGVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5lbnRpdHlMYXN0TG9jYWxQb3MgPSBuZXcgS0JFbmdpbmUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKTtcclxuXHRcdHRoaXMuZW50aXR5TGFzdExvY2FsRGlyID0gbmV3IEtCRW5naW5lLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XHJcblx0XHRcclxuXHRcdC8vIOeOqeWutuaYr+WQpuWcqOWcsOmdouS4ilxyXG5cdFx0dGhpcy5pc09uR3JvdW5kID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5ob2xkcz1bXVxyXG5cdFx0dGhpcy5yb29tS2V5Yz1bXVxyXG5cdFx0XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy8g5LiO5pyN5Yqh56uv5a6e5L2T6ISa5pys5LitX19pbml0X1/nsbvkvLwsIOS7o+ihqOWIneWni+WMluWunuS9k1xyXG5cdF9faW5pdF9fIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9LFxyXG5cclxuXHRjYWxsUHJvcGVydHlzU2V0TWV0aG9kcyA6IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgY3Vyck1vZHVsZSA9IEtCRW5naW5lLm1vZHVsZWRlZnNbdGhpcy5jbGFzc05hbWVdO1xyXG5cdFx0Zm9yKHZhciBuYW1lIGluIGN1cnJNb2R1bGUucHJvcGVydHlzKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgcHJvcGVydHlkYXRhID0gY3Vyck1vZHVsZS5wcm9wZXJ0eXNbbmFtZV07XHJcblx0XHRcdHZhciBwcm9wZXJVdHlwZSA9IHByb3BlcnR5ZGF0YVswXTtcclxuXHRcdFx0dmFyIG5hbWUgPSBwcm9wZXJ0eWRhdGFbMl07XHJcblx0XHRcdHZhciBzZXRtZXRob2QgPSBwcm9wZXJ0eWRhdGFbNV07XHJcblx0XHRcdHZhciBmbGFncyA9IHByb3BlcnR5ZGF0YVs2XTtcclxuXHRcdFx0dmFyIG9sZHZhbCA9IHRoaXNbbmFtZV07XHJcblx0XHRcdFxyXG5cdFx0XHRpZihzZXRtZXRob2QgIT0gbnVsbClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8vIGJhc2XnsbvlsZ7mgKfmiJbogIXov5vlhaXkuJbnlYzlkI5jZWxs57G75bGe5oCn5Lya6Kem5Y+Rc2V0Xyrmlrnms5VcclxuXHRcdFx0XHQvLyBFRF9GTEFHX0JBU0VfQU5EX0NMSUVOVOOAgUVEX0ZMQUdfQkFTRVxyXG5cdFx0XHRcdGlmKGZsYWdzID09IDB4MDAwMDAwMjAgfHwgZmxhZ3MgPT0gMHgwMDAwMDA0MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpZih0aGlzLmluaXRlZCAmJiAhdGhpcy5pbldvcmxkKVxyXG5cdFx0XHRcdFx0XHRzZXRtZXRob2QuY2FsbCh0aGlzLCBvbGR2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWYodGhpcy5pbldvcmxkKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRpZihmbGFncyA9PSAweDAwMDAwMDA4IHx8IGZsYWdzID09IDB4MDAwMDAwMTApXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRpZighdGhpcy5pc1BsYXllcigpKVxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHNldG1ldGhvZC5jYWxsKHRoaXMsIG9sZHZhbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdG9uRGVzdHJveSA6IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fSxcclxuXHJcblx0b25Db250cm9sbGVkIDogZnVuY3Rpb24oYklzQ29udHJvbGxlZClcclxuXHR7XHJcblx0fSxcclxuXHJcblx0aXNQbGF5ZXIgOiBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuaWQgPT0gS0JFbmdpbmUuYXBwLmVudGl0eV9pZDtcclxuXHR9LFxyXG5cclxuXHRiYXNlQ2FsbCA6IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoIDwgMSlcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdLQkVuZ2luZS5FbnRpdHk6OmJhc2VDYWxsOiBub3QgZm91bnQgaW50ZXJmYWNlTmFtZSEnKTsgIFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5iYXNlID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdLQkVuZ2luZS5FbnRpdHk6OmJhc2VDYWxsOiBiYXNlIGlzIE5vbmUhJyk7ICBcclxuXHRcdFx0cmV0dXJuO1x0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgbWV0aG9kID0gS0JFbmdpbmUubW9kdWxlZGVmc1t0aGlzLmNsYXNzTmFtZV0uYmFzZV9tZXRob2RzW2FyZ3VtZW50c1swXV07XHJcblxyXG5cdFx0aWYobWV0aG9kID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmUuRW50aXR5OjpiYXNlQ2FsbDogVGhlIHNlcnZlciBkaWQgbm90IGZpbmQgdGhlIGRlZl9tZXRob2QoXCIgKyB0aGlzLmNsYXNzTmFtZSArIFwiLlwiICsgYXJndW1lbnRzWzBdICsgXCIpIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgbWV0aG9kSUQgPSBtZXRob2RbMF07XHJcblx0XHR2YXIgYXJncyA9IG1ldGhvZFszXTtcclxuXHRcdFxyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCAtIDEgIT0gYXJncy5sZW5ndGgpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lLkVudGl0eTo6YmFzZUNhbGw6IGFyZ3MoXCIgKyAoYXJndW1lbnRzLmxlbmd0aCAtIDEpICsgXCIhPSBcIiArIGFyZ3MubGVuZ3RoICsgXCIpIHNpemUgaXMgZXJyb3IhXCIpOyAgXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5iYXNlLm5ld0NhbGwoKTtcclxuXHRcdHRoaXMuYmFzZS5idW5kbGUud3JpdGVVaW50MTYobWV0aG9kSUQpO1xyXG5cdFx0XHJcblx0XHR0cnlcclxuXHRcdHtcclxuXHRcdFx0Zm9yKHZhciBpPTA7IGk8YXJncy5sZW5ndGg7IGkrKylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmKGFyZ3NbaV0uaXNTYW1lVHlwZShhcmd1bWVudHNbaSArIDFdKSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhcmdzW2ldLmFkZFRvU3RyZWFtKHRoaXMuYmFzZS5idW5kbGUsIGFyZ3VtZW50c1tpICsgMV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiS0JFbmdpbmUuRW50aXR5OjpiYXNlQ2FsbDogYXJnW1wiICsgaSArIFwiXSBpcyBlcnJvciFcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coZS50b1N0cmluZygpKTtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdLQkVuZ2luZS5FbnRpdHk6OmJhc2VDYWxsOiBhcmdzIGlzIGVycm9yIScpO1xyXG5cdFx0XHR0aGlzLmJhc2UuYnVuZGxlID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLmJhc2Uuc2VuZENhbGwoKTtcclxuXHR9LFxyXG5cdFxyXG5cdGNlbGxDYWxsIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coJ0tCRW5naW5lLkVudGl0eTo6Y2VsbENhbGw6IG5vdCBmb3VudCBpbnRlcmZhY2VOYW1lIScpOyAgXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodGhpcy5jZWxsID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdLQkVuZ2luZS5FbnRpdHk6OmNlbGxDYWxsOiBjZWxsIGlzIE5vbmUhJyk7ICBcclxuXHRcdFx0cmV0dXJuO1x0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgbWV0aG9kID0gS0JFbmdpbmUubW9kdWxlZGVmc1t0aGlzLmNsYXNzTmFtZV0uY2VsbF9tZXRob2RzW2FyZ3VtZW50c1swXV07XHJcblx0XHRcclxuXHRcdGlmKG1ldGhvZCA9PSB1bmRlZmluZWQpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lLkVudGl0eTo6Y2VsbENhbGw6IFRoZSBzZXJ2ZXIgZGlkIG5vdCBmaW5kIHRoZSBkZWZfbWV0aG9kKFwiICsgdGhpcy5jbGFzc05hbWUgKyBcIi5cIiArIGFyZ3VtZW50c1swXSArIFwiKSFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIG1ldGhvZElEID0gbWV0aG9kWzBdO1xyXG5cdFx0dmFyIGFyZ3MgPSBtZXRob2RbM107XHJcblx0XHRcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggLSAxICE9IGFyZ3MubGVuZ3RoKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZS5FbnRpdHk6OmNlbGxDYWxsOiBhcmdzKFwiICsgKGFyZ3VtZW50cy5sZW5ndGggLSAxKSArIFwiIT0gXCIgKyBhcmdzLmxlbmd0aCArIFwiKSBzaXplIGlzIGVycm9yIVwiKTsgIFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMuY2VsbC5uZXdDYWxsKCk7XHJcblx0XHR0aGlzLmNlbGwuYnVuZGxlLndyaXRlVWludDE2KG1ldGhvZElEKTtcclxuXHRcdFxyXG5cdFx0dHJ5XHJcblx0XHR7XHJcblx0XHRcdGZvcih2YXIgaT0wOyBpPGFyZ3MubGVuZ3RoOyBpKyspXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZihhcmdzW2ldLmlzU2FtZVR5cGUoYXJndW1lbnRzW2kgKyAxXSkpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YXJnc1tpXS5hZGRUb1N0cmVhbSh0aGlzLmNlbGwuYnVuZGxlLCBhcmd1bWVudHNbaSArIDFdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIktCRW5naW5lLkVudGl0eTo6Y2VsbENhbGw6IGFyZ1tcIiArIGkgKyBcIl0gaXMgZXJyb3IhXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2goZSlcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKGUudG9TdHJpbmcoKSk7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRygnS0JFbmdpbmUuRW50aXR5OjpjZWxsQ2FsbDogYXJncyBpcyBlcnJvciEnKTtcclxuXHRcdFx0dGhpcy5jZWxsLmJ1bmRsZSA9IG51bGw7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5jZWxsLnNlbmRDYWxsKCk7XHJcblx0fSxcclxuXHRcclxuXHRlbnRlcldvcmxkIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKHRoaXMuY2xhc3NOYW1lICsgJzo6ZW50ZXJXb3JsZDogJyArIHRoaXMuaWQpOyAvL+WkmuasoeaUtuWIsFxyXG5cdFx0dGhpcy5pbldvcmxkID0gdHJ1ZTtcclxuXHRcdFxyXG5cdFx0Ly9LQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TZXRTcGFjZURhdGEsIHRoaXMpO1xyXG5cdFx0dGhpcy5vbkVudGVyV29ybGQoKTsvL+i9rOWIsOWtkEF2YXRhci5qcyDkuK3nmoRvbkVudGVyV29ybGQoKVxyXG5cdH0sXHJcblxyXG5cdG9uRW50ZXJXb3JsZCA6IGZ1bmN0aW9uKCkgIFxyXG5cdHtcclxuXHRcdGNjLmxvZyhcImVudGl0eS5vbkVudGVyV29ybGRcIilcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkVudGVyV29ybGQsIHRoaXMpO1xyXG5cdH0sXHJcblx0XHRcclxuXHRsZWF2ZVdvcmxkIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKHRoaXMuY2xhc3NOYW1lICsgJzo6bGVhdmVXb3JsZDogJyArIHRoaXMuaWQpOyBcclxuXHRcdHRoaXMuaW5Xb3JsZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5vbkxlYXZlV29ybGQoKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkxlYXZlV29ybGQsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdG9uTGVhdmVXb3JsZCA6IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fSxcclxuXHRcdFxyXG5cdGVudGVyU3BhY2UgOiBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0codGhpcy5jbGFzc05hbWUgKyAnOjplbnRlclNwYWNlOiAnICsgdGhpcy5pZCk7IFxyXG5cdFx0dGhpcy5vbkVudGVyU3BhY2UoKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkVudGVyU3BhY2UsIHRoaXMpO1xyXG5cdFx0XHJcblx0XHQvLyDopoHnq4vljbPliLfmlrDooajnjrDlsYLlr7nosaHnmoTkvY3nva5cclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5zZXRfcG9zaXRpb24sIHRoaXMpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLnNldF9kaXJlY3Rpb24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdG9uRW50ZXJTcGFjZSA6IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fSxcclxuXHRcdFxyXG5cdGxlYXZlU3BhY2UgOiBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0codGhpcy5jbGFzc05hbWUgKyAnOjpsZWF2ZVNwYWNlOiAnICsgdGhpcy5pZCk7IFxyXG5cdFx0dGhpcy5vbkxlYXZlU3BhY2UoKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoXCJvbkxlYXZlU3BhY2VcIiwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0b25MZWF2ZVNwYWNlIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9LFxyXG5cdHNldF9yb29tS2V5YyA6IGZ1bmN0aW9uKG9sZClcclxuXHR7XHJcblx0XHRcclxuXHRcdGNjLmxvZyhcImtiZW5naW5lLmVudGl0eSA6OnNldF9yb29ta2V5Y1wiLHRoaXMucm9vbUtleWMuam9pbihcIlwiKSlcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLHRoaXMucm9vbUtleWMsdGhpcyk7XHJcblx0XHRcclxuXHR9LFxyXG5cdHNldF9ob2xkcyA6IGZ1bmN0aW9uKG9sZClcclxuXHR7XHJcblx0XHRcclxuXHRcdGNjLmxvZyhcImtiZW5naW5lLmVudGl0eSA6OnNldF9ob2xkc1wiKVxyXG5cdFx0Zm9yKHZhciBpPTA7aTx0aGlzLmhvbGRzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRjYy5sb2codGhpcy5ob2xkc1tpXSlcclxuXHRcdH1cclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoXCJlbnRpdHlfdXBkYXRlaG9sZHNcIix0aGlzLmhvbGRzLHRoaXMpO1xyXG5cdH0sXHJcblx0c2V0X3Bvc2l0aW9uIDogZnVuY3Rpb24ob2xkKVxyXG5cdHtcclxuXHRcdC8vIEtCRW5naW5lLkRFQlVHX01TRyh0aGlzLmNsYXNzTmFtZSArIFwiOjpzZXRfcG9zaXRpb246IFwiICsgb2xkKTsgIFxyXG5cdFx0XHJcblx0XHRpZih0aGlzLmlzUGxheWVyKCkpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5lbnRpdHlTZXJ2ZXJQb3MueCA9IHRoaXMucG9zaXRpb24ueDtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy55ID0gdGhpcy5wb3NpdGlvbi55O1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zLnogPSB0aGlzLnBvc2l0aW9uLno7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5zZXRfcG9zaXRpb24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdG9uVXBkYXRlVm9sYXRpbGVEYXRhIDogZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9LFxyXG5cdFxyXG5cdHNldF9kaXJlY3Rpb24gOiBmdW5jdGlvbihvbGQpXHJcblx0e1xyXG5cdFx0Ly8gS0JFbmdpbmUuREVCVUdfTVNHKHRoaXMuY2xhc3NOYW1lICsgXCI6OnNldF9kaXJlY3Rpb246IFwiICsgb2xkKTsgIFxyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLnNldF9kaXJlY3Rpb24sIHRoaXMpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEVudGl0eUNhbGxcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5FTlRJVFlDQUxMX1RZUEVfQ0VMTCA9IDA7XHJcbktCRW5naW5lLkVOVElUWUNBTExfVFlQRV9CQVNFID0gMTtcclxuXHJcbktCRW5naW5lLkVudGl0eUNhbGwgPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmlkID0gMDtcclxuXHR0aGlzLmNsYXNzTmFtZSA9IFwiXCI7XHJcblx0dGhpcy50eXBlID0gS0JFbmdpbmUuRU5USVRZQ0FMTF9UWVBFX0NFTEw7XHJcblx0dGhpcy5uZXR3b3JrSW50ZXJmYWNlID0gS0JFbmdpbmUuYXBwO1xyXG5cdFxyXG5cdHRoaXMuYnVuZGxlID0gbnVsbDtcclxuXHRcclxuXHR0aGlzLmlzQmFzZSA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy50eXBlID09IEtCRW5naW5lLkVOVElUWUNBTExfVFlQRV9CQVNFO1xyXG5cdH1cclxuXHJcblx0dGhpcy5pc0NlbGwgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMudHlwZSA9PSBLQkVuZ2luZS5FTlRJVFlDQUxMX1RZUEVfQ0VMTDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5uZXdDYWxsID0gZnVuY3Rpb24oKVxyXG5cdHsgIFxyXG5cdFx0aWYodGhpcy5idW5kbGUgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5idW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcclxuXHRcdGlmKHRoaXMudHlwZSA9PSBLQkVuZ2luZS5FTlRJVFlDQUxMX1RZUEVfQ0VMTClcclxuXHRcdFx0dGhpcy5idW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX29uUmVtb3RlQ2FsbENlbGxNZXRob2RGcm9tQ2xpZW50KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5idW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5FbnRpdHlfb25SZW1vdGVNZXRob2RDYWxsKTtcclxuXHJcblx0XHR0aGlzLmJ1bmRsZS53cml0ZUludDMyKHRoaXMuaWQpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcy5idW5kbGU7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuc2VuZENhbGwgPSBmdW5jdGlvbihidW5kbGUpXHJcblx0e1xyXG5cdFx0aWYoYnVuZGxlID09IHVuZGVmaW5lZClcclxuXHRcdFx0YnVuZGxlID0gdGhpcy5idW5kbGU7XHJcblx0XHRcclxuXHRcdGJ1bmRsZS5zZW5kKHRoaXMubmV0d29ya0ludGVyZmFjZSk7XHJcblx0XHRcclxuXHRcdGlmKHRoaXMuYnVuZGxlID09IGJ1bmRsZSlcclxuXHRcdFx0dGhpcy5idW5kbGUgPSBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbnRpdHlkZWZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5LQkVuZ2luZS5tb2R1bGVkZWZzID0ge307XHJcbktCRW5naW5lLmRhdGF0eXBlcyA9IHt9O1xyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfVUlOVDggPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkVWludDguY2FsbChzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZVVpbnQ4KHYpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5wYXJzZURlZmF1bHRWYWxTdHIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiBwYXJzZUludCh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRpZih0eXBlb2YodikgIT0gXCJudW1iZXJcIilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2IDwgMCB8fCB2ID4gMHhmZilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX1VJTlQxNiA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuYmluZCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuY3JlYXRlRnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRVaW50MTYuY2FsbChzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZVVpbnQxNih2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5wYXJzZURlZmF1bHRWYWxTdHIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiBwYXJzZUludCh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRpZih0eXBlb2YodikgIT0gXCJudW1iZXJcIilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2IDwgMCB8fCB2ID4gMHhmZmZmKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfVUlOVDMyID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFVpbnQzMi5jYWxsKHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0c3RyZWFtLndyaXRlVWludDMyKHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlSW50KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZih2KSAhPSBcIm51bWJlclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHYgPCAwIHx8IHYgPiAweGZmZmZmZmZmKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfVUlOVDY0ID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFVpbnQ2NC5jYWxsKHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0c3RyZWFtLndyaXRlVWludDY0KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlSW50KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiB2IGluc3RhbmNlb2YgS0JFbmdpbmUuVUlOVDY0O1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfSU5UOCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuYmluZCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuY3JlYXRlRnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUucmVhZGVyLnJlYWRJbnQ4LmNhbGwoc3RyZWFtKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRzdHJlYW0ud3JpdGVJbnQ4KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlSW50KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZih2KSAhPSBcIm51bWJlclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHYgPCAtMHg4MCB8fCB2ID4gMHg3ZilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX0lOVDE2ID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZEludDE2LmNhbGwoc3RyZWFtKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRzdHJlYW0ud3JpdGVJbnQxNih2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5wYXJzZURlZmF1bHRWYWxTdHIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiBwYXJzZUludCh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRpZih0eXBlb2YodikgIT0gXCJudW1iZXJcIilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2IDwgLTB4ODAwMCB8fCB2ID4gMHg3ZmZmKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfSU5UMzIgPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZUludDMyKHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlSW50KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKHR5cGVvZih2KSAhPSBcIm51bWJlclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHYgPCAtMHg4MDAwMDAwMCB8fCB2ID4gMHg3ZmZmZmZmZilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX0lOVDY0ID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZEludDY0LmNhbGwoc3RyZWFtKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRzdHJlYW0ud3JpdGVJbnQ2NCh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5wYXJzZURlZmF1bHRWYWxTdHIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiBwYXJzZUludCh2KTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gdiBpbnN0YW5jZW9mIEtCRW5naW5lLklOVDY0O1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfRkxPQVQgPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLnJlYWRlci5yZWFkRmxvYXQuY2FsbChzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZUZsb2F0KHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQodik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuaXNTYW1lVHlwZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZih2KSA9PSBcIm51bWJlclwiO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfRE9VQkxFID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZERvdWJsZS5jYWxsKHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0c3RyZWFtLndyaXRlRG91YmxlKHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQodik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuaXNTYW1lVHlwZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHR5cGVvZih2KSA9PSBcIm51bWJlclwiO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfU1RSSU5HID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5yZWFkZXIucmVhZFN0cmluZy5jYWxsKHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0c3RyZWFtLndyaXRlU3RyaW5nKHYpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mKHYpID09IFwic3RyaW5nXCIpXHJcblx0XHRcdHJldHVybiB2O1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gdHlwZW9mKHYpID09IFwic3RyaW5nXCI7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5EQVRBVFlQRV9WRUNUT1IyID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdGlmKEtCRW5naW5lLkNMSUVOVF9OT19GTE9BVClcclxuXHRcdHtcclxuXHRcdFx0dmFyIHggPSBLQkVuZ2luZS5yZWFkZXIucmVhZEludDMyLmNhbGwoc3RyZWFtKTtcclxuXHRcdFx0dmFyIHkgPSBLQkVuZ2luZS5yZWFkZXIucmVhZEludDMyLmNhbGwoc3RyZWFtKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBLQkVuZ2luZS5WZWN0b3IyKHgsIHkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgeCA9IEtCRW5naW5lLnJlYWRlci5yZWFkRmxvYXQuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHR2YXIgeSA9IEtCRW5naW5lLnJlYWRlci5yZWFkRmxvYXQuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEtCRW5naW5lLlZlY3RvcjIoeCwgeSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0aWYoS0JFbmdpbmUuQ0xJRU5UX05PX0ZMT0FUKVxyXG5cdFx0e1xyXG5cdFx0XHRzdHJlYW0ud3JpdGVJbnQzMih2LngpO1xyXG5cdFx0XHRzdHJlYW0ud3JpdGVJbnQzMih2LnkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRzdHJlYW0ud3JpdGVGbG9hdCh2LngpO1xyXG5cdFx0XHRzdHJlYW0ud3JpdGVGbG9hdCh2LnkpO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLnBhcnNlRGVmYXVsdFZhbFN0ciA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBLQkVuZ2luZS5WZWN0b3IyKDAuMCwgMC4wKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRpZighIHYgaW5zdGFuY2VvZiBLQkVuZ2luZS5WZWN0b3IyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfVkVDVE9SMyA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuYmluZCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuY3JlYXRlRnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRpZihLQkVuZ2luZS5DTElFTlRfTk9fRkxPQVQpXHJcblx0XHR7XHJcblx0XHRcdHZhciB4ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRJbnQzMi5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHZhciB5ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRJbnQzMi5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHZhciB6ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRJbnQzMi5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHJldHVybiBuZXcgS0JFbmdpbmUuVmVjdG9yMyh4LCB5LCB6KTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0dmFyIHggPSBLQkVuZ2luZS5yZWFkZXIucmVhZEZsb2F0LmNhbGwoc3RyZWFtKTtcclxuXHRcdFx0dmFyIHkgPSBLQkVuZ2luZS5yZWFkZXIucmVhZEZsb2F0LmNhbGwoc3RyZWFtKTtcclxuXHRcdFx0dmFyIHogPSBLQkVuZ2luZS5yZWFkZXIucmVhZEZsb2F0LmNhbGwoc3RyZWFtKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBLQkVuZ2luZS5WZWN0b3IzKHgsIHksIHopO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRpZihLQkVuZ2luZS5DTElFTlRfTk9fRkxPQVQpXHJcblx0XHR7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueCk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueSk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueik7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdHN0cmVhbS53cml0ZUZsb2F0KHYueCk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUZsb2F0KHYueSk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUZsb2F0KHYueik7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IEtCRW5naW5lLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuaXNTYW1lVHlwZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0aWYoISB2IGluc3RhbmNlb2YgS0JFbmdpbmUuVmVjdG9yMylcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX1ZFQ1RPUjQgPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0aWYoS0JFbmdpbmUuQ0xJRU5UX05PX0ZMT0FUKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgeCA9IEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHR2YXIgeSA9IEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHR2YXIgeiA9IEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHR2YXIgdyA9IEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEtCRW5naW5lLlZlY3RvcjQoeCwgeSwgeiwgdyk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdHZhciB4ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRGbG9hdC5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHZhciB5ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRGbG9hdC5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHZhciB6ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRGbG9hdC5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHZhciB3ID0gS0JFbmdpbmUucmVhZGVyLnJlYWRGbG9hdC5jYWxsKHN0cmVhbSk7XHJcblx0XHRcdHJldHVybiBuZXcgS0JFbmdpbmUuVmVjdG9yNCh4LCB5LCB6LCB3KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRpZihLQkVuZ2luZS5DTElFTlRfTk9fRkxPQVQpXHJcblx0XHR7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueCk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueSk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYueik7XHJcblx0XHRcdHN0cmVhbS53cml0ZUludDMyKHYudyk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdHN0cmVhbS53cml0ZUZsb2F0KHYueCk7XHJcblx0XHRcdHN0cmVhbS53cml0ZUZsb2F0KHYueSk7XHRcdFxyXG5cdFx0XHRzdHJlYW0ud3JpdGVGbG9hdCh2LnopO1xyXG5cdFx0XHRzdHJlYW0ud3JpdGVGbG9hdCh2LncpO1x0XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy5wYXJzZURlZmF1bHRWYWxTdHIgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgS0JFbmdpbmUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAwLjApO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdGlmKCEgdiBpbnN0YW5jZW9mIEtCRW5naW5lLlZlY3RvcjQpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5EQVRBVFlQRV9QWVRIT04gPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN0cmVhbS5yZWFkQmxvYigpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZUJsb2Iodik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5EQVRBVFlQRV9VTklDT0RFID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblxyXG5cdHRoaXMuY3JlYXRlRnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUudXRmOEFycmF5VG9TdHJpbmcoS0JFbmdpbmUucmVhZGVyLnJlYWRCbG9iLmNhbGwoc3RyZWFtKSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0c3RyZWFtLndyaXRlQmxvYihLQkVuZ2luZS5zdHJpbmdUb1VURjhCeXRlcyh2KSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRpZih0eXBlb2YodikgPT0gXCJzdHJpbmdcIilcclxuXHRcdFx0cmV0dXJuIHY7XHJcblx0XHRcclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmlzU2FtZVR5cGUgPSBmdW5jdGlvbih2KVxyXG5cdHtcclxuXHRcdHJldHVybiB0eXBlb2YodikgPT0gXCJzdHJpbmdcIjtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX0VOVElUWUNBTEwgPSBmdW5jdGlvbigpXHJcbntcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGNpZCA9IEtCRW5naW5lLnJlYWRlci5yZWFkVWludDY0LmNhbGwoc3RyZWFtKTtcclxuXHRcdHZhciBpZCA9IEtCRW5naW5lLnJlYWRlci5yZWFkSW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0dmFyIHR5cGUgPSBLQkVuZ2luZS5yZWFkZXIucmVhZFVpbnQxNi5jYWxsKHN0cmVhbSk7XHJcblx0XHR2YXIgdXR5cGUgPSBLQkVuZ2luZS5yZWFkZXIucmVhZFVpbnQxNi5jYWxsKHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkVG9TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIHYpXHJcblx0e1xyXG5cdFx0dmFyIGNpZCA9IG5ldyBLQkVuZ2luZS5VSU5UNjQoMCwgMCk7XHJcblx0XHR2YXIgaWQgPSAwO1xyXG5cdFx0dmFyIHR5cGUgPSAwO1xyXG5cdFx0dmFyIHV0eXBlID0gMDtcclxuXHJcblx0XHRzdHJlYW0ud3JpdGVVaW50NjQoY2lkKTtcclxuXHRcdHN0cmVhbS53cml0ZUludDMyKGlkKTtcclxuXHRcdHN0cmVhbS53cml0ZVVpbnQxNih0eXBlKTtcclxuXHRcdHN0cmVhbS53cml0ZVVpbnQxNih1dHlwZSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5EQVRBVFlQRV9CTE9CID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy5iaW5kID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5jcmVhdGVGcm9tU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBzaXplID0gS0JFbmdpbmUucmVhZGVyLnJlYWRVaW50MzIuY2FsbChzdHJlYW0pO1xyXG5cdFx0dmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHN0cmVhbS5idWZmZXIsIHN0cmVhbS5ycG9zLCBzaXplKTtcclxuXHRcdHN0cmVhbS5ycG9zICs9IHNpemU7XHJcblx0XHRyZXR1cm4gYnVmO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdHN0cmVhbS53cml0ZUJsb2Iodik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5pc1NhbWVUeXBlID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbktCRW5naW5lLkRBVEFUWVBFX0FSUkFZID0gZnVuY3Rpb24oKVxyXG57XHJcblx0dGhpcy50eXBlID0gbnVsbDtcclxuXHRcclxuXHR0aGlzLmJpbmQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0aWYodHlwZW9mKHRoaXMudHlwZSkgPT0gXCJudW1iZXJcIilcclxuXHRcdFx0dGhpcy50eXBlID0gS0JFbmdpbmUuZGF0YXR5cGVzW3RoaXMudHlwZV07XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuY3JlYXRlRnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgc2l6ZSA9IHN0cmVhbS5yZWFkVWludDMyKCk7XHJcblx0XHR2YXIgZGF0YXMgPSBbXTtcclxuXHRcdFxyXG5cdFx0d2hpbGUoc2l6ZSA+IDApXHJcblx0XHR7XHJcblx0XHRcdHNpemUtLTtcclxuXHRcdFx0ZGF0YXMucHVzaCh0aGlzLnR5cGUuY3JlYXRlRnJvbVN0cmVhbShzdHJlYW0pKTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHJldHVybiBkYXRhcztcclxuXHR9XHJcblx0XHJcblx0dGhpcy5hZGRUb1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSwgdilcclxuXHR7XHJcblx0XHRzdHJlYW0ud3JpdGVVaW50MzIodi5sZW5ndGgpO1xyXG5cdFx0Zm9yKHZhciBpPTA7IGk8di5sZW5ndGg7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0dGhpcy50eXBlLmFkZFRvU3RyZWFtKHN0cmVhbSwgdltpXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuaXNTYW1lVHlwZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBpPTA7IGk8di5sZW5ndGg7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0aWYoIXRoaXMudHlwZS5pc1NhbWVUeXBlKHZbaV0pKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuS0JFbmdpbmUuREFUQVRZUEVfRklYRURfRElDVCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuZGljdHR5cGUgPSB7fTtcclxuXHR0aGlzLmltcGxlbWVudGVkQnkgPSBudWxsO1xyXG5cdFxyXG5cdHRoaXMuYmluZCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRmb3IodmFyIGl0ZW1rZXkgaW4gdGhpcy5kaWN0dHlwZSlcclxuXHRcdHtcclxuXHRcdFx0dmFyIHV0eXBlID0gdGhpcy5kaWN0dHlwZVtpdGVta2V5XTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKHR5cGVvZih0aGlzLmRpY3R0eXBlW2l0ZW1rZXldKSA9PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdHRoaXMuZGljdHR5cGVbaXRlbWtleV0gPSBLQkVuZ2luZS5kYXRhdHlwZXNbdXR5cGVdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGRhdGFzID0ge307XHJcblx0XHRmb3IodmFyIGl0ZW1rZXkgaW4gdGhpcy5kaWN0dHlwZSlcclxuXHRcdHtcclxuXHRcdFx0ZGF0YXNbaXRlbWtleV0gPSB0aGlzLmRpY3R0eXBlW2l0ZW1rZXldLmNyZWF0ZUZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRhdGFzO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmFkZFRvU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtLCB2KVxyXG5cdHtcclxuXHRcdGZvcih2YXIgaXRlbWtleSBpbiB0aGlzLmRpY3R0eXBlKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmRpY3R0eXBlW2l0ZW1rZXldLmFkZFRvU3RyZWFtKHN0cmVhbSwgdltpdGVta2V5XSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucGFyc2VEZWZhdWx0VmFsU3RyID0gZnVuY3Rpb24odilcclxuXHR7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuaXNTYW1lVHlwZSA9IGZ1bmN0aW9uKHYpXHJcblx0e1xyXG5cdFx0Zm9yKHZhciBpdGVta2V5IGluIHRoaXMuZGljdHR5cGUpXHJcblx0XHR7XHJcblx0XHRcdGlmKCF0aGlzLmRpY3R0eXBlW2l0ZW1rZXldLmlzU2FtZVR5cGUodltpdGVta2V5XSkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJVSU5UOFwiXVx0XHQ9IG5ldyBLQkVuZ2luZS5EQVRBVFlQRV9VSU5UOCgpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJVSU5UMTZcIl1cdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX1VJTlQxNigpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJVSU5UMzJcIl1cdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX1VJTlQzMigpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJVSU5UNjRcIl1cdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX1VJTlQ2NCgpO1xyXG5cclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiSU5UOFwiXVx0XHQ9IG5ldyBLQkVuZ2luZS5EQVRBVFlQRV9JTlQ4KCk7XHJcbktCRW5naW5lLmRhdGF0eXBlc1tcIklOVDE2XCJdXHRcdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0lOVDE2KCk7XHJcbktCRW5naW5lLmRhdGF0eXBlc1tcIklOVDMyXCJdXHRcdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0lOVDMyKCk7XHJcbktCRW5naW5lLmRhdGF0eXBlc1tcIklOVDY0XCJdXHRcdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0lOVDY0KCk7XHJcblxyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJGTE9BVFwiXVx0XHQ9IG5ldyBLQkVuZ2luZS5EQVRBVFlQRV9GTE9BVCgpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJET1VCTEVcIl1cdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0RPVUJMRSgpO1xyXG5cclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiU1RSSU5HXCJdXHQ9IG5ldyBLQkVuZ2luZS5EQVRBVFlQRV9TVFJJTkcoKTtcclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiVkVDVE9SMlwiXVx0PSBuZXcgS0JFbmdpbmUuREFUQVRZUEVfVkVDVE9SMjtcclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiVkVDVE9SM1wiXVx0PSBuZXcgS0JFbmdpbmUuREFUQVRZUEVfVkVDVE9SMztcclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiVkVDVE9SNFwiXVx0PSBuZXcgS0JFbmdpbmUuREFUQVRZUEVfVkVDVE9SNDtcclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiUFlUSE9OXCJdXHQ9IG5ldyBLQkVuZ2luZS5EQVRBVFlQRV9QWVRIT04oKTtcclxuS0JFbmdpbmUuZGF0YXR5cGVzW1wiVU5JQ09ERVwiXVx0PSBuZXcgS0JFbmdpbmUuREFUQVRZUEVfVU5JQ09ERSgpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJFTlRJVFlDQUxMXCJdPSBuZXcgS0JFbmdpbmUuREFUQVRZUEVfRU5USVRZQ0FMTCgpO1xyXG5LQkVuZ2luZS5kYXRhdHlwZXNbXCJCTE9CXCJdXHRcdD0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0JMT0IoKTtcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0S0JFbmdpbmUgYXJnc1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbktCRW5naW5lLktCRW5naW5lQXJncyA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHRoaXMuaXAgPSBcIjEyNy4wLjAuMVwiO1xyXG5cdHRoaXMucG9ydCA9IDIwMDEzO1xyXG5cdHRoaXMudXBkYXRlSFogPSAxMDA7XHJcblx0dGhpcy5zZXJ2ZXJIZWFydGJlYXRUaWNrID0gMTU7XHJcblxyXG5cdC8vIFJlZmVyZW5jZTogaHR0cDovL2tiZW5naW5lLmdpdGh1Yi5pby9kb2NzL3Byb2dyYW1taW5nL2NsaWVudHNka3Byb2dyYW1taW5nLmh0bWwsIGNsaWVudCB0eXBlc1xyXG5cdHRoaXMuY2xpZW50VHlwZSA9IDU7XHJcblxyXG5cdC8vIOWcqEVudGl0eeWIneWni+WMluaXtuaYr+WQpuinpuWPkeWxnuaAp+eahHNldF8q5LqL5Lu2KGNhbGxQcm9wZXJ0eXNTZXRNZXRob2RzKVxyXG5cdHRoaXMuaXNPbkluaXRDYWxsUHJvcGVydHlzU2V0TWV0aG9kcyA9IHRydWU7XHJcblxyXG5cdC8vIOaYr+WQpueUqHdzcywg6buY6K6k5L2/55Sod3NcclxuXHR0aGlzLmlzV3NzID0gZmFsc2U7XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0S0JFbmdpbmUgYXBwXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuS0JFbmdpbmUuRXZlbnRUeXBlcyA9XHJcbntcclxuXHQvLyBDcmVhdGUgbmV3IGFjY291bnQuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMShzdHJpbmcpOiBhY2NvdW50TmFtZTwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IHBhc3N3b3JkPC9wYXJhPlxyXG5cdC8vIDxwYXJhPiBwYXJhbTMoYnl0ZXMpOiBkYXRhcyAvLyBEYXRhcyBieSB1c2VyIGRlZmluZWQuIERhdGEgd2lsbCBiZSByZWNvcmRlZCBpbnRvIHRoZSBLQkUgYWNjb3VudCBkYXRhYmFzZSwgeW91IGNhbiBhY2Nlc3MgdGhlIGRhdGFzIHRocm91Z2ggdGhlIHNjcmlwdCBsYXllci4gSWYgeW91IHVzZSB0aGlyZC1wYXJ0eSBhY2NvdW50IHN5c3RlbSwgZGF0YXMgd2lsbCBiZSBzdWJtaXR0ZWQgdG8gdGhlIHRoaXJkLXBhcnR5IHN5c3RlbS48L3BhcmE+XHJcblx0Y3JlYXRlQWNjb3VudCA6IFwiY3JlYXRlQWNjb3VudFwiLFxyXG5cclxuXHQvLyBMb2dpbiB0byBzZXJ2ZXIuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMShzdHJpbmcpOiBhY2NvdW50TmFtZTwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IHBhc3N3b3JkPC9wYXJhPlxyXG5cdC8vIDxwYXJhPiBwYXJhbTMoYnl0ZXMpOiBkYXRhcyAvLyBEYXRhcyBieSB1c2VyIGRlZmluZWQuIERhdGEgd2lsbCBiZSByZWNvcmRlZCBpbnRvIHRoZSBLQkUgYWNjb3VudCBkYXRhYmFzZSwgeW91IGNhbiBhY2Nlc3MgdGhlIGRhdGFzIHRocm91Z2ggdGhlIHNjcmlwdCBsYXllci4gSWYgeW91IHVzZSB0aGlyZC1wYXJ0eSBhY2NvdW50IHN5c3RlbSwgZGF0YXMgd2lsbCBiZSBzdWJtaXR0ZWQgdG8gdGhlIHRoaXJkLXBhcnR5IHN5c3RlbS48L3BhcmE+XHJcblx0bG9naW4gOiBcImxvZ2luXCIsXHJcblxyXG5cdC8vIExvZ291dCB0byBiYXNlYXBwLCBjYWxsZWQgd2hlbiBleGl0aW5nIHRoZSBjbGllbnQuXHRcclxuXHRsb2dvdXQgOiBcImxvZ291dFwiLFxyXG5cclxuXHQvLyBSZWxvZ2luIHRvIGJhc2VhcHAuXHJcblx0cmVsb2dpbkJhc2VhcHAgOiBcInJlbG9naW5CYXNlYXBwXCIsXHJcblxyXG5cdC8vIFJlcXVlc3Qgc2VydmVyIGJpbmRpbmcgYWNjb3VudCBFbWFpbC5cclxuXHQvLyA8cGFyYT4gcGFyYW0xKHN0cmluZyk6IGVtYWlsQWRkcmVzczwvcGFyYT5cclxuXHRiaW5kQWNjb3VudEVtYWlsIDogXCJiaW5kQWNjb3VudEVtYWlsXCIsXHJcblxyXG5cdC8vIFJlcXVlc3QgdG8gc2V0IHVwIGEgbmV3IHBhc3N3b3JkIGZvciB0aGUgYWNjb3VudC4gTm90ZTogYWNjb3VudCBtdXN0IGJlIG9ubGluZS5cclxuXHQvLyA8cGFyYT4gcGFyYW0xKHN0cmluZyk6IG9sZF9wYXNzd29yZDwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IG5ld19wYXNzd29yZDwvcGFyYT5cclxuXHRuZXdQYXNzd29yZCA6IFwibmV3UGFzc3dvcmRcIixcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6L+e5o6l55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8vIEtpY2tlZCBvZiB0aGUgY3VycmVudCBzZXJ2ZXIuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMSh1aW50MTYpOiByZXRjb2RlLiAvLyBzZXJ2ZXJfZXJyb3JzPC9wYXJhPlxyXG5cdG9uS2lja2VkIDogXCJvbktpY2tlZFwiLFxyXG5cclxuXHQvLyBEaXNjb25uZWN0ZWQgZnJvbSB0aGUgc2VydmVyLlxyXG5cdG9uRGlzY29ubmVjdGVkIDogXCJvbkRpc2Nvbm5lY3RlZFwiLFxyXG5cclxuXHQvLyBTdGF0dXMgb2YgY29ubmVjdGlvbiBzZXJ2ZXIuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMShib29sKTogc3VjY2VzcyBvciBmYWlsPC9wYXJhPlxyXG5cdG9uQ29ubmVjdGlvblN0YXRlIDogXCJvbkNvbm5lY3Rpb25TdGF0ZVwiLFxyXG5cdG9uQ29ubmVjdGlvblN0YXRlMiA6IFwib25Db25uZWN0aW9uU3RhdGUyXCIsXHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWxvZ29u55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8vIENyZWF0ZSBhY2NvdW50IGZlZWRiYWNrIHJlc3VsdHMuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMSh1aW50MTYpOiByZXRjb2RlLiAvLyBzZXJ2ZXJfZXJyb3JzPC9wYXJhPlxyXG5cdC8vIDxwYXJhPiBwYXJhbTIoYnl0ZXMpOiBkYXRhcy4gLy8gSWYgeW91IHVzZSB0aGlyZC1wYXJ0eSBhY2NvdW50IHN5c3RlbSwgdGhlIHN5c3RlbSBtYXkgZmlsbCBzb21lIG9mIHRoZSB0aGlyZC1wYXJ0eSBhZGRpdGlvbmFsIGRhdGFzLiA8L3BhcmE+XHJcblx0b25DcmVhdGVBY2NvdW50UmVzdWx0IDogXCJvbkNyZWF0ZUFjY291bnRSZXN1bHRcIixcclxuXHJcblx0Ly8gRW5naW5lIHZlcnNpb24gbWlzbWF0Y2guXHJcblx0Ly8gPHBhcmE+IHBhcmFtMShzdHJpbmcpOiBjbGllbnRWZXJzaW9uXHJcblx0Ly8gPHBhcmE+IHBhcmFtMihzdHJpbmcpOiBzZXJ2ZXJWZXJzaW9uXHJcblx0b25WZXJzaW9uTm90TWF0Y2ggOiBcIm9uVmVyc2lvbk5vdE1hdGNoXCIsXHJcblxyXG5cdC8vIHNjcmlwdCB2ZXJzaW9uIG1pc21hdGNoLlxyXG4gICAgLy8gPHBhcmE+IHBhcmFtMShzdHJpbmcpOiBjbGllbnRTY3JpcHRWZXJzaW9uXHJcbiAgICAvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IHNlcnZlclNjcmlwdFZlcnNpb25cclxuXHRvblNjcmlwdFZlcnNpb25Ob3RNYXRjaCA6IFwib25TY3JpcHRWZXJzaW9uTm90TWF0Y2hcIixcclxuXHJcblx0Ly8gTG9naW4gZmFpbGVkLlxyXG4gICAgLy8gPHBhcmE+IHBhcmFtMSh1aW50MTYpOiByZXRjb2RlLiAvLyBzZXJ2ZXJfZXJyb3JzPC9wYXJhPlxyXG5cdG9uTG9naW5GYWlsZWQgOiBcIm9uTG9naW5GYWlsZWRcIixcclxuXHJcblx0Ly8gTG9naW4gdG8gYmFzZWFwcC5cclxuXHRvbkxvZ2luQmFzZWFwcCA6IFwib25Mb2dpbkJhc2VhcHBcIixcclxuXHJcblx0Ly8gTG9naW4gYmFzZWFwcCBmYWlsZWQuXHJcbiAgICAvLyA8cGFyYT4gcGFyYW0xKHVpbnQxNik6IHJldGNvZGUuIC8vIHNlcnZlcl9lcnJvcnM8L3BhcmE+XHJcblx0b25Mb2dpbkJhc2VhcHBGYWlsZWQgOiBcIm9uTG9naW5CYXNlYXBwRmFpbGVkXCIsXHJcblxyXG5cdC8vIFJlbG9naW4gdG8gYmFzZWFwcC5cclxuXHRvblJlbG9naW5CYXNlYXBwIDogXCJvblJlbG9naW5CYXNlYXBwXCIsXHJcblxyXG5cdC8vIFJlbG9naW4gYmFzZWFwcCBzdWNjZXNzLlxyXG5cdG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIixcclxuXHJcblx0Ly8gUmVsb2dpbiBiYXNlYXBwIGZhaWxlZC5cclxuICAgIC8vIDxwYXJhPiBwYXJhbTEodWludDE2KTogcmV0Y29kZS4gLy8gc2VydmVyX2Vycm9yczwvcGFyYT5cclxuXHRvblJlbG9naW5CYXNlYXBwRmFpbGVkIDogXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsXHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWunuS9k2NlbGznm7jlhbPkuovku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0Ly8gRW50aXR5IGVudGVyIHRoZSBjbGllbnQtd29ybGQuXHJcbiAgICAvLyA8cGFyYT4gcGFyYW0xOiBFbnRpdHk8L3BhcmE+XHJcblx0b25FbnRlcldvcmxkIDogXCJvbkVudGVyV29ybGRcIixcclxuXHJcblx0Ly8gRW50aXR5IGxlYXZlIHRoZSBjbGllbnQtd29ybGQuXHJcbiAgICAvLyA8cGFyYT4gcGFyYW0xOiBFbnRpdHk8L3BhcmE+XHJcblx0b25MZWF2ZVdvcmxkIDogXCJvbkxlYXZlV29ybGRcIixcclxuXHJcblx0Ly8gUGxheWVyIGVudGVyIHRoZSBuZXcgc3BhY2UuXHJcbiAgICAvLyA8cGFyYT4gcGFyYW0xOiBFbnRpdHk8L3BhcmE+XHJcblx0b25FbnRlclNwYWNlIDogXCJvbkVudGVyU3BhY2VcIixcclxuXHJcblx0Ly8gUGxheWVyIGxlYXZlIHRoZSBzcGFjZS5cclxuICAgIC8vIDxwYXJhPiBwYXJhbTE6IEVudGl0eTwvcGFyYT5cclxuXHRvbkxlYXZlU3BhY2UgOiBcIm9uTGVhdmVTcGFjZVwiLFxyXG5cclxuXHQvLyBTZXRzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBlbnRpdHkuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMTogRW50aXR5PC9wYXJhPlxyXG5cdHNldF9wb3NpdGlvbiA6IFwic2V0X3Bvc2l0aW9uXCIsXHJcblxyXG5cdC8vIFNldHMgdGhlIGN1cnJlbnQgZGlyZWN0aW9uIG9mIHRoZSBlbnRpdHkuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMTogRW50aXR5PC9wYXJhPlxyXG5cdHNldF9kaXJlY3Rpb24gOiBcInNldF9kaXJlY3Rpb25cIixcclxuXHJcblx0Ly8gVGhlIGVudGl0eSBwb3NpdGlvbiBpcyB1cGRhdGVkLCB5b3UgY2FuIHNtb290aCB0aGUgbW92aW5nIGVudGl0eSB0byBuZXcgbG9jYXRpb24uXHJcblx0Ly8gPHBhcmE+IHBhcmFtMTogRW50aXR5PC9wYXJhPlxyXG5cdHVwZGF0ZVBvc2l0aW9uIDogXCJ1cGRhdGVQb3NpdGlvblwiLFxyXG5cclxuXHQvLyBUaGUgY3VycmVudCBzcGFjZSBpcyBzcGVjaWZpZWQgYnkgdGhlIGdlb21ldHJ5IG1hcHBpbmcuXHJcblx0Ly8gUG9wdWxhciBzYWlkIGlzIHRvIGxvYWQgdGhlIHNwZWNpZmllZCBNYXAgUmVzb3VyY2VzLlxyXG5cdC8vIDxwYXJhPiBwYXJhbTEoc3RyaW5nKTogcmVzUGF0aDwvcGFyYT5cclxuXHRhZGRTcGFjZUdlb21ldHJ5TWFwcGluZyA6IFwiYWRkU3BhY2VHZW9tZXRyeU1hcHBpbmdcIixcclxuXHJcblx0Ly8gU2VydmVyIHNwYWNlRGF0YSBzZXQgZGF0YS5cclxuXHQvLyA8cGFyYT4gcGFyYW0xKGludDMyKTogc3BhY2VJRDwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IGtleTwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0zKHN0cmluZyk6IHZhbHVlPC9wYXJhPlxyXG5cdG9uU2V0U3BhY2VEYXRhIDogXCJvblNldFNwYWNlRGF0YVwiLFxyXG5cclxuXHQvLyBTdGFydCBkb3dubG9hZGluZyBkYXRhLlxyXG5cdC8vIDxwYXJhPiBwYXJhbTEoaW50MzIpOiByc3BhY2VJRDwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKHN0cmluZyk6IGtleTwvcGFyYT5cclxuXHRvbkRlbFNwYWNlRGF0YSA6IFwib25EZWxTcGFjZURhdGFcIixcclxuXHJcblx0Ly8gVHJpZ2dlcmVkIHdoZW4gdGhlIGVudGl0eSBpcyBjb250cm9sbGVkIG9yIG91dCBvZiBjb250cm9sLlxyXG5cdC8vIDxwYXJhPiBwYXJhbTE6IEVudGl0eTwvcGFyYT5cclxuXHQvLyA8cGFyYT4gcGFyYW0yKGJvb2wpOiBpc0NvbnRyb2xsZWQ8L3BhcmE+XHJcblx0b25Db250cm9sbGVkIDogXCJvbkNvbnRyb2xsZWRcIixcclxuXHJcblx0Ly8gTG9zZSBjb250cm9sbGVkIGVudGl0eS5cclxuXHQvLyA8cGFyYT4gcGFyYW0xOiBFbnRpdHk8L3BhcmE+XHJcblx0b25Mb3NlQ29udHJvbGxlZEVudGl0eSA6IFwib25Mb3NlQ29udHJvbGxlZEVudGl0eVwiLFxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlbDmja7kuIvovb3nm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0Ly8gU3RhcnQgZG93bmxvYWRpbmcgZGF0YS5cclxuXHQvLyA8cGFyYT4gcGFyYW0xKHVpbnQxNik6IHJlc291Y2UgaWQ8L3BhcmE+XHJcblx0Ly8gPHBhcmE+IHBhcmFtMih1aW50MzIpOiBkYXRhIHNpemU8L3BhcmE+XHJcblx0Ly8gPHBhcmE+IHBhcmFtMyhzdHJpbmcpOiBkZXNjcmlwdGlvbjwvcGFyYT5cclxuXHRvblN0cmVhbURhdGFTdGFydGVkIDogXCJvblN0cmVhbURhdGFTdGFydGVkXCIsXHJcblxyXG5cdC8vIFJlY2VpdmUgZGF0YS5cclxuXHQvLyA8cGFyYT4gcGFyYW0xKHVpbnQxNik6IHJlc291Y2UgaWQ8L3BhcmE+XHJcblx0Ly8gPHBhcmE+IHBhcmFtMihieXRlcyk6IGRhdGFzPC9wYXJhPlxyXG5cdG9uU3RyZWFtRGF0YVJlY3YgOiBcIm9uU3RyZWFtRGF0YVJlY3ZcIixcclxuXHJcblx0Ly8gVGhlIGRvd25sb2FkZWQgZGF0YSBpcyBjb21wbGV0ZWQuXHJcblx0Ly8gPHBhcmE+IHBhcmFtMSh1aW50MTYpOiByZXNvdWNlIGlkPC9wYXJhPlxyXG5cdG9uU3RyZWFtRGF0YUNvbXBsZXRlZCA6IFwib25TdHJlYW1EYXRhQ29tcGxldGVkXCIsXHJcbn1cclxuXHJcbktCRW5naW5lLktCRW5naW5lQXBwID0gZnVuY3Rpb24oa2JlbmdpbmVBcmdzKVxyXG57XHJcblx0Y29uc29sZS5hc3NlcnQoS0JFbmdpbmUuYXBwID09IG51bGwgfHwgS0JFbmdpbmUuYXBwID09IHVuZGVmaW5lZCwgXCJBc3NlcnRpb24gb2YgS0JFbmdpbmUuYXBwIG5vdCBpcyBudWxsXCIpO1xyXG5cdFxyXG5cdEtCRW5naW5lLmFwcCA9IHRoaXM7XHJcblx0XHJcblx0dGhpcy5hcmdzID0ga2JlbmdpbmVBcmdzO1xyXG5cdFxyXG5cdHRoaXMudXNlcm5hbWUgPSBcInRlc3RodG1sNTFcIjtcclxuXHR0aGlzLnBhc3N3b3JkID0gXCIxMjM0NTZcIjtcclxuXHR0aGlzLmNsaWVudGRhdGFzID0gXCJcIjtcclxuXHR0aGlzLmVuY3J5cHRlZEtleSA9IFwiXCI7XHJcblx0XHJcblx0dGhpcy5sb2dpbmFwcE1lc3NhZ2VJbXBvcnRlZCA9IGZhbHNlO1xyXG5cdHRoaXMuYmFzZWFwcE1lc3NhZ2VJbXBvcnRlZCA9IGZhbHNlO1xyXG5cdHRoaXMuc2VydmVyRXJyb3JzRGVzY3JJbXBvcnRlZCA9IGZhbHNlO1xyXG5cdHRoaXMuZW50aXR5ZGVmSW1wb3J0ZWQgPSBmYWxzZTtcclxuXHRcclxuXHRLQkVuZ2luZS5nZXRTaW5nbGV0b24gPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5hc3NlcnQoS0JFbmdpbmUuYXBwICE9IHVuZGVmaW5lZCwgXCJLQkVuZ2luZUFwcCBpcyBudWxsXCIpO1xyXG5cdFx0cmV0dXJuIEtCRW5naW5lLmFwcDtcclxuXHR9XHJcblxyXG5cdC8vIOaPj+i/sOacjeWKoeerr+i/lOWbnueahOmUmeivr+S/oeaBr1xyXG5cdEtCRW5naW5lLlNlcnZlckVyciA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLm5hbWUgPSBcIlwiO1xyXG5cdFx0dGhpcy5kZXNjciA9IFwiXCI7XHJcblx0XHR0aGlzLmlkID0gMDtcclxuXHR9XHJcblxyXG5cdHRoaXMuc2VydmVyRXJycyA9IHt9O1xyXG5cdFx0XHJcblx0Ly8g55m75b2VbG9naW5hcHDnmoTlnLDlnYBcclxuXHR0aGlzLmlwID0gdGhpcy5hcmdzLmlwO1xyXG5cdHRoaXMucG9ydCA9IHRoaXMuYXJncy5wb3J0O1xyXG5cdHRoaXMuaXNXc3MgPSB0aGlzLmFyZ3MuaXNXc3M7XHJcblx0dGhpcy5wcm90b2NvbCA9IHRoaXMuaXNXc3MgPyBcIndzczovL1wiIDogXCJ3czovL1wiO1xyXG5cdFxyXG5cdC8vIOacjeWKoeerr+WIhumFjeeahGJhc2VhcHDlnLDlnYBcclxuXHR0aGlzLmJhc2VhcHBJUCA9IFwiXCI7XHJcblx0dGhpcy5iYXNlYXBwUG9ydCA9IDA7XHJcblxyXG5cdHRoaXMuY3Vyck1zZ0lEID0gMDtcclxuXHR0aGlzLmN1cnJNc2dDb3VudCA9IDA7XHJcblx0dGhpcy5jdXJyTXNnTGVuID0gMDtcclxuXHRcclxuXHRLQkVuZ2luZS5GcmFnbWVudERhdGFUeXBlcyA9IFxyXG5cdHtcclxuXHRcdEZSQUdNRU5UX0RBVEFfVU5LTk9XIDogMCxcclxuXHRcdEZSQUdNRU5UX0RBVEFfTUVTU0FHRV9JRCA6IDEsXHJcblx0XHRGUkFHTUVOVF9EQVRBX01FU1NBR0VfTEVOR1RIIDogMixcclxuXHRcdEZSQUdNRU5UX0RBVEFfTUVTU0FHRV9MRU5HVEgxIDogMyxcclxuXHRcdEZSQUdNRU5UX0RBVEFfTUVTU0FHRV9CT0RZIDogNFxyXG5cdH07XHJcblxyXG5cdHRoaXMuZnJhZ21lbnRTdHJlYW0gPSBudWxsO1xyXG5cdHRoaXMuZnJhZ21lbnREYXRhc0ZsYWcgPSBLQkVuZ2luZS5GcmFnbWVudERhdGFUeXBlcy5GUkFHTUVOVF9EQVRBX1VOS05PVztcclxuXHR0aGlzLmZyYWdtZW50RGF0YXNSZW1haW4gPSAwO1xyXG5cclxuXHR0aGlzLnJlc2V0U29ja2V0ID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHRyeVxyXG5cdFx0eyAgXHJcblx0XHRcdGlmKEtCRW5naW5lLmFwcC5zb2NrZXQgIT0gdW5kZWZpbmVkICYmIEtCRW5naW5lLmFwcC5zb2NrZXQgIT0gbnVsbClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBzb2NrID0gS0JFbmdpbmUuYXBwLnNvY2tldDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzb2NrLm9ub3BlbiA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRzb2NrLm9uZXJyb3IgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0c29jay5vbm1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0c29jay5vbmNsb3NlID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5zb2NrZXQgPSBudWxsO1xyXG5cdFx0XHRcdHNvY2suY2xvc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2goZSlcclxuXHRcdHsgXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMucmVzZXQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0aWYoS0JFbmdpbmUuYXBwLmVudGl0aWVzICE9IHVuZGVmaW5lZCAmJiBLQkVuZ2luZS5hcHAuZW50aXRpZXMgIT0gbnVsbClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmNsZWFyRW50aXRpZXModHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5yZXNldFNvY2tldCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuY3VycnNlcnZlciA9IFwibG9naW5hcHBcIjtcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyc3RhdGUgPSBcImNyZWF0ZVwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmN1cnJjb25uZWN0ID0gXCJsb2dpbmFwcFwiO1xyXG5cclxuXHRcdC8vIOaJqeWxleaVsOaNrlxyXG5cdFx0S0JFbmdpbmUuYXBwLnNlcnZlcmRhdGFzID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0Ly8g54mI5pys5L+h5oGvXHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyVmVyc2lvbiA9IFwiXCI7XHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyU2NyaXB0VmVyc2lvbiA9IFwiXCI7XHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyUHJvdG9jb2xNRDUgPSBcIlwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNlcnZlckVudGl0eURlZk1ENSA9IFwiXCI7XHJcblx0XHRLQkVuZ2luZS5hcHAuY2xpZW50VmVyc2lvbiA9IFwiMS4yLjdcIjtcclxuXHRcdC8vS0JFbmdpbmUuYXBwLmNsaWVudFZlcnNpb24gPSBcIjEuMi4xMFwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmNsaWVudFNjcmlwdFZlcnNpb24gPSBcIjAuMS4wXCI7XHJcblx0XHRcclxuXHRcdC8vIHBsYXllcueahOebuOWFs+S/oeaBr1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0eV91dWlkID0gbnVsbDtcclxuXHRcdEtCRW5naW5lLmFwcC5lbnRpdHlfaWQgPSAwO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0eV90eXBlID0gXCJcIjtcclxuXHJcblx0XHQvLyDov5nkuKrlj4LmlbDnmoTpgInmi6nlv4XpobvkuI5rYmVuZ2luZV9kZWZzLnhtbDo6Y2VsbGFwcC9hbGlhc0VudGl0eUlE55qE5Y+C5pWw5L+d5oyB5LiA6Ie0XHJcblx0XHRLQkVuZ2luZS5hcHAudXNlQWxpYXNFbnRpdHlJRCA9IHRydWU7XHJcblxyXG5cdFx0Ly8g5b2T5YmN546p5a625pyA5ZCO5LiA5qyh5ZCM5q2l5Yiw5pyN5Yqh56uv55qE5L2N572u5LiO5pyd5ZCR5LiO5pyN5Yqh56uv5pyA5ZCO5LiA5qyh5ZCM5q2l6L+H5p2l55qE5L2N572uXHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zID0gbmV3IEtCRW5naW5lLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCk7XHJcblx0XHRcclxuXHRcdC8vIOWuouaIt+err+aJgOacieeahOWunuS9k1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0aWVzID0ge307XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5SURBbGlhc0lETGlzdCA9IFtdO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmNvbnRyb2xsZWRFbnRpdGllcyA9IFtdO1xyXG5cclxuXHRcdC8vIOepuumXtOeahOS/oeaBr1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNwYWNlZGF0YSA9IHt9O1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNwYWNlSUQgPSAwO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNwYWNlUmVzUGF0aCA9IFwiXCI7XHJcblx0XHRLQkVuZ2luZS5hcHAuaXNMb2FkZWRHZW9tZXRyeSA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHR2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAubGFzdFRpY2tUaW1lID0gZGF0ZU9iamVjdC5nZXRUaW1lKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAubGFzdFRpY2tDQlRpbWUgPSBkYXRlT2JqZWN0LmdldFRpbWUoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUubWFwcGluZ0RhdGFUeXBlKCk7XHJcblx0XHRcclxuXHRcdC8vIOW9k+WJjee7hOS7tuexu+WIq++8jCDphY3lpZfmnI3liqHnq6/kvZPns7tcclxuXHRcdEtCRW5naW5lLmFwcC5jb21wb25lbnQgPSBcImNsaWVudFwiO1xyXG5cdH1cclxuXHJcblx0dGhpcy5pbnN0YWxsRXZlbnRzID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMuY3JlYXRlQWNjb3VudCwgS0JFbmdpbmUuYXBwLCBcImNyZWF0ZUFjY291bnRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihLQkVuZ2luZS5FdmVudFR5cGVzLmxvZ2luLCBLQkVuZ2luZS5hcHAsIFwibG9naW5cIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihLQkVuZ2luZS5FdmVudFR5cGVzLmxvZ291dCwgS0JFbmdpbmUuYXBwLCBcImxvZ291dFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMucmVsb2dpbkJhc2VhcHAsIEtCRW5naW5lLmFwcCwgXCJyZWxvZ2luQmFzZWFwcFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMuYmluZEFjY291bnRFbWFpbCwgS0JFbmdpbmUuYXBwLCBcImJpbmRBY2NvdW50RW1haWxcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihLQkVuZ2luZS5FdmVudFR5cGVzLm5ld1Bhc3N3b3JkLCBLQkVuZ2luZS5hcHAsIFwibmV3UGFzc3dvcmRcIik7XHJcblx0fVxyXG5cclxuXHR0aGlzLnVuaW5zdGFsbEV2ZW50cyA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMuY3JlYXRlQWNjb3VudCwgS0JFbmdpbmUuYXBwKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoS0JFbmdpbmUuRXZlbnRUeXBlcy5sb2dpbiwgS0JFbmdpbmUuYXBwKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoS0JFbmdpbmUuRXZlbnRUeXBlcy5sb2dvdXQsIEtCRW5naW5lLmFwcCk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMucmVsb2dpbkJhc2VhcHAsIEtCRW5naW5lLmFwcCk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKEtCRW5naW5lLkV2ZW50VHlwZXMuYmluZEFjY291bnRFbWFpbCwgS0JFbmdpbmUuYXBwKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoS0JFbmdpbmUuRXZlbnRUeXBlcy5uZXdQYXNzd29yZCwgS0JFbmdpbmUuYXBwKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5oZWxsbyA9IGZ1bmN0aW9uKClcclxuXHR7ICBcclxuXHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcclxuXHRcdGlmKEtCRW5naW5lLmFwcC5jdXJyc2VydmVyID09IFwibG9naW5hcHBcIilcclxuXHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuTG9naW5hcHBfaGVsbG8pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX2hlbGxvKTtcclxuXHRcdFxyXG5cdFx0YnVuZGxlLndyaXRlU3RyaW5nKEtCRW5naW5lLmFwcC5jbGllbnRWZXJzaW9uKTtcclxuXHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAuY2xpZW50U2NyaXB0VmVyc2lvbik7XHJcblx0XHRidW5kbGUud3JpdGVCbG9iKEtCRW5naW5lLmFwcC5lbmNyeXB0ZWRLZXkpO1xyXG5cdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHR9XHJcblxyXG5cdHRoaXMucGxheWVyID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHJldHVybiBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07XHJcblx0fVxyXG5cclxuXHR0aGlzLmZpbmRFbnRpdHkgPSBmdW5jdGlvbihlbnRpdHlJRClcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VudGl0eUlEXTtcclxuXHR9XHJcblx0XHRcclxuXHR0aGlzLmNvbm5lY3QgPSBmdW5jdGlvbihhZGRyKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUuYXNzZXJ0KEtCRW5naW5lLmFwcC5zb2NrZXQgPT0gbnVsbCwgXCJBc3NlcnRpb24gb2Ygc29ja2V0IG5vdCBpcyBudWxsXCIpO1xyXG5cdFx0XHJcblx0XHR0cnlcclxuXHRcdHsgIFxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuc29ja2V0ID0gbmV3IFdlYlNvY2tldChhZGRyKTsgIFxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2goZSlcclxuXHRcdHsgIFxyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coJ1dlYlNvY2tldCBpbml0IGVycm9yKCcgKyBlLnRvU3RyaW5nKCkgKyAnKSEnKTsgXHJcblx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkNvbm5lY3Rpb25TdGF0ZTIsIGZhbHNlKTtcclxuXHRcdFx0cmV0dXJuOyAgXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5zb2NrZXQuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuXHRcdEtCRW5naW5lLmFwcC5zb2NrZXQub25vcGVuID0gS0JFbmdpbmUuYXBwLm9ub3BlbjsgIFxyXG5cdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbmVycm9yID0gS0JFbmdpbmUuYXBwLm9uZXJyb3JfYmVmb3JlX29ub3BlbjsgIFxyXG5cdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm1lc3NhZ2UgPSBLQkVuZ2luZS5hcHAub25tZXNzYWdlOyAgXHJcblx0XHRLQkVuZ2luZS5hcHAuc29ja2V0Lm9uY2xvc2UgPSBLQkVuZ2luZS5hcHAub25jbG9zZTtcclxuXHR9XHJcblxyXG5cdHRoaXMuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAucmVzZXRTb2NrZXQoKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5vbm9wZW4gPSBmdW5jdGlvbigpXHJcblx0eyAgXHJcblx0XHRLQkVuZ2luZS5JTkZPX01TRygnY29ubmVjdCBzdWNjZXNzIScpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbmVycm9yID0gS0JFbmdpbmUuYXBwLm9uZXJyb3JfYWZ0ZXJfb25vcGVuO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uQ29ubmVjdGlvblN0YXRlLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdHRoaXMub25lcnJvcl9iZWZvcmVfb25vcGVuID0gZnVuY3Rpb24oZXZ0KVxyXG5cdHsgIFxyXG5cdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdvbmVycm9yX2JlZm9yZV9vbm9wZW4gZXJyb3I6JyArIGV2dC5kYXRhKTtcclxuXHRcdEtCRW5naW5lLmFwcC5yZXNldFNvY2tldCgpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uQ29ubmVjdGlvblN0YXRlLCBmYWxzZSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMub25lcnJvcl9hZnRlcl9vbm9wZW4gPSBmdW5jdGlvbihldnQpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuRVJST1JfTVNHKCdvbmVycm9yX2FmdGVyX29ub3BlbiBlcnJvcjonICsgZXZ0LmRhdGEpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnJlc2V0U29ja2V0KCk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25EaXNjb25uZWN0ZWQpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1zZylcclxuXHR7IFxyXG5cdFx0dmFyIHN0cmVhbSA9IG5ldyBLQkVuZ2luZS5NZW1vcnlTdHJlYW0obXNnLmRhdGEpO1xyXG5cdFx0c3RyZWFtLndwb3MgPSBtc2cuZGF0YS5ieXRlTGVuZ3RoO1xyXG5cdFx0dmFyIGFwcCA9ICBLQkVuZ2luZS5hcHA7XHJcblx0XHR2YXIgRnJhZ21lbnREYXRhVHlwZXMgPSBLQkVuZ2luZS5GcmFnbWVudERhdGFUeXBlcztcclxuXHJcblx0XHR3aGlsZShzdHJlYW0ubGVuZ3RoKCkgPiAwIHx8IGFwcC5mcmFnbWVudFN0cmVhbSAhPSBudWxsKVxyXG5cdFx0e1xyXG5cdFx0XHRpZihhcHAuZnJhZ21lbnREYXRhc0ZsYWcgPT0gRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9VTktOT1cpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZihhcHAuY3Vyck1zZ0lEID09IDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWYoS0JFbmdpbmUuTUVTU0FHRV9JRF9MRU5HVEggPiAxICYmIHN0cmVhbS5sZW5ndGgoKSA8IEtCRW5naW5lLk1FU1NBR0VfSURfTEVOR1RIKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRhcHAud3JpdGVGcmFnbWVudE1lc3NhZ2UoRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9NRVNTQUdFX0lELCBzdHJlYW0sIEtCRW5naW5lLk1FU1NBR0VfSURfTEVOR1RIKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YXBwLmN1cnJNc2dJRCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIG1zZ0hhbmRsZXIgPSBLQkVuZ2luZS5jbGllbnRtZXNzYWdlc1thcHAuY3Vyck1zZ0lEXTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZighbXNnSGFuZGxlcilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhcHAuY3Vyck1zZ0lEID0gMDtcclxuXHRcdFx0XHRcdGFwcC5jdXJyTXNnTGVuID0gMDtcclxuXHRcdFx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpvbm1lc3NhZ2VbXCIgKyBhcHAuY3VycnNlcnZlciArIFwiXTogbm90IGZvdW5kIG1zZyhcIiArIGFwcC5jdXJyTXNnSUQgKyBcIikhXCIpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihhcHAuY3Vyck1zZ0xlbiA9PSAwKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHZhciBtc2dsZW4gPSBtc2dIYW5kbGVyLmxlbmd0aDtcclxuXHRcdFx0XHRcdGlmKG1zZ2xlbiA9PSAtMSlcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0aWYoc3RyZWFtLmxlbmd0aCgpIDwgS0JFbmdpbmUuTUVTU0FHRV9MRU5HVEhfTEVOR1RIKVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0YXBwLndyaXRlRnJhZ21lbnRNZXNzYWdlKEZyYWdtZW50RGF0YVR5cGVzLkZSQUdNRU5UX0RBVEFfTUVTU0FHRV9MRU5HVEgsIHN0cmVhbSwgS0JFbmdpbmUuTUVTU0FHRV9MRU5HVEhfTEVOR1RIKTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRtc2dsZW4gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHRcdFx0XHRcdGFwcC5jdXJyTXNnTGVuID0gbXNnbGVuO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyDmianlsZXplb/luqZcclxuXHRcdFx0XHRcdFx0XHRpZihtc2dsZW4gPT0gS0JFbmdpbmUuTUVTU0FHRV9NQVhfU0laRSlcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihzdHJlYW0ubGVuZ3RoKCkgPCBLQkVuZ2luZS5NRVNTQUdFX0xFTkdUSDFfTEVOR1RIKVxyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRhcHAud3JpdGVGcmFnbWVudE1lc3NhZ2UoRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9NRVNTQUdFX0xFTkdUSDEsIHN0cmVhbSwgS0JFbmdpbmUuTUVTU0FHRV9MRU5HVEgxX0xFTkdUSCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGFwcC5jdXJyTXNnTGVuID0gc3RyZWFtLnJlYWRVaW50MzIoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0YXBwLmN1cnJNc2dMZW4gPSBtc2dsZW47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihhcHAuZnJhZ21lbnRTdHJlYW0gIT0gbnVsbCAmJiBhcHAuZnJhZ21lbnRTdHJlYW0ubGVuZ3RoKCkgPj0gYXBwLmN1cnJNc2dMZW4pXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bXNnSGFuZGxlci5oYW5kbGVNZXNzYWdlKGFwcC5mcmFnbWVudFN0cmVhbSk7XHJcblx0XHRcdFx0XHRhcHAuZnJhZ21lbnRTdHJlYW0gPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHN0cmVhbS5sZW5ndGgoKSA8IGFwcC5jdXJyTXNnTGVuICYmIHN0cmVhbS5sZW5ndGgoKSA+IDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YXBwLndyaXRlRnJhZ21lbnRNZXNzYWdlKEZyYWdtZW50RGF0YVR5cGVzLkZSQUdNRU5UX0RBVEFfTUVTU0FHRV9CT0RZLCBzdHJlYW0sIGFwcC5jdXJyTXNnTGVuKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dmFyIHdwb3MgPSBzdHJlYW0ud3BvcztcclxuXHRcdFx0XHRcdHZhciBycG9zID0gc3RyZWFtLnJwb3MgKyBtc2dsZW47XHJcblx0XHRcdFx0XHRzdHJlYW0ud3BvcyA9IHJwb3M7XHJcblx0XHRcdFx0XHRtc2dIYW5kbGVyLmhhbmRsZU1lc3NhZ2Uoc3RyZWFtKTtcclxuXHRcdFx0XHRcdHN0cmVhbS53cG9zID0gd3BvcztcclxuXHRcdFx0XHRcdHN0cmVhbS5ycG9zID0gcnBvcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGFwcC5jdXJyTXNnSUQgPSAwO1xyXG5cdFx0XHRcdGFwcC5jdXJyTXNnTGVuID0gMDtcclxuXHRcdFx0XHRhcHAuZnJhZ21lbnRTdHJlYW0gPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmKGFwcC5tZXJnZUZyYWdtZW50TWVzc2FnZShzdHJlYW0pKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9ICBcclxuXHJcblx0dGhpcy53cml0ZUZyYWdtZW50TWVzc2FnZSA9IGZ1bmN0aW9uKEZyYWdtZW50RGF0YVR5cGUsIHN0cmVhbSwgZGF0YXNpemUpXHJcblx0e1xyXG5cdFx0aWYoIShzdHJlYW0gaW5zdGFuY2VvZiBLQkVuZ2luZS5NZW1vcnlTdHJlYW0pKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJ3cml0ZUZyYWdtZW50TWVzc2FnZSgpOiBzdHJlYW0gbXVzdCBiZSBNZW1vcnlTdHJlYW0gaW5zdGFuY2VzIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBhcHAgPSBLQkVuZ2luZS5hcHA7XHJcblx0XHR2YXIgb3BzaXplID0gc3RyZWFtLmxlbmd0aCgpO1xyXG5cdFx0XHJcblx0XHRhcHAuZnJhZ21lbnREYXRhc1JlbWFpbiA9IGRhdGFzaXplIC0gb3BzaXplO1xyXG5cdFx0YXBwLmZyYWdtZW50RGF0YXNGbGFnID0gRnJhZ21lbnREYXRhVHlwZTtcclxuXHRcdGFwcC5mcmFnbWVudFN0cmVhbSA9IHN0cmVhbTtcclxuXHR9XHJcblxyXG5cdHRoaXMubWVyZ2VGcmFnbWVudE1lc3NhZ2UgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0aWYoIShzdHJlYW0gaW5zdGFuY2VvZiBLQkVuZ2luZS5NZW1vcnlTdHJlYW0pKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJtZXJnZUZyYWdtZW50TWVzc2FnZSgpOiBzdHJlYW0gbXVzdCBiZSBNZW1vcnlTdHJlYW0gaW5zdGFuY2VzIVwiKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvcHNpemUgPSBzdHJlYW0ubGVuZ3RoKCk7XHJcblx0XHRpZihvcHNpemUgPT0gMClcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHZhciBhcHAgPSBLQkVuZ2luZS5hcHA7XHJcblx0XHR2YXIgZnJhZ21lbnRTdHJlYW0gPSBhcHAuZnJhZ21lbnRTdHJlYW07XHJcblx0XHRjb25zb2xlLmFzc2VydChmcmFnbWVudFN0cmVhbSAhPSBudWxsKTtcclxuXHJcblx0XHRpZihvcHNpemUgPj0gYXBwLmZyYWdtZW50RGF0YXNSZW1haW4pXHJcblx0XHR7XHJcblx0XHRcdHZhciBGcmFnbWVudERhdGFUeXBlcyA9IEtCRW5naW5lLkZyYWdtZW50RGF0YVR5cGVzO1xyXG5cdFx0XHRmcmFnbWVudFN0cmVhbS5hcHBlbmQoc3RyZWFtLCBzdHJlYW0ucnBvcywgYXBwLmZyYWdtZW50RGF0YXNSZW1haW4pO1xyXG5cclxuXHRcdFx0c3dpdGNoKGFwcC5mcmFnbWVudERhdGFzRmxhZylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9NRVNTQUdFX0lEOlxyXG5cdFx0XHRcdFx0YXBwLmN1cnJNc2dJRCA9IGZyYWdtZW50U3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0XHRcdGFwcC5mcmFnbWVudFN0cmVhbSA9IG51bGw7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBGcmFnbWVudERhdGFUeXBlcy5GUkFHTUVOVF9EQVRBX01FU1NBR0VfTEVOR1RIOlxyXG5cdFx0XHRcdFx0YXBwLmN1cnJNc2dMZW4gPSBmcmFnbWVudFN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHRcdFx0XHRhcHAuZnJhZ21lbnRTdHJlYW0gPSBudWxsO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9NRVNTQUdFX0xFTkdUSDE6XHJcblx0XHRcdFx0XHRhcHAuY3Vyck1zZ0xlbiA9IGZyYWdtZW50U3RyZWFtLnJlYWRVaW50MzIoKTtcclxuXHRcdFx0XHRcdGFwcC5mcmFnbWVudFN0cmVhbSA9IG51bGw7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBGcmFnbWVudERhdGFUeXBlcy5GUkFHTUVOVF9EQVRBX01FU1NBR0VfQk9EWTpcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN0cmVhbS5ycG9zICs9IGFwcC5mcmFnbWVudERhdGFzUmVtYWluO1xyXG5cdFx0XHRhcHAuZnJhZ21lbnREYXRhc0ZsYWcgPSBGcmFnbWVudERhdGFUeXBlcy5GUkFHTUVOVF9EQVRBX1VOS05PVztcclxuXHRcdFx0YXBwLmZyYWdtZW50RGF0YXNSZW1haW4gPSAwO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdGZyYWdtZW50U3RyZWFtLmFwcGVuZChzdHJlYW0sIHN0cmVhbS5ycG9zLCBvcHNpemUpO1xyXG5cdFx0XHRhcHAuZnJhZ21lbnREYXRhc1JlbWFpbiAtPSBvcHNpemU7XHJcblx0XHRcdHN0cmVhbS5kb25lKCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy5vbmNsb3NlID0gZnVuY3Rpb24oKVxyXG5cdHsgIFxyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coJ2Nvbm5lY3QgY2xvc2U6JyArIEtCRW5naW5lLmFwcC5jdXJyc2VydmVyKTtcclxuXHJcblx0XHRpZihLQkVuZ2luZS5hcHAuY3VycmNvbm5lY3QgIT0gS0JFbmdpbmUuYXBwLmN1cnJzZXJ2ZXIpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcdFxyXG5cclxuXHRcdEtCRW5naW5lLmFwcC5yZXNldFNvY2tldCgpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uRGlzY29ubmVjdGVkKTtcclxuXHRcdC8vaWYoS0JFbmdpbmUuYXBwLmN1cnJzZXJ2ZXIgIT0gXCJsb2dpbmFwcFwiKVxyXG5cdFx0Ly9cdEtCRW5naW5lLmFwcC5yZXNldCgpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5zZW5kID0gZnVuY3Rpb24obXNnKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLmFwcC5zb2NrZXQuc2VuZChtc2cpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coJ0tCRW5naW5lOjpjbG9zZSgpJyk7XHJcblx0XHRLQkVuZ2luZS5hcHAuc29ja2V0LmNsb3NlKCk7ICBcclxuXHRcdEtCRW5naW5lLmFwcC5yZXNldCgpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRpZihLQkVuZ2luZS5hcHAuc29ja2V0ID09IG51bGwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XHJcblx0XHRpZigoZGF0ZU9iamVjdC5nZXRUaW1lKCkgLSBLQkVuZ2luZS5hcHAubGFzdFRpY2tUaW1lKSAvIDEwMDAgPiAoS0JFbmdpbmUuYXBwLmFyZ3Muc2VydmVySGVhcnRiZWF0VGljayAvIDIpKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyDlpoLmnpzlv4Pot7Plm57osIPmjqXmlLbml7bpl7TlsI/kuo7lv4Pot7Plj5HpgIHml7bpl7TvvIzor7TmmI7msqHmnInmlLbliLDlm57osINcclxuXHRcdFx0Ly8g5q2k5pe25bqU6K+l6YCa55+l5a6i5oi356uv5o6J57q/5LqGXHJcblx0XHRcdGlmKEtCRW5naW5lLmFwcC5sYXN0VGlja0NCVGltZSA8IEtCRW5naW5lLmFwcC5sYXN0VGlja1RpbWUpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJzZW5kVGljazogUmVjZWl2ZSBhcHBUaWNrIHRpbWVvdXQhXCIpO1xyXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5yZXNldFNvY2tldCgpO1xyXG5cdFx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkRpc2Nvbm5lY3RlZCk7XHJcblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5jbG9zZSgpOyBcclxuXHRcdFx0XHRyZXR1cm47IFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihLQkVuZ2luZS5hcHAuY3VycnNlcnZlciA9PSBcImxvZ2luYXBwXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZihLQkVuZ2luZS5tZXNzYWdlcy5Mb2dpbmFwcF9vbkNsaWVudEFjdGl2ZVRpY2sgIT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5Mb2dpbmFwcF9vbkNsaWVudEFjdGl2ZVRpY2spO1xyXG5cdFx0XHRcdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9vbkNsaWVudEFjdGl2ZVRpY2sgIT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX29uQ2xpZW50QWN0aXZlVGljayk7XHJcblx0XHRcdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmxhc3RUaWNrVGltZSA9IGRhdGVPYmplY3QuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAudXBkYXRlUGxheWVyVG9TZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qXHJcblx0XHTmnI3liqHlmajlv4Pot7Plm57osINcclxuXHQqL1xyXG5cdHRoaXMuQ2xpZW50X29uQXBwQWN0aXZlVGlja0NCID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBkYXRlT2JqZWN0ID0gbmV3IERhdGUoKTtcclxuXHRcdEtCRW5naW5lLmFwcC5sYXN0VGlja0NCVGltZSA9IGRhdGVPYmplY3QuZ2V0VGltZSgpO1xyXG5cdH1cclxuXHJcblx0LypcclxuXHRcdOmAmui/h+mUmeivr2lk5b6X5Yiw6ZSZ6K+v5o+P6L+wXHJcblx0Ki9cclxuXHR0aGlzLnNlcnZlckVyciA9IGZ1bmN0aW9uKGlkKVxyXG5cdHtcclxuXHRcdHZhciBlID0gS0JFbmdpbmUuYXBwLnNlcnZlckVycnNbaWRdO1xyXG5cdFx0XHJcblx0XHRpZihlID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIFwiXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGUubmFtZSArIFwiIFtcIiArIGUuZGVzY3IgKyBcIl1cIjtcclxuXHR9XHJcblxyXG5cdC8qXHJcblx0XHTmnI3liqHnq6/plJnor6/mj4/ov7Dlr7zlhaXkuoZcclxuXHQqL1xyXG5cdHRoaXMuQ2xpZW50X29uSW1wb3J0U2VydmVyRXJyb3JzRGVzY3IgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIHNpemUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0d2hpbGUoc2l6ZSA+IDApXHJcblx0XHR7XHJcblx0XHRcdHNpemUgLT0gMTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBlID0gbmV3IEtCRW5naW5lLlNlcnZlckVycigpO1xyXG5cdFx0XHRlLmlkID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0ZS5uYW1lID0gS0JFbmdpbmUudXRmOEFycmF5VG9TdHJpbmcoc3RyZWFtLnJlYWRCbG9iKCkpO1xyXG5cdFx0XHRlLmRlc2NyID0gS0JFbmdpbmUudXRmOEFycmF5VG9TdHJpbmcoc3RyZWFtLnJlYWRCbG9iKCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLnNlcnZlckVycnNbZS5pZF0gPSBlO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIkNsaWVudF9vbkltcG9ydFNlcnZlckVycm9yc0Rlc2NyOiBpZD1cIiArIGUuaWQgKyBcIiwgbmFtZT1cIiArIGUubmFtZSArIFwiLCBkZXNjcj1cIiArIGUuZGVzY3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFxyXG5cdHRoaXMub25PcGVuTG9naW5hcHBfbG9naW4gPSBmdW5jdGlvbigpXHJcblx0eyAgXHJcblx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbk9wZW5Mb2dpbmFwcF9sb2dpbjogc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkNvbm5lY3Rpb25TdGF0ZSwgdHJ1ZSk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyc2VydmVyID0gXCJsb2dpbmFwcFwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmN1cnJzdGF0ZSA9IFwibG9naW5cIjtcclxuXHRcdFxyXG5cdFx0aWYoIUtCRW5naW5lLmFwcC5sb2dpbmFwcE1lc3NhZ2VJbXBvcnRlZClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJ1bmRsZSA9IG5ldyBLQkVuZ2luZS5CdW5kbGUoKTtcclxuXHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMpO1xyXG5cdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuc29ja2V0Lm9ubWVzc2FnZSA9IEtCRW5naW5lLmFwcC5DbGllbnRfb25JbXBvcnRDbGllbnRNZXNzYWdlczsgIFxyXG5cdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbk9wZW5Mb2dpbmFwcF9sb2dpbjogc3RhcnQgaW1wb3J0Q2xpZW50TWVzc2FnZXMgLi4uXCIpO1xyXG5cdFx0XHRLQkVuZ2luZS5FdmVudC5maXJlKFwiTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXNcIik7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5vbkltcG9ydENsaWVudE1lc3NhZ2VzQ29tcGxldGVkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMub25PcGVuTG9naW5hcHBfY3JlYXRlQWNjb3VudCA9IGZ1bmN0aW9uKClcclxuXHR7ICBcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkNvbm5lY3Rpb25TdGF0ZSwgdHJ1ZSk7XHJcblx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbk9wZW5Mb2dpbmFwcF9jcmVhdGVBY2NvdW50OiBzdWNjZXNzZnVsbHkhXCIpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmN1cnJzZXJ2ZXIgPSBcImxvZ2luYXBwXCI7XHJcblx0XHRLQkVuZ2luZS5hcHAuY3VycnN0YXRlID0gXCJjcmVhdGVBY2NvdW50XCI7XHJcblx0XHRcclxuXHRcdGlmKCFLQkVuZ2luZS5hcHAubG9naW5hcHBNZXNzYWdlSW1wb3J0ZWQpXHJcblx0XHR7XHJcblx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdGJ1bmRsZS5uZXdNZXNzYWdlKEtCRW5naW5lLm1lc3NhZ2VzLkxvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzKTtcclxuXHRcdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm1lc3NhZ2UgPSBLQkVuZ2luZS5hcHAuQ2xpZW50X29uSW1wb3J0Q2xpZW50TWVzc2FnZXM7ICBcclxuXHRcdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6b25PcGVuTG9naW5hcHBfY3JlYXRlQWNjb3VudDogc3RhcnQgaW1wb3J0Q2xpZW50TWVzc2FnZXMgLi4uXCIpO1xyXG5cdFx0XHRLQkVuZ2luZS5FdmVudC5maXJlKFwiTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXNcIik7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5vbkltcG9ydENsaWVudE1lc3NhZ2VzQ29tcGxldGVkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMub25JbXBvcnRDbGllbnRNZXNzYWdlc0NvbXBsZXRlZCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbkltcG9ydENsaWVudE1lc3NhZ2VzQ29tcGxldGVkOiBzdWNjZXNzZnVsbHkhXCIpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm1lc3NhZ2UgPSBLQkVuZ2luZS5hcHAub25tZXNzYWdlOyBcclxuXHRcdEtCRW5naW5lLmFwcC5oZWxsbygpO1xyXG5cdFx0XHJcblx0XHRpZihLQkVuZ2luZS5hcHAuY3VycnNlcnZlciA9PSBcImxvZ2luYXBwXCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKCFLQkVuZ2luZS5hcHAuc2VydmVyRXJyb3JzRGVzY3JJbXBvcnRlZClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmU6Om9uSW1wb3J0Q2xpZW50TWVzc2FnZXNDb21wbGV0ZWQoKTogc2VuZCBpbXBvcnRTZXJ2ZXJFcnJvcnNEZXNjciFcIik7XHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLnNlcnZlckVycm9yc0Rlc2NySW1wb3J0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuTG9naW5hcHBfaW1wb3J0U2VydmVyRXJyb3JzRGVzY3IpO1xyXG5cdFx0XHRcdGJ1bmRsZS5zZW5kKEtCRW5naW5lLmFwcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0aWYoS0JFbmdpbmUuYXBwLmN1cnJzdGF0ZSA9PSBcImxvZ2luXCIpXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmxvZ2luX2xvZ2luYXBwKGZhbHNlKTtcclxuXHRcdFx0ZWxzZSBpZihLQkVuZ2luZS5hcHAuY3VycnN0YXRlID09IFwicmVzZXRwYXNzd29yZFwiKVxyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5yZXNldHBhc3N3b3JkX2xvZ2luYXBwKGZhbHNlKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5jcmVhdGVBY2NvdW50X2xvZ2luYXBwKGZhbHNlKTtcclxuXHRcdFx0XHJcblx0XHRcdEtCRW5naW5lLmFwcC5sb2dpbmFwcE1lc3NhZ2VJbXBvcnRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5iYXNlYXBwTWVzc2FnZUltcG9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKCFLQkVuZ2luZS5hcHAuZW50aXR5ZGVmSW1wb3J0ZWQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbkltcG9ydENsaWVudE1lc3NhZ2VzQ29tcGxldGVkOiBzdGFydCBpbXBvcnRFbnRpdHlEZWYgLi4uXCIpO1xyXG5cdFx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9pbXBvcnRDbGllbnRFbnRpdHlEZWYpO1xyXG5cdFx0XHRcdGJ1bmRsZS5zZW5kKEtCRW5naW5lLmFwcCk7XHJcblx0XHRcdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShcIkJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5vbkltcG9ydEVudGl0eURlZkNvbXBsZXRlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLmNyZWF0ZURhdGFUeXBlRnJvbVN0cmVhbXMgPSBmdW5jdGlvbihzdHJlYW0sIGNhbnByaW50KVxyXG5cdHtcclxuXHRcdHZhciBhbGlhc3NpemUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Y3JlYXRlRGF0YVR5cGVGcm9tU3RyZWFtczogaW1wb3J0QWxpYXMoc2l6ZT1cIiArIGFsaWFzc2l6ZSArIFwiKSFcIik7XHJcblx0XHRcclxuXHRcdHdoaWxlKGFsaWFzc2l6ZSA+IDApXHJcblx0XHR7XHJcblx0XHRcdGFsaWFzc2l6ZS0tO1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuY3JlYXRlRGF0YVR5cGVGcm9tU3RyZWFtKHN0cmVhbSwgY2FucHJpbnQpO1xyXG5cdFx0fTtcdFxyXG5cdFx0XHJcblx0XHRmb3IodmFyIGRhdGF0eXBlIGluIEtCRW5naW5lLmRhdGF0eXBlcylcclxuXHRcdHtcclxuXHRcdFx0aWYoS0JFbmdpbmUuZGF0YXR5cGVzW2RhdGF0eXBlXSAhPSB1bmRlZmluZWQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRLQkVuZ2luZS5kYXRhdHlwZXNbZGF0YXR5cGVdLmJpbmQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy5jcmVhdGVEYXRhVHlwZUZyb21TdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0sIGNhbnByaW50KVxyXG5cdHtcclxuXHRcdHZhciB1dHlwZSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHR2YXIgbmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHR2YXIgdmFsbmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcclxuXHRcdC8qIOacieS4gOS6m+WMv+WQjeexu+Wei++8jOaIkeS7rOmcgOimgeaPkOS+m+S4gOS4quWUr+S4gOWQjeensOaUvuWIsGRhdGF0eXBlc+S4rVxyXG5cdFx0XHTlpoLvvJpcclxuXHRcdFx0PG9uUmVtb3ZlQXZhdGFyPlxyXG5cdFx0XHRcdDxBcmc+XHRBUlJBWSA8b2Y+IElOVDggPC9vZj5cdFx0PC9Bcmc+XHJcblx0XHRcdDwvb25SZW1vdmVBdmF0YXI+XHRcdFx0XHRcclxuXHRcdCovXHJcblx0XHRpZih2YWxuYW1lLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHR2YWxuYW1lID0gXCJOdWxsX1wiICsgdXR5cGU7XHJcblx0XHRcdFxyXG5cdFx0aWYoY2FucHJpbnQpXHJcblx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkltcG9ydENsaWVudEVudGl0eURlZjogaW1wb3J0QWxpYXMoXCIgKyBuYW1lICsgXCI6XCIgKyB2YWxuYW1lICsgXCIpIVwiKTtcclxuXHRcdFxyXG5cdFx0aWYobmFtZSA9PSBcIkZJWEVEX0RJQ1RcIilcclxuXHRcdHtcclxuXHRcdFx0dmFyIGRhdGF0eXBlID0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0ZJWEVEX0RJQ1QoKTtcclxuXHRcdFx0dmFyIGtleXNpemUgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XHJcblx0XHRcdGRhdGF0eXBlLmltcGxlbWVudGVkQnkgPSBzdHJlYW0ucmVhZFN0cmluZygpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR3aGlsZShrZXlzaXplID4gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleXNpemUtLTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIga2V5bmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcdFx0dmFyIGtleXV0eXBlID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0XHRkYXRhdHlwZS5kaWN0dHlwZVtrZXluYW1lXSA9IGtleXV0eXBlO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuZGF0YXR5cGVzW3ZhbG5hbWVdID0gZGF0YXR5cGU7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKG5hbWUgPT0gXCJBUlJBWVwiKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgdWl0ZW10eXBlID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0dmFyIGRhdGF0eXBlID0gbmV3IEtCRW5naW5lLkRBVEFUWVBFX0FSUkFZKCk7XHJcblx0XHRcdGRhdGF0eXBlLnR5cGUgPSB1aXRlbXR5cGU7XHJcblx0XHRcdEtCRW5naW5lLmRhdGF0eXBlc1t2YWxuYW1lXSA9IGRhdGF0eXBlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5kYXRhdHlwZXNbdmFsbmFtZV0gPSBLQkVuZ2luZS5kYXRhdHlwZXNbbmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0S0JFbmdpbmUuZGF0YXR5cGVzW3V0eXBlXSA9IEtCRW5naW5lLmRhdGF0eXBlc1t2YWxuYW1lXTtcclxuXHRcdFxyXG5cdFx0Ly8g5bCG55So5oi36Ieq5a6a5LmJ55qE57G75Z6L6KGl5YWF5Yiw5pig5bCE6KGo5LitXHJcblx0XHRLQkVuZ2luZS5kYXRhdHlwZTJpZFt2YWxuYW1lXSA9IHV0eXBlO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vbkltcG9ydENsaWVudEVudGl0eURlZiA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuY3JlYXRlRGF0YVR5cGVGcm9tU3RyZWFtcyhzdHJlYW0sIHRydWUpO1xyXG5cdFx0XHJcblx0XHR3aGlsZShzdHJlYW0ubGVuZ3RoKCkgPiAwKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgc2NyaXB0bW9kdWxlX25hbWUgPSBzdHJlYW0ucmVhZFN0cmluZygpO1xyXG5cdFx0XHR2YXIgc2NyaXB0VXR5cGUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHR2YXIgcHJvcGVydHlzaXplID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0dmFyIG1ldGhvZHNpemUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHR2YXIgYmFzZV9tZXRob2RzaXplID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0dmFyIGNlbGxfbWV0aG9kc2l6ZSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25JbXBvcnRDbGllbnRFbnRpdHlEZWY6IGltcG9ydChcIiArIHNjcmlwdG1vZHVsZV9uYW1lICsgXCIpLCBwcm9wZXJ0eXMoXCIgKyBwcm9wZXJ0eXNpemUgKyBcIiksIFwiICtcclxuXHRcdFx0XHRcdFwiY2xpZW50TWV0aG9kcyhcIiArIG1ldGhvZHNpemUgKyBcIiksIGJhc2VNZXRob2RzKFwiICsgYmFzZV9tZXRob2RzaXplICsgXCIpLCBjZWxsTWV0aG9kcyhcIiArIGNlbGxfbWV0aG9kc2l6ZSArIFwiKSFcIik7XHJcblx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5tb2R1bGVkZWZzW3NjcmlwdG1vZHVsZV9uYW1lXSA9IHt9O1xyXG5cdFx0XHR2YXIgY3Vyck1vZHVsZURlZnMgPSBLQkVuZ2luZS5tb2R1bGVkZWZzW3NjcmlwdG1vZHVsZV9uYW1lXTtcclxuXHRcdFx0Y3Vyck1vZHVsZURlZnNbXCJuYW1lXCJdID0gc2NyaXB0bW9kdWxlX25hbWU7XHJcblx0XHRcdGN1cnJNb2R1bGVEZWZzW1wicHJvcGVydHlzXCJdID0ge307XHJcblx0XHRcdGN1cnJNb2R1bGVEZWZzW1wibWV0aG9kc1wiXSA9IHt9O1xyXG5cdFx0XHRjdXJyTW9kdWxlRGVmc1tcImJhc2VfbWV0aG9kc1wiXSA9IHt9O1xyXG5cdFx0XHRjdXJyTW9kdWxlRGVmc1tcImNlbGxfbWV0aG9kc1wiXSA9IHt9O1xyXG5cdFx0XHRLQkVuZ2luZS5tb2R1bGVkZWZzW3NjcmlwdFV0eXBlXSA9IGN1cnJNb2R1bGVEZWZzO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIHNlbGZfcHJvcGVydHlzID0gY3Vyck1vZHVsZURlZnNbXCJwcm9wZXJ0eXNcIl07XHJcblx0XHRcdHZhciBzZWxmX21ldGhvZHMgPSBjdXJyTW9kdWxlRGVmc1tcIm1ldGhvZHNcIl07XHJcblx0XHRcdHZhciBzZWxmX2Jhc2VfbWV0aG9kcyA9IGN1cnJNb2R1bGVEZWZzW1wiYmFzZV9tZXRob2RzXCJdO1xyXG5cdFx0XHR2YXIgc2VsZl9jZWxsX21ldGhvZHMgPSBjdXJyTW9kdWxlRGVmc1tcImNlbGxfbWV0aG9kc1wiXTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBDbGFzcyA9IEtCRW5naW5lW3NjcmlwdG1vZHVsZV9uYW1lXTtcclxuXHRcdFx0XHJcblx0XHRcdHdoaWxlKHByb3BlcnR5c2l6ZSA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRwcm9wZXJ0eXNpemUtLTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgcHJvcGVyVXR5cGUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHRcdHZhciBwcm9wZXJGbGFncyA9IHN0cmVhbS5yZWFkVWludDMyKCk7XHJcblx0XHRcdFx0dmFyIGFsaWFzSUQgPSBzdHJlYW0ucmVhZEludDE2KCk7XHJcblx0XHRcdFx0dmFyIG5hbWUgPSBzdHJlYW0ucmVhZFN0cmluZygpO1xyXG5cdFx0XHRcdHZhciBkZWZhdWx0VmFsU3RyID0gc3RyZWFtLnJlYWRTdHJpbmcoKTtcclxuXHRcdFx0XHR2YXIgdXR5cGUgPSBLQkVuZ2luZS5kYXRhdHlwZXNbc3RyZWFtLnJlYWRVaW50MTYoKV07XHJcblx0XHRcdFx0dmFyIHNldG1ldGhvZCA9IG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoQ2xhc3MgIT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHNldG1ldGhvZCA9IENsYXNzLnByb3RvdHlwZVtcInNldF9cIiArIG5hbWVdO1xyXG5cdFx0XHRcdFx0aWYoc2V0bWV0aG9kID09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFx0c2V0bWV0aG9kID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIHNhdmVkYXRhID0gW3Byb3BlclV0eXBlLCBhbGlhc0lELCBuYW1lLCBkZWZhdWx0VmFsU3RyLCB1dHlwZSwgc2V0bWV0aG9kLCBwcm9wZXJGbGFnc107XHJcblx0XHRcdFx0c2VsZl9wcm9wZXJ0eXNbbmFtZV0gPSBzYXZlZGF0YTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihhbGlhc0lEICE9IC0xKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHNlbGZfcHJvcGVydHlzW2FsaWFzSURdID0gc2F2ZWRhdGE7XHJcblx0XHRcdFx0XHRjdXJyTW9kdWxlRGVmc1tcInVzZVByb3BlcnR5RGVzY3JBbGlhc1wiXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRzZWxmX3Byb3BlcnR5c1twcm9wZXJVdHlwZV0gPSBzYXZlZGF0YTtcclxuXHRcdFx0XHRcdGN1cnJNb2R1bGVEZWZzW1widXNlUHJvcGVydHlEZXNjckFsaWFzXCJdID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkltcG9ydENsaWVudEVudGl0eURlZjogYWRkKFwiICsgc2NyaXB0bW9kdWxlX25hbWUgKyBcIiksIHByb3BlcnR5KFwiICsgbmFtZSArIFwiL1wiICsgcHJvcGVyVXR5cGUgKyBcIikuXCIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0d2hpbGUobWV0aG9kc2l6ZSA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRtZXRob2RzaXplLS07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIG1ldGhvZFV0eXBlID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0XHR2YXIgYWxpYXNJRCA9IHN0cmVhbS5yZWFkSW50MTYoKTtcclxuXHRcdFx0XHR2YXIgbmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcdFx0dmFyIGFyZ3NzaXplID0gc3RyZWFtLnJlYWRVaW50OCgpO1xyXG5cdFx0XHRcdHZhciBhcmdzID0gW107XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0d2hpbGUoYXJnc3NpemUgPiAwKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFyZ3NzaXplLS07XHJcblx0XHRcdFx0XHRhcmdzLnB1c2goS0JFbmdpbmUuZGF0YXR5cGVzW3N0cmVhbS5yZWFkVWludDE2KCldKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBzYXZlZGF0YSA9IFttZXRob2RVdHlwZSwgYWxpYXNJRCwgbmFtZSwgYXJnc107XHJcblx0XHRcdFx0c2VsZl9tZXRob2RzW25hbWVdID0gc2F2ZWRhdGE7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoYWxpYXNJRCAhPSAtMSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRzZWxmX21ldGhvZHNbYWxpYXNJRF0gPSBzYXZlZGF0YTtcclxuXHRcdFx0XHRcdGN1cnJNb2R1bGVEZWZzW1widXNlTWV0aG9kRGVzY3JBbGlhc1wiXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRzZWxmX21ldGhvZHNbbWV0aG9kVXR5cGVdID0gc2F2ZWRhdGE7XHJcblx0XHRcdFx0XHRjdXJyTW9kdWxlRGVmc1tcInVzZU1ldGhvZERlc2NyQWxpYXNcIl0gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uSW1wb3J0Q2xpZW50RW50aXR5RGVmOiBhZGQoXCIgKyBzY3JpcHRtb2R1bGVfbmFtZSArIFwiKSwgbWV0aG9kKFwiICsgbmFtZSArIFwiKS5cIik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR3aGlsZShiYXNlX21ldGhvZHNpemUgPiAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YmFzZV9tZXRob2RzaXplLS07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIG1ldGhvZFV0eXBlID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0XHR2YXIgYWxpYXNJRCA9IHN0cmVhbS5yZWFkSW50MTYoKTtcclxuXHRcdFx0XHR2YXIgbmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcdFx0dmFyIGFyZ3NzaXplID0gc3RyZWFtLnJlYWRVaW50OCgpO1xyXG5cdFx0XHRcdHZhciBhcmdzID0gW107XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0d2hpbGUoYXJnc3NpemUgPiAwKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFyZ3NzaXplLS07XHJcblx0XHRcdFx0XHRhcmdzLnB1c2goS0JFbmdpbmUuZGF0YXR5cGVzW3N0cmVhbS5yZWFkVWludDE2KCldKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHNlbGZfYmFzZV9tZXRob2RzW25hbWVdID0gW21ldGhvZFV0eXBlLCBhbGlhc0lELCBuYW1lLCBhcmdzXTtcclxuXHRcdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25JbXBvcnRDbGllbnRFbnRpdHlEZWY6IGFkZChcIiArIHNjcmlwdG1vZHVsZV9uYW1lICsgXCIpLCBiYXNlX21ldGhvZChcIiArIG5hbWUgKyBcIikuXCIpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0d2hpbGUoY2VsbF9tZXRob2RzaXplID4gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNlbGxfbWV0aG9kc2l6ZS0tO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBtZXRob2RVdHlwZSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHRcdFx0dmFyIGFsaWFzSUQgPSBzdHJlYW0ucmVhZEludDE2KCk7XHJcblx0XHRcdFx0dmFyIG5hbWUgPSBzdHJlYW0ucmVhZFN0cmluZygpO1xyXG5cdFx0XHRcdHZhciBhcmdzc2l6ZSA9IHN0cmVhbS5yZWFkVWludDgoKTtcclxuXHRcdFx0XHR2YXIgYXJncyA9IFtdO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHdoaWxlKGFyZ3NzaXplID4gMClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhcmdzc2l6ZS0tO1xyXG5cdFx0XHRcdFx0YXJncy5wdXNoKEtCRW5naW5lLmRhdGF0eXBlc1tzdHJlYW0ucmVhZFVpbnQxNigpXSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzZWxmX2NlbGxfbWV0aG9kc1tuYW1lXSA9IFttZXRob2RVdHlwZSwgYWxpYXNJRCwgbmFtZSwgYXJnc107XHJcblx0XHRcdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uSW1wb3J0Q2xpZW50RW50aXR5RGVmOiBhZGQoXCIgKyBzY3JpcHRtb2R1bGVfbmFtZSArIFwiKSwgY2VsbF9tZXRob2QoXCIgKyBuYW1lICsgXCIpLlwiKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBkZWZtZXRob2QgPSBLQkVuZ2luZVtzY3JpcHRtb2R1bGVfbmFtZV07XHJcblxyXG5cdFx0XHRpZihkZWZtZXRob2QgPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkltcG9ydENsaWVudEVudGl0eURlZjogbW9kdWxlKFwiICsgc2NyaXB0bW9kdWxlX25hbWUgKyBcIikgbm90IGZvdW5kIVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKHZhciBuYW1lIGluIGN1cnJNb2R1bGVEZWZzLnByb3BlcnR5cylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBpbmZvcyA9IGN1cnJNb2R1bGVEZWZzLnByb3BlcnR5c1tuYW1lXTtcclxuXHRcdFx0XHR2YXIgcHJvcGVyVXR5cGUgPSBpbmZvc1swXTtcclxuXHRcdFx0XHR2YXIgYWxpYXNJRCA9IGluZm9zWzFdO1xyXG5cdFx0XHRcdHZhciBuYW1lID0gaW5mb3NbMl07XHJcblx0XHRcdFx0dmFyIGRlZmF1bHRWYWxTdHIgPSBpbmZvc1szXTtcclxuXHRcdFx0XHR2YXIgdXR5cGUgPSBpbmZvc1s0XTtcclxuXHJcblx0XHRcdFx0aWYoZGVmbWV0aG9kICE9IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGRlZm1ldGhvZC5wcm90b3R5cGVbbmFtZV0gPSB1dHlwZS5wYXJzZURlZmF1bHRWYWxTdHIoZGVmYXVsdFZhbFN0cik7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmb3IodmFyIG5hbWUgaW4gY3Vyck1vZHVsZURlZnMubWV0aG9kcylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBpbmZvcyA9IGN1cnJNb2R1bGVEZWZzLm1ldGhvZHNbbmFtZV07XHJcblx0XHRcdFx0dmFyIHByb3BlclV0eXBlID0gaW5mb3NbMF07XHJcblx0XHRcdFx0dmFyIGFsaWFzSUQgPSBpbmZvc1sxXTtcclxuXHRcdFx0XHR2YXIgbmFtZSA9IGluZm9zWzJdO1xyXG5cdFx0XHRcdHZhciBhcmdzID0gaW5mb3NbM107XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoZGVmbWV0aG9kICE9IHVuZGVmaW5lZCAmJiBkZWZtZXRob2QucHJvdG90eXBlW25hbWVdID09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRLQkVuZ2luZS5XQVJOSU5HX01TRyhzY3JpcHRtb2R1bGVfbmFtZSArIFwiOjogbWV0aG9kKFwiICsgbmFtZSArIFwiKSBubyBpbXBsZW1lbnQhXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLm9uSW1wb3J0RW50aXR5RGVmQ29tcGxldGVkKCk7XHJcblx0fVxyXG5cclxuXHR0aGlzLkNsaWVudF9vblZlcnNpb25Ob3RNYXRjaCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyVmVyc2lvbiA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJDbGllbnRfb25WZXJzaW9uTm90TWF0Y2g6IHZlckluZm89XCIgKyBLQkVuZ2luZS5hcHAuY2xpZW50VmVyc2lvbiArIFwiIG5vdCBtYXRjaChzZXJ2ZXI6IFwiICsgS0JFbmdpbmUuYXBwLnNlcnZlclZlcnNpb24gKyBcIilcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25WZXJzaW9uTm90TWF0Y2gsIEtCRW5naW5lLmFwcC5jbGllbnRWZXJzaW9uLCBLQkVuZ2luZS5hcHAuc2VydmVyVmVyc2lvbik7XHJcblx0fVxyXG5cclxuXHR0aGlzLkNsaWVudF9vblNjcmlwdFZlcnNpb25Ob3RNYXRjaCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyU2NyaXB0VmVyc2lvbiA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJDbGllbnRfb25TY3JpcHRWZXJzaW9uTm90TWF0Y2g6IHZlckluZm89XCIgKyBLQkVuZ2luZS5hcHAuY2xpZW50U2NyaXB0VmVyc2lvbiArIFwiIG5vdCBtYXRjaChzZXJ2ZXI6IFwiICsgS0JFbmdpbmUuYXBwLnNlcnZlclNjcmlwdFZlcnNpb24gKyBcIilcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TY3JpcHRWZXJzaW9uTm90TWF0Y2gsIEtCRW5naW5lLmFwcC5jbGllbnRTY3JpcHRWZXJzaW9uLCBLQkVuZ2luZS5hcHAuc2VydmVyU2NyaXB0VmVyc2lvbik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMub25JbXBvcnRFbnRpdHlEZWZDb21wbGV0ZWQgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6b25JbXBvcnRFbnRpdHlEZWZDb21wbGV0ZWQ6IHN1Y2Nlc3NmdWxseSFcIik7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5ZGVmSW1wb3J0ZWQgPSB0cnVlO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmxvZ2luX2Jhc2VhcHAoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5pbXBvcnRDbGllbnRNZXNzYWdlcyA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgYXBwID0gS0JFbmdpbmUuYXBwO1xyXG5cclxuXHRcdHdoaWxlKGFwcC5jdXJyTXNnQ291bnQgPiAwKVxyXG5cdFx0e1xyXG5cdFx0XHRhcHAuY3Vyck1zZ0NvdW50LS07XHJcblx0XHRcclxuXHRcdFx0dmFyIG1zZ2lkID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdFx0dmFyIG1zZ2xlbiA9IHN0cmVhbS5yZWFkSW50MTYoKTtcclxuXHRcdFx0dmFyIG1zZ25hbWUgPSBzdHJlYW0ucmVhZFN0cmluZygpO1xyXG5cdFx0XHR2YXIgYXJndHlwZSA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHR2YXIgYXJnc2l6ZSA9IHN0cmVhbS5yZWFkVWludDgoKTtcclxuXHRcdFx0dmFyIGFyZ3N0eXBlcyA9IG5ldyBBcnJheShhcmdzaXplKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvcih2YXIgaT0wOyBpPGFyZ3NpemU7IGkrKylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFyZ3N0eXBlc1tpXSA9IHN0cmVhbS5yZWFkVWludDgoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGhhbmRsZXIgPSBudWxsO1xyXG5cdFx0XHR2YXIgaXNDbGllbnRNZXRob2QgPSBtc2duYW1lLmluZGV4T2YoXCJDbGllbnRfXCIpID49IDA7XHJcblx0XHRcdGlmKGlzQ2xpZW50TWV0aG9kKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aGFuZGxlciA9IGFwcFttc2duYW1lXTtcclxuXHRcdFx0XHRpZihoYW5kbGVyID09IG51bGwgfHwgaGFuZGxlciA9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0S0JFbmdpbmUuV0FSTklOR19NU0coXCJLQkVuZ2luZUFwcDo6b25JbXBvcnRDbGllbnRNZXNzYWdlc1tcIiArIGFwcC5jdXJyc2VydmVyICsgXCJdOiBpbnRlcmZhY2UoXCIgKyBtc2duYW1lICsgXCIvXCIgKyBtc2dpZCArIFwiKSBubyBpbXBsZW1lbnQhXCIpO1xyXG5cdFx0XHRcdFx0aGFuZGxlciA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpvbkltcG9ydENsaWVudE1lc3NhZ2VzOiBpbXBvcnQoXCIgKyBtc2duYW1lICsgXCIpIHN1Y2Nlc3NmdWxseSFcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdGlmKG1zZ25hbWUubGVuZ3RoID4gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLm1lc3NhZ2VzW21zZ25hbWVdID0gbmV3IEtCRW5naW5lLk1lc3NhZ2UobXNnaWQsIG1zZ25hbWUsIG1zZ2xlbiwgYXJndHlwZSwgYXJnc3R5cGVzLCBoYW5kbGVyKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihpc0NsaWVudE1ldGhvZClcclxuXHRcdFx0XHRcdEtCRW5naW5lLmNsaWVudG1lc3NhZ2VzW21zZ2lkXSA9IEtCRW5naW5lLm1lc3NhZ2VzW21zZ25hbWVdO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdEtCRW5naW5lLm1lc3NhZ2VzW0tCRW5naW5lLmFwcC5jdXJyc2VydmVyXVttc2dpZF0gPSBLQkVuZ2luZS5tZXNzYWdlc1ttc2duYW1lXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRLQkVuZ2luZS5tZXNzYWdlc1thcHAuY3VycnNlcnZlcl1bbXNnaWRdID0gbmV3IEtCRW5naW5lLk1lc3NhZ2UobXNnaWQsIG1zZ25hbWUsIG1zZ2xlbiwgYXJndHlwZSwgYXJnc3R5cGVzLCBoYW5kbGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRhcHAub25JbXBvcnRDbGllbnRNZXNzYWdlc0NvbXBsZXRlZCgpO1xyXG5cdFx0YXBwLmN1cnJNc2dJRCA9IDA7XHJcblx0XHRhcHAuY3Vyck1zZ0xlbiA9IDA7XHJcblx0XHRhcHAuY3Vyck1zZ0NvdW50ID0gMDtcclxuXHRcdGFwcC5mcmFnbWVudFN0cmVhbSA9IG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uSW1wb3J0Q2xpZW50TWVzc2FnZXMgPSBmdW5jdGlvbihtc2cpXHJcblx0e1xyXG5cdFx0dmFyIHN0cmVhbSA9IG5ldyBLQkVuZ2luZS5NZW1vcnlTdHJlYW0obXNnLmRhdGEpO1xyXG5cdFx0c3RyZWFtLndwb3MgPSBtc2cuZGF0YS5ieXRlTGVuZ3RoO1xyXG5cdFx0dmFyIGFwcCA9IEtCRW5naW5lLmFwcDtcclxuXHJcblx0XHRpZihhcHAuY3Vyck1zZ0lEID09IDApXHJcblx0XHR7XHJcblx0XHRcdGFwcC5jdXJyTXNnSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0fSBcclxuXHJcblx0XHRpZihhcHAuY3Vyck1zZ0lEID09IEtCRW5naW5lLm1lc3NhZ2VzLm9uSW1wb3J0Q2xpZW50TWVzc2FnZXMuaWQpXHJcblx0XHR7XHJcblx0XHRcdGlmKGFwcC5jdXJyTXNnTGVuID09IDApIFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YXBwLmN1cnJNc2dMZW4gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHRcdGFwcC5jdXJyTXNnQ291bnQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgRnJhZ21lbnREYXRhVHlwZXMgPSBLQkVuZ2luZS5GcmFnbWVudERhdGFUeXBlc1xyXG5cdFx0XHRpZihzdHJlYW0ubGVuZ3RoKCkgKyAyIDwgYXBwLmN1cnJNc2dMZW4gJiYgYXBwLmZyYWdtZW50U3RyZWFtID09IG51bGwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhcHAud3JpdGVGcmFnbWVudE1lc3NhZ2UoRnJhZ21lbnREYXRhVHlwZXMuRlJBR01FTlRfREFUQV9NRVNTQUdFX0JPRFksIHN0cmVhbSwgYXBwLmN1cnJNc2dMZW4gLSAyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKGFwcC5mcmFnbWVudFN0cmVhbSAhPSBudWxsKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YXBwLm1lcmdlRnJhZ21lbnRNZXNzYWdlKHN0cmVhbSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoYXBwLmZyYWdtZW50U3RyZWFtLmxlbmd0aCgpICsgMiA+PSBhcHAuY3Vyck1zZ0xlbilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhcHAuaW1wb3J0Q2xpZW50TWVzc2FnZXMoYXBwLmZyYWdtZW50U3RyZWFtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YXBwLmltcG9ydENsaWVudE1lc3NhZ2VzKHN0cmVhbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6Om9ubWVzc2FnZTogbm90IGZvdW5kIG1zZyhcIiArIGFwcC5jdXJyTXNnSUQgKyBcIikhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQsIGRhdGFzKVxyXG5cdHsgIFxyXG5cdFx0S0JFbmdpbmUuYXBwLnJlc2V0KCk7XHJcblx0XHRLQkVuZ2luZS5hcHAudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuXHRcdEtCRW5naW5lLmFwcC5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmNsaWVudGRhdGFzID0gZGF0YXM7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5jcmVhdGVBY2NvdW50X2xvZ2luYXBwKHRydWUpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmdldFNlcnZlckFkZHIgPSBmdW5jdGlvbihpcCwgcG9ydClcclxuXHR7XHJcblx0XHR2YXIgc2VydmVyQWRkciA9IEtCRW5naW5lLmFwcC5wcm90b2NvbCArIGlwO1xyXG5cdFx0aWYocG9ydCAhPSBcIlwiKVxyXG5cdFx0e1xyXG5cdFx0XHRzZXJ2ZXJBZGRyICs9IFwiOlwiICsgcG9ydDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcnZlckFkZHI7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuY3JlYXRlQWNjb3VudF9sb2dpbmFwcCA9IGZ1bmN0aW9uKG5vY29ubmVjdClcclxuXHR7ICBcclxuXHRcdGNjLmxvZyhcInRoaXMuY3JlYXRlQWNjb3VudF9sb2dpbmFwcFwiKVxyXG5cdFx0aWYobm9jb25uZWN0KVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgc2VydmVyQWRkciA9IHRoaXMuZ2V0U2VydmVyQWRkcihLQkVuZ2luZS5hcHAuaXAsIEtCRW5naW5lLmFwcC5wb3J0KTtcclxuXHRcdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Y3JlYXRlQWNjb3VudF9sb2dpbmFwcDogc3RhcnQgY29ubmVjdCB0byBcIiArIHNlcnZlckFkZHIgKyBcIiFcIik7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5jdXJyY29ubmVjdCA9IFwibG9naW5hcHBcIjtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmNvbm5lY3Qoc2VydmVyQWRkcik7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5zb2NrZXQub25vcGVuID0gS0JFbmdpbmUuYXBwLm9uT3BlbkxvZ2luYXBwX2NyZWF0ZUFjY291bnQ7ICBcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJ1bmRsZSA9IG5ldyBLQkVuZ2luZS5CdW5kbGUoKTtcclxuXHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuTG9naW5hcHBfcmVxQ3JlYXRlQWNjb3VudCk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAudXNlcm5hbWUpO1xyXG5cdFx0XHRidW5kbGUud3JpdGVTdHJpbmcoS0JFbmdpbmUuYXBwLnBhc3N3b3JkKTtcclxuXHRcdFx0YnVuZGxlLndyaXRlQmxvYihLQkVuZ2luZS5hcHAuY2xpZW50ZGF0YXMpO1xyXG5cdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLmJpbmRBY2NvdW50RW1haWwgPSBmdW5jdGlvbihlbWFpbEFkZHJlc3MpXHJcblx0eyAgXHJcblx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9yZXFBY2NvdW50QmluZEVtYWlsKTtcclxuXHRcdGJ1bmRsZS53cml0ZUludDMyKEtCRW5naW5lLmFwcC5lbnRpdHlfaWQpO1xyXG5cdFx0YnVuZGxlLndyaXRlU3RyaW5nKEtCRW5naW5lLmFwcC5wYXNzd29yZCk7XHJcblx0XHRidW5kbGUud3JpdGVTdHJpbmcoZW1haWxBZGRyZXNzKTtcclxuXHRcdGJ1bmRsZS5zZW5kKEtCRW5naW5lLmFwcCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMubmV3UGFzc3dvcmQgPSBmdW5jdGlvbihvbGRfcGFzc3dvcmQsIG5ld19wYXNzd29yZClcclxuXHR7XHJcblx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9yZXFBY2NvdW50TmV3UGFzc3dvcmQpO1xyXG5cdFx0YnVuZGxlLndyaXRlSW50MzIoS0JFbmdpbmUuYXBwLmVudGl0eV9pZCk7XHJcblx0XHRidW5kbGUud3JpdGVTdHJpbmcob2xkX3Bhc3N3b3JkKTtcclxuXHRcdGJ1bmRsZS53cml0ZVN0cmluZyhuZXdfcGFzc3dvcmQpO1xyXG5cdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgZGF0YXMpXHJcblx0eyAgXHJcblx0XHRLQkVuZ2luZS5hcHAucmVzZXQoKTtcclxuXHRcdEtCRW5naW5lLmFwcC51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcblx0XHRLQkVuZ2luZS5hcHAuY2xpZW50ZGF0YXMgPSBkYXRhcztcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLmxvZ2luX2xvZ2luYXBwKHRydWUpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmxvZ291dCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9sb2dvdXRCYXNlYXBwKTtcclxuXHRcdGJ1bmRsZS53cml0ZVVpbnQ2NChLQkVuZ2luZS5hcHAuZW50aXR5X3V1aWQpO1xyXG5cdFx0YnVuZGxlLndyaXRlSW50MzIoS0JFbmdpbmUuYXBwLmVudGl0eV9pZCk7XHJcblx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLmxvZ2luX2xvZ2luYXBwID0gZnVuY3Rpb24obm9jb25uZWN0KVxyXG5cdHsgIFxyXG5cdFx0Ly9jYy5sb2coXCJzZW5kIGxvZ2luX2xvZ2luYXBwXCIpXHJcblx0XHRpZihub2Nvbm5lY3QpXHJcblx0XHR7XHJcblx0XHRcdHZhciBzZXJ2ZXJBZGRyID0gdGhpcy5nZXRTZXJ2ZXJBZGRyKEtCRW5naW5lLmFwcC5pcCwgS0JFbmdpbmUuYXBwLnBvcnQpO1xyXG5cdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpsb2dpbl9sb2dpbmFwcDogc3RhcnQgY29ubmVjdCB0byBcIiArIHNlcnZlckFkZHIgKyBcIiFcIik7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5jdXJyY29ubmVjdCA9IFwibG9naW5hcHBcIjtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmNvbm5lY3Qoc2VydmVyQWRkcik7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5zb2NrZXQub25vcGVuID0gS0JFbmdpbmUuYXBwLm9uT3BlbkxvZ2luYXBwX2xvZ2luOyAgXHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7IFxyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGJ1bmRsZSA9IG5ldyBLQkVuZ2luZS5CdW5kbGUoKTtcclxuXHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuTG9naW5hcHBfbG9naW4pO1xyXG5cdFx0XHRidW5kbGUud3JpdGVJbnQ4KEtCRW5naW5lLmFwcC5hcmdzLmNsaWVudFR5cGUpOyAvLyBjbGllbnRUeXBlXHJcblx0XHRcdGJ1bmRsZS53cml0ZUJsb2IoS0JFbmdpbmUuYXBwLmNsaWVudGRhdGFzKTtcclxuXHRcdFx0YnVuZGxlLndyaXRlU3RyaW5nKEtCRW5naW5lLmFwcC51c2VybmFtZSk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAucGFzc3dvcmQpO1xyXG5cdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy5vbk9wZW5Mb2dpbmFwcF9yZXNldHBhc3N3b3JkID0gZnVuY3Rpb24oKVxyXG5cdHsgIFxyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6b25PcGVuTG9naW5hcHBfcmVzZXRwYXNzd29yZDogc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyc2VydmVyID0gXCJsb2dpbmFwcFwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmN1cnJzdGF0ZSA9IFwicmVzZXRwYXNzd29yZFwiO1xyXG5cdFx0XHJcblx0XHRpZighS0JFbmdpbmUuYXBwLmxvZ2luYXBwTWVzc2FnZUltcG9ydGVkKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5Mb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyk7XHJcblx0XHRcdGJ1bmRsZS5zZW5kKEtCRW5naW5lLmFwcCk7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5zb2NrZXQub25tZXNzYWdlID0gS0JFbmdpbmUuYXBwLkNsaWVudF9vbkltcG9ydENsaWVudE1lc3NhZ2VzOyAgXHJcblx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6Om9uT3BlbkxvZ2luYXBwX3Jlc2V0cGFzc3dvcmQ6IHN0YXJ0IGltcG9ydENsaWVudE1lc3NhZ2VzIC4uLlwiKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLm9uSW1wb3J0Q2xpZW50TWVzc2FnZXNDb21wbGV0ZWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMucmVzZXRfcGFzc3dvcmQgPSBmdW5jdGlvbih1c2VybmFtZSlcclxuXHR7IFxyXG5cdFx0S0JFbmdpbmUuYXBwLnJlc2V0KCk7XHJcblx0XHRLQkVuZ2luZS5hcHAudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuXHRcdEtCRW5naW5lLmFwcC5yZXNldHBhc3N3b3JkX2xvZ2luYXBwKHRydWUpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLnJlc2V0cGFzc3dvcmRfbG9naW5hcHAgPSBmdW5jdGlvbihub2Nvbm5lY3QpXHJcblx0eyAgXHJcblx0XHRpZihub2Nvbm5lY3QpXHJcblx0XHR7XHJcblx0XHRcdHZhciBzZXJ2ZXJBZGRyID0gdGhpcy5nZXRTZXJ2ZXJBZGRyKEtCRW5naW5lLmFwcC5pcCwgS0JFbmdpbmUuYXBwLnBvcnQpO1xyXG5cdFx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpyZXNldHBhc3N3b3JkX2xvZ2luYXBwOiBzdGFydCBjb25uZWN0IHRvIFwiICsgc2VydmVyQWRkciArIFwiIVwiKTtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmN1cnJjb25uZWN0ID0gXCJsb2dpbmFwcFwiO1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuY29ubmVjdChzZXJ2ZXJBZGRyKTtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm9wZW4gPSBLQkVuZ2luZS5hcHAub25PcGVuTG9naW5hcHBfcmVzZXRwYXNzd29yZDsgIFxyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5Mb2dpbmFwcF9yZXFBY2NvdW50UmVzZXRQYXNzd29yZCk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAudXNlcm5hbWUpO1xyXG5cdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLm9uT3BlbkJhc2VhcHAgPSBmdW5jdGlvbigpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6b25PcGVuQmFzZWFwcDogc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyc2VydmVyID0gXCJiYXNlYXBwXCI7XHJcblx0XHRcclxuXHRcdGlmKCFLQkVuZ2luZS5hcHAuYmFzZWFwcE1lc3NhZ2VJbXBvcnRlZClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJ1bmRsZSA9IG5ldyBLQkVuZ2luZS5CdW5kbGUoKTtcclxuXHRcdFx0YnVuZGxlLm5ld01lc3NhZ2UoS0JFbmdpbmUubWVzc2FnZXMuQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyk7XHJcblx0XHRcdGJ1bmRsZS5zZW5kKEtCRW5naW5lLmFwcCk7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5zb2NrZXQub25tZXNzYWdlID0gS0JFbmdpbmUuYXBwLkNsaWVudF9vbkltcG9ydENsaWVudE1lc3NhZ2VzOyAgXHJcblx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoXCJCYXNlYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAub25JbXBvcnRDbGllbnRNZXNzYWdlc0NvbXBsZXRlZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLmxvZ2luX2Jhc2VhcHAgPSBmdW5jdGlvbihub2Nvbm5lY3QpXHJcblx0eyAgXHJcblx0XHRpZihub2Nvbm5lY3QpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkxvZ2luQmFzZWFwcCk7XHJcblx0XHRcdHZhciBzZXJ2ZXJBZGRyID0gdGhpcy5nZXRTZXJ2ZXJBZGRyKEtCRW5naW5lLmFwcC5iYXNlYXBwSXAsIEtCRW5naW5lLmFwcC5iYXNlYXBwUG9ydCk7XHJcblx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OmxvZ2luX2Jhc2VhcHA6IHN0YXJ0IGNvbm5lY3QgdG8gXCIgKyBzZXJ2ZXJBZGRyICsgXCIhXCIpO1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuY3VycmNvbm5lY3QgPSBcImJhc2VhcHBcIjtcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmNvbm5lY3Qoc2VydmVyQWRkcik7XHJcblx0XHRcdFxyXG5cdFx0XHRpZihLQkVuZ2luZS5hcHAuc29ja2V0ICE9IHVuZGVmaW5lZCAmJiBLQkVuZ2luZS5hcHAuc29ja2V0ICE9IG51bGwpXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm9wZW4gPSBLQkVuZ2luZS5hcHAub25PcGVuQmFzZWFwcDsgIFxyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnVuZGxlID0gbmV3IEtCRW5naW5lLkJ1bmRsZSgpO1xyXG5cdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX2xvZ2luQmFzZWFwcCk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAudXNlcm5hbWUpO1xyXG5cdFx0XHRidW5kbGUud3JpdGVTdHJpbmcoS0JFbmdpbmUuYXBwLnBhc3N3b3JkKTtcclxuXHRcdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0dGhpcy5yZWxvZ2luQmFzZWFwcCA9IGZ1bmN0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAubGFzdFRpY2tUaW1lID0gZGF0ZU9iamVjdC5nZXRUaW1lKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAubGFzdFRpY2tDQlRpbWUgPSBkYXRlT2JqZWN0LmdldFRpbWUoKTtcclxuXHJcblx0XHRpZihLQkVuZ2luZS5hcHAuc29ja2V0ICE9IHVuZGVmaW5lZCAmJiBLQkVuZ2luZS5hcHAuc29ja2V0ICE9IG51bGwpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLnJlc2V0U29ja2V0KCk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25SZWxvZ2luQmFzZWFwcCk7XHJcblxyXG5cdFx0dmFyIHNlcnZlckFkZHIgPSB0aGlzLmdldFNlcnZlckFkZHIoS0JFbmdpbmUuYXBwLmJhc2VhcHBJcCwgS0JFbmdpbmUuYXBwLmJhc2VhcHBQb3J0KTtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OnJlbG9naW5CYXNlYXBwOiBzdGFydCBjb25uZWN0IHRvIFwiICsgc2VydmVyQWRkciArIFwiIVwiKTtcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyY29ubmVjdCA9IFwiYmFzZWFwcFwiO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmNvbm5lY3Qoc2VydmVyQWRkcik7XHJcblx0XHRcclxuXHRcdGlmKEtCRW5naW5lLmFwcC5zb2NrZXQgIT0gdW5kZWZpbmVkICYmIEtCRW5naW5lLmFwcC5zb2NrZXQgIT0gbnVsbClcclxuXHRcdFx0S0JFbmdpbmUuYXBwLnNvY2tldC5vbm9wZW4gPSBLQkVuZ2luZS5hcHAub25SZU9wZW5CYXNlYXBwOyAgXHJcblx0fVxyXG5cdFxyXG5cdHRoaXMub25SZU9wZW5CYXNlYXBwID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6Om9uUmVPcGVuQmFzZWFwcDogc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHRcdEtCRW5naW5lLmFwcC5jdXJyc2VydmVyID0gXCJiYXNlYXBwXCI7XHJcblx0XHRcclxuXHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX3JlbG9naW5CYXNlYXBwKTtcclxuXHRcdGJ1bmRsZS53cml0ZVN0cmluZyhLQkVuZ2luZS5hcHAudXNlcm5hbWUpO1xyXG5cdFx0YnVuZGxlLndyaXRlU3RyaW5nKEtCRW5naW5lLmFwcC5wYXNzd29yZCk7XHJcblx0XHRidW5kbGUud3JpdGVVaW50NjQoS0JFbmdpbmUuYXBwLmVudGl0eV91dWlkKTtcclxuXHRcdGJ1bmRsZS53cml0ZUludDMyKEtCRW5naW5lLmFwcC5lbnRpdHlfaWQpOy8v55So5oiR55qERW50aXR5X2lk5ZyoYmFzZWFwcC5maW5kRW50aXR5KGlkKVxyXG5cdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHRcdFxyXG5cdFx0dmFyIGRhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmxhc3RUaWNrQ0JUaW1lID0gZGF0ZU9iamVjdC5nZXRUaW1lKCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uSGVsbG9DQiA9IGZ1bmN0aW9uKGFyZ3MpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNlcnZlclZlcnNpb24gPSBhcmdzLnJlYWRTdHJpbmcoKTtcclxuXHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJTY3JpcHRWZXJzaW9uID0gYXJncy5yZWFkU3RyaW5nKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAuc2VydmVyUHJvdG9jb2xNRDUgPSBhcmdzLnJlYWRTdHJpbmcoKTtcclxuXHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJFbnRpdHlEZWZNRDUgPSBhcmdzLnJlYWRTdHJpbmcoKTtcclxuXHRcdFxyXG5cdFx0dmFyIGN0eXBlID0gYXJncy5yZWFkSW50MzIoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uSGVsbG9DQjogdmVySW5mbyhcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJWZXJzaW9uICsgXCIpLCBzY3JpcHRWZXJJbmZvKFwiICsgXHJcblx0XHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJTY3JpcHRWZXJzaW9uICsgXCIpLCBzZXJ2ZXJQcm90b2NvbE1ENShcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJQcm90b2NvbE1ENSArIFwiKSwgc2VydmVyRW50aXR5RGVmTUQ1KFwiICsgXHJcblx0XHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJFbnRpdHlEZWZNRDUgKyBcIiksIGN0eXBlKFwiICsgY3R5cGUgKyBcIikhXCIpO1xyXG5cdFx0XHJcblx0XHR2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAubGFzdFRpY2tDQlRpbWUgPSBkYXRlT2JqZWN0LmdldFRpbWUoKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25Mb2dpbkZhaWxlZCA9IGZ1bmN0aW9uKGFyZ3MpXHJcblx0e1xyXG5cdFx0dmFyIGZhaWxlZGNvZGUgPSBhcmdzLnJlYWRVaW50MTYoKTtcclxuXHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcyA9IGFyZ3MucmVhZEJsb2IoKTtcclxuXHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25Mb2dpbkZhaWxlZDogZmFpbGVkY29kZShcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnJzW2ZhaWxlZGNvZGVdLm5hbWUgKyBcIiksIGRhdGFzKFwiICsgS0JFbmdpbmUuYXBwLnNlcnZlcmRhdGFzLmxlbmd0aCArIFwiKSFcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25Mb2dpbkZhaWxlZCwgZmFpbGVkY29kZSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uTG9naW5TdWNjZXNzZnVsbHkgPSBmdW5jdGlvbihhcmdzKVxyXG5cdHtcclxuXHRcdHZhciBhY2NvdW50TmFtZSA9IGFyZ3MucmVhZFN0cmluZygpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnVzZXJuYW1lID0gYWNjb3VudE5hbWU7XHJcblx0XHRLQkVuZ2luZS5hcHAuYmFzZWFwcElwID0gYXJncy5yZWFkU3RyaW5nKCk7XHJcblx0XHRLQkVuZ2luZS5hcHAuYmFzZWFwcFBvcnQgPSBhcmdzLnJlYWRVaW50MTYoKTtcclxuXHRcdEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcyA9IGFyZ3MucmVhZEJsb2IoKTtcclxuXHRcdGNjLmxvZyhcInRoaXMuQ2xpZW50X29uTG9naW5TdWNjZXNzZnVsbHkxMTFcIilcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkxvZ2luU3VjY2Vzc2Z1bGx5OiBhY2NvdW50TmFtZShcIiArIGFjY291bnROYW1lICsgXCIpLCBhZGRyKFwiICsgXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmJhc2VhcHBJcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLmJhc2VhcHBQb3J0ICsgXCIpLCBkYXRhcyhcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcy5sZW5ndGggKyBcIikhXCIpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuZGlzY29ubmVjdCgpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmxvZ2luX2Jhc2VhcHAodHJ1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uTG9naW5CYXNlYXBwRmFpbGVkID0gZnVuY3Rpb24oZmFpbGVkY29kZSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uTG9naW5CYXNlYXBwRmFpbGVkOiBmYWlsZWRjb2RlKFwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycnNbZmFpbGVkY29kZV0ubmFtZSArIFwiKSFcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLm9uTG9naW5CYXNlYXBwRmFpbGVkLm9uTG9naW5CYXNlYXBwRmFpbGVkLCBmYWlsZWRjb2RlKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uUmVsb2dpbkJhc2VhcHBGYWlsZWQgPSBmdW5jdGlvbihmYWlsZWRjb2RlKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25SZWxvZ2luQmFzZWFwcEZhaWxlZDogZmFpbGVkY29kZShcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnJzW2ZhaWxlZGNvZGVdLm5hbWUgKyBcIikhXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uUmVsb2dpbkJhc2VhcHBGYWlsZWQsIGZhaWxlZGNvZGUpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5DbGllbnRfb25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5X3V1aWQgPSBzdHJlYW0ucmVhZFVpbnQ2NCgpO1xyXG5cdFx0S0JFbmdpbmUuREVCVUdfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5OiBcIiArIEtCRW5naW5lLmFwcC51c2VybmFtZSk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuZW50aXR5Y2xhc3MgPSB7fTtcclxuXHR0aGlzLmdldGVudGl0eWNsYXNzID0gZnVuY3Rpb24oZW50aXR5VHlwZSlcclxuXHR7XHJcblx0XHR2YXIgcnVuY2xhc3MgPSBLQkVuZ2luZS5hcHAuZW50aXR5Y2xhc3NbZW50aXR5VHlwZV07XHJcblx0XHRpZihydW5jbGFzcyA9PSB1bmRlZmluZWQpXHJcblx0XHR7XHJcblx0XHRcdHJ1bmNsYXNzID0gS0JFbmdpbmVbZW50aXR5VHlwZV07XHJcblx0XHRcdGlmKHJ1bmNsYXNzID09IHVuZGVmaW5lZClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpnZXRlbnRpdHljbGFzczogZW50aXR5VHlwZShcIiArIGVudGl0eVR5cGUgKyBcIikgaXMgZXJyb3IhXCIpO1xyXG5cdFx0XHRcdHJldHVybiBydW5jbGFzcztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eWNsYXNzW2VudGl0eVR5cGVdID0gcnVuY2xhc3M7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJ1bmNsYXNzO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vbkNyZWF0ZWRQcm94aWVzID0gZnVuY3Rpb24ocm5kVVVJRCwgZWlkLCBlbnRpdHlUeXBlKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkNyZWF0ZWRQcm94aWVzOiBlaWQoXCIgKyBlaWQgKyBcIiksIGVudGl0eVR5cGUoXCIgKyBlbnRpdHlUeXBlICsgXCIpIVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5X3V1aWQgPSBybmRVVUlEO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0eV9pZCA9IGVpZDtcclxuXHRcdFxyXG5cdFx0aWYoZW50aXR5ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0dmFyIHJ1bmNsYXNzID0gS0JFbmdpbmUuYXBwLmdldGVudGl0eWNsYXNzKGVudGl0eVR5cGUpO1xyXG5cdFx0XHRpZihydW5jbGFzcyA9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGVudGl0eSA9IG5ldyBydW5jbGFzcygpO1xyXG5cdFx0XHRlbnRpdHkuaWQgPSBlaWQ7XHJcblx0XHRcdGVudGl0eS5jbGFzc05hbWUgPSBlbnRpdHlUeXBlO1xyXG5cdFx0XHRcclxuXHRcdFx0ZW50aXR5LmJhc2UgPSBuZXcgS0JFbmdpbmUuRW50aXR5Q2FsbCgpO1xyXG5cdFx0XHRlbnRpdHkuYmFzZS5pZCA9IGVpZDtcclxuXHRcdFx0ZW50aXR5LmJhc2UuY2xhc3NOYW1lID0gZW50aXR5VHlwZTtcclxuXHRcdFx0ZW50aXR5LmJhc2UudHlwZSA9IEtCRW5naW5lLkVOVElUWUNBTExfVFlQRV9CQVNFO1xyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF0gPSBlbnRpdHk7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZW50aXR5TWVzc2FnZSA9IEtCRW5naW5lLmJ1ZmZlcmVkQ3JlYXRlRW50aXR5TWVzc2FnZXNbZWlkXTtcclxuXHRcdFx0aWYoZW50aXR5TWVzc2FnZSAhPSB1bmRlZmluZWQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRLQkVuZ2luZS5hcHAuQ2xpZW50X29uVXBkYXRlUHJvcGVydHlzKGVudGl0eU1lc3NhZ2UpO1xyXG5cdFx0XHRcdGRlbGV0ZSBLQkVuZ2luZS5idWZmZXJlZENyZWF0ZUVudGl0eU1lc3NhZ2VzW2VpZF07XHJcblx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0ZW50aXR5Ll9faW5pdF9fKCk7XHJcblx0XHRcdGVudGl0eS5pbml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoS0JFbmdpbmUuYXBwLmFyZ3MuaXNPbkluaXRDYWxsUHJvcGVydHlzU2V0TWV0aG9kcylcclxuXHRcdFx0XHRlbnRpdHkuY2FsbFByb3BlcnR5c1NldE1ldGhvZHMoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0dmFyIGVudGl0eU1lc3NhZ2UgPSBLQkVuZ2luZS5idWZmZXJlZENyZWF0ZUVudGl0eU1lc3NhZ2VzW2VpZF07XHJcblx0XHRcdGlmKGVudGl0eU1lc3NhZ2UgIT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLkNsaWVudF9vblVwZGF0ZVByb3BlcnR5cyhlbnRpdHlNZXNzYWdlKTtcclxuXHRcdFx0XHRkZWxldGUgS0JFbmdpbmUuYnVmZmVyZWRDcmVhdGVFbnRpdHlNZXNzYWdlc1tlaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgaWQgPSAwO1xyXG5cdFx0aWYoS0JFbmdpbmUuYXBwLmVudGl0eUlEQWxpYXNJRExpc3QuTGVuZ3RoID4gMjU1KVxyXG5cdFx0e1xyXG5cdFx0XHRpZCA9IHN0cmVhbS5yZWFkSW50MzIoKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0dmFyIGFsaWFzSUQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XHJcblxyXG5cdFx0XHQvLyDlpoLmnpzkuLow5LiU5a6i5oi356uv5LiK5LiA5q2l5piv6YeN55m76ZmG5oiW6ICF6YeN6L+e5pON5L2c5bm25LiU5pyN5Yqh56uvZW50aXR55Zyo5pat57q/5pyf6Ze05LiA55u05aSE5LqO5Zyo57q/54q25oCBXHJcblx0XHRcdC8vIOWImeWPr+S7peW/veeVpei/meS4qumUmeivrywg5Zug5Li6Y2VsbGFwcOWPr+iDveS4gOebtOWcqOWQkWJhc2VhcHDlj5HpgIHlkIzmraXmtojmga/vvIwg5b2T5a6i5oi356uv6YeN6L+e5LiK5pe25pyq562JXHJcblx0XHRcdC8vIOacjeWKoeerr+WIneWni+WMluatpemqpOW8gOWni+WImeaUtuWIsOWQjOatpeS/oeaBrywg5q2k5pe26L+Z6YeM5bCx5Lya5Ye66ZSZ44CCXHJcblx0XHRcdGlmKEtCRW5naW5lLmFwcC5lbnRpdHlJREFsaWFzSURMaXN0Lmxlbmd0aCA8PSBhbGlhc0lEKVxyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHJcblx0XHRcdGlkID0gS0JFbmdpbmUuYXBwLmVudGl0eUlEQWxpYXNJRExpc3RbYWxpYXNJRF07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBpZDtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5vblVwZGF0ZVByb3BlcnR5c18gPSBmdW5jdGlvbihlaWQsIHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRcclxuXHRcdGlmKGVudGl0eSA9PSB1bmRlZmluZWQpXHJcblx0XHR7XHJcblx0XHRcdHZhciBlbnRpdHlNZXNzYWdlID0gS0JFbmdpbmUuYnVmZmVyZWRDcmVhdGVFbnRpdHlNZXNzYWdlc1tlaWRdO1xyXG5cdFx0XHRpZihlbnRpdHlNZXNzYWdlICE9IHVuZGVmaW5lZClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25VcGRhdGVQcm9wZXJ0eXM6IGVudGl0eShcIiArIGVpZCArIFwiKSBub3QgZm91bmQhXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dmFyIHN0cmVhbTEgPSBuZXcgS0JFbmdpbmUuTWVtb3J5U3RyZWFtKHN0cmVhbS5idWZmZXIpO1xyXG5cdFx0XHRzdHJlYW0xLndwb3MgPSBzdHJlYW0ud3BvcztcclxuXHRcdFx0c3RyZWFtMS5ycG9zID0gc3RyZWFtLnJwb3MgLSA0O1xyXG5cdFx0XHRLQkVuZ2luZS5idWZmZXJlZENyZWF0ZUVudGl0eU1lc3NhZ2VzW2VpZF0gPSBzdHJlYW0xO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBjdXJyTW9kdWxlID0gS0JFbmdpbmUubW9kdWxlZGVmc1tlbnRpdHkuY2xhc3NOYW1lXTtcclxuXHRcdHZhciBwZGF0YXMgPSBjdXJyTW9kdWxlLnByb3BlcnR5cztcclxuXHRcdHdoaWxlKHN0cmVhbS5sZW5ndGgoKSA+IDApXHJcblx0XHR7XHJcblx0XHRcdHZhciB1dHlwZSA9IDA7XHJcblx0XHRcdGlmKGN1cnJNb2R1bGUudXNlUHJvcGVydHlEZXNjckFsaWFzKVxyXG5cdFx0XHRcdHV0eXBlID0gc3RyZWFtLnJlYWRVaW50OCgpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dXR5cGUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHJcblx0XHRcdHZhciBwcm9wZXJ0eWRhdGEgPSBwZGF0YXNbdXR5cGVdO1xyXG5cdFx0XHR2YXIgc2V0bWV0aG9kID0gcHJvcGVydHlkYXRhWzVdO1xyXG5cdFx0XHR2YXIgZmxhZ3MgPSBwcm9wZXJ0eWRhdGFbNl07XHJcblx0XHRcdHZhciB2YWwgPSBwcm9wZXJ0eWRhdGFbNF0uY3JlYXRlRnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHR2YXIgb2xkdmFsID0gZW50aXR5W3Byb3BlcnR5ZGF0YVsyXV07XHJcblx0XHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vblVwZGF0ZVByb3BlcnR5czogXCIgKyBlbnRpdHkuY2xhc3NOYW1lICsgXCIoaWQ9XCIgKyBlaWQgICsgXCIgXCIgKyBwcm9wZXJ0eWRhdGFbMl0gKyBcIiwgdmFsPVwiICsgdmFsICsgXCIpIVwiKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKHByb3BlcnR5ZGF0YVsyXT09XCJwb3NpdGlvblwiKXtcclxuXHRcdFx0XHRjYy5sb2coXCJ2YWwueVwiLHZhbC55KVxyXG5cdFx0XHRcdHZhbC55PTBcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0ZW50aXR5W3Byb3BlcnR5ZGF0YVsyXV0gPSB2YWw7XHJcblx0XHRcdGlmKHNldG1ldGhvZCAhPSBudWxsKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly8gYmFzZeexu+WxnuaAp+aIluiAhei/m+WFpeS4lueVjOWQjmNlbGznsbvlsZ7mgKfkvJrop6blj5FzZXRfKuaWueazlVxyXG5cdFx0XHRcdGlmKGZsYWdzID09IDB4MDAwMDAwMjAgfHwgZmxhZ3MgPT0gMHgwMDAwMDA0MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpZihlbnRpdHkuaW5pdGVkKVxyXG5cdFx0XHRcdFx0XHRzZXRtZXRob2QuY2FsbChlbnRpdHksIG9sZHZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpZihlbnRpdHkuaW5Xb3JsZCl7XHJcblx0XHRcdFx0XHRcdGNjLmxvZyhcInNldG1ldGhvZD1cIixzZXRtZXRob2QpXHJcblx0XHRcdFx0XHRcdHNldG1ldGhvZC5jYWxsKGVudGl0eSwgb2xkdmFsKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZVByb3BlcnR5c09wdGltaXplZCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdEtCRW5naW5lLmFwcC5vblVwZGF0ZVByb3BlcnR5c18oZWlkLCBzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZVByb3BlcnR5cyA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gc3RyZWFtLnJlYWRJbnQzMigpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLm9uVXBkYXRlUHJvcGVydHlzXyhlaWQsIHN0cmVhbSk7XHJcblx0fVxyXG5cclxuXHR0aGlzLm9uUmVtb3RlTWV0aG9kQ2FsbF8gPSBmdW5jdGlvbihlaWQsIHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRcclxuXHRcdGlmKGVudGl0eSA9PSB1bmRlZmluZWQpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25SZW1vdGVNZXRob2RDYWxsOiBlbnRpdHkoXCIgKyBlaWQgKyBcIikgbm90IGZvdW5kIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgbWV0aG9kVXR5cGUgPSAwO1xyXG5cdFx0aWYoS0JFbmdpbmUubW9kdWxlZGVmc1tlbnRpdHkuY2xhc3NOYW1lXS51c2VNZXRob2REZXNjckFsaWFzKVxyXG5cdFx0XHRtZXRob2RVdHlwZSA9IHN0cmVhbS5yZWFkVWludDgoKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bWV0aG9kVXR5cGUgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xyXG5cdFx0XHJcblx0XHR2YXIgbWV0aG9kZGF0YSA9IEtCRW5naW5lLm1vZHVsZWRlZnNbZW50aXR5LmNsYXNzTmFtZV0ubWV0aG9kc1ttZXRob2RVdHlwZV07XHJcblx0XHR2YXIgYXJncyA9IFtdO1xyXG5cdFx0dmFyIGFyZ3NkYXRhID0gbWV0aG9kZGF0YVszXTtcclxuXHRcdGZvcih2YXIgaT0wOyBpPGFyZ3NkYXRhLmxlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRhcmdzLnB1c2goYXJnc2RhdGFbaV0uY3JlYXRlRnJvbVN0cmVhbShzdHJlYW0pKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoZW50aXR5W21ldGhvZGRhdGFbMl1dICE9IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0ZW50aXR5W21ldGhvZGRhdGFbMl1dLmFwcGx5KGVudGl0eSwgYXJncyk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25SZW1vdGVNZXRob2RDYWxsOiBlbnRpdHkoXCIgKyBlaWQgKyBcIikgbm90IGZvdW5kIG1ldGhvZChcIiArIG1ldGhvZGRhdGFbMl0gKyBcIikhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblJlbW90ZU1ldGhvZENhbGxPcHRpbWl6ZWQgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRLQkVuZ2luZS5hcHAub25SZW1vdGVNZXRob2RDYWxsXyhlaWQsIHN0cmVhbSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uUmVtb3RlTWV0aG9kQ2FsbCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gc3RyZWFtLnJlYWRJbnQzMigpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLm9uUmVtb3RlTWV0aG9kQ2FsbF8oZWlkLCBzdHJlYW0pO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vbkVudGl0eUVudGVyV29ybGQgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IHN0cmVhbS5yZWFkSW50MzIoKTtcclxuXHRcdGlmKEtCRW5naW5lLmFwcC5lbnRpdHlfaWQgPiAwICYmIGVpZCAhPSBLQkVuZ2luZS5hcHAuZW50aXR5X2lkKVxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuZW50aXR5SURBbGlhc0lETGlzdC5wdXNoKGVpZClcclxuXHRcdFxyXG5cdFx0dmFyIGVudGl0eVR5cGU7XHJcblx0XHRpZihLQkVuZ2luZS5tb2R1bGVkZWZzLkxlbmd0aCA+IDI1NSlcclxuXHRcdFx0ZW50aXR5VHlwZSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdGVudGl0eVR5cGUgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XHJcblx0XHRcclxuXHRcdHZhciBpc09uR3JvdW5kID0gdHJ1ZTtcclxuXHRcdFxyXG5cdFx0aWYoc3RyZWFtLmxlbmd0aCgpID4gMClcclxuXHRcdFx0aXNPbkdyb3VuZCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0Y2MubG9nKFwiZW50aXR5VHlwZT1cIixlbnRpdHlUeXBlKVxyXG5cdFx0ZW50aXR5VHlwZSA9IEtCRW5naW5lLm1vZHVsZWRlZnNbZW50aXR5VHlwZV0ubmFtZTtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkVudGl0eUVudGVyV29ybGQ6IFwiICsgZW50aXR5VHlwZSArIFwiKFwiICsgZWlkICsgXCIpLCBzcGFjZUlEKFwiICsgS0JFbmdpbmUuYXBwLnNwYWNlSUQgKyBcIiksIGlzT25Hcm91bmQoXCIgKyBpc09uR3JvdW5kICsgXCIpIVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdO1xyXG5cdFx0aWYoZW50aXR5ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGVudGl0eU1lc3NhZ2UgPSBLQkVuZ2luZS5idWZmZXJlZENyZWF0ZUVudGl0eU1lc3NhZ2VzW2VpZF07XHJcblx0XHRcdGlmKGVudGl0eU1lc3NhZ2UgPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkVudGl0eUVudGVyV29ybGQ6IGVudGl0eShcIiArIGVpZCArIFwiKSBub3QgZm91bmQhXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dmFyIHJ1bmNsYXNzID0gS0JFbmdpbmUuYXBwLmdldGVudGl0eWNsYXNzKGVudGl0eVR5cGUpO1xyXG5cdFx0XHRpZihydW5jbGFzcyA9PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGVudGl0eSA9IG5ldyBydW5jbGFzcygpO1xyXG5cdFx0XHRlbnRpdHkuaWQgPSBlaWQ7XHJcblx0XHRcdGVudGl0eS5jbGFzc05hbWUgPSBlbnRpdHlUeXBlO1xyXG5cdFx0XHRcclxuXHRcdFx0ZW50aXR5LmNlbGwgPSBuZXcgS0JFbmdpbmUuRW50aXR5Q2FsbCgpO1xyXG5cdFx0XHRlbnRpdHkuY2VsbC5pZCA9IGVpZDtcclxuXHRcdFx0ZW50aXR5LmNlbGwuY2xhc3NOYW1lID0gZW50aXR5VHlwZTtcclxuXHRcdFx0ZW50aXR5LmNlbGwudHlwZSA9IEtCRW5naW5lLkVOVElUWUNBTExfVFlQRV9DRUxMO1xyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF0gPSBlbnRpdHk7XHJcblx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuQ2xpZW50X29uVXBkYXRlUHJvcGVydHlzKGVudGl0eU1lc3NhZ2UpO1xyXG5cdFx0XHRkZWxldGUgS0JFbmdpbmUuYnVmZmVyZWRDcmVhdGVFbnRpdHlNZXNzYWdlc1tlaWRdO1xyXG5cdFx0XHRcclxuXHRcdFx0ZW50aXR5LmlzT25Hcm91bmQgPSBpc09uR3JvdW5kID4gMDtcclxuXHRcdFx0ZW50aXR5Ll9faW5pdF9fKCk7XHJcblx0XHRcdGVudGl0eS5pbml0ZWQgPSB0cnVlO1xyXG5cdFx0XHRlbnRpdHkuaW5Xb3JsZCA9IHRydWU7XHJcblx0XHRcdGVudGl0eS5lbnRlcldvcmxkKCk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZihLQkVuZ2luZS5hcHAuYXJncy5pc09uSW5pdENhbGxQcm9wZXJ0eXNTZXRNZXRob2RzKVxyXG5cdFx0XHRcdGVudGl0eS5jYWxsUHJvcGVydHlzU2V0TWV0aG9kcygpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZW50aXR5LnNldF9kaXJlY3Rpb24oZW50aXR5LmRpcmVjdGlvbik7XHJcblx0XHRcdGVudGl0eS5zZXRfcG9zaXRpb24oZW50aXR5LnBvc2l0aW9uKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0aWYoIWVudGl0eS5pbldvcmxkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZW50aXR5LmNlbGwgPSBuZXcgS0JFbmdpbmUuRW50aXR5Q2FsbCgpO1xyXG5cdFx0XHRcdGVudGl0eS5jZWxsLmlkID0gZWlkO1xyXG5cdFx0XHRcdGVudGl0eS5jZWxsLmNsYXNzTmFtZSA9IGVudGl0eVR5cGU7XHJcblx0XHRcdFx0ZW50aXR5LmNlbGwudHlwZSA9IEtCRW5naW5lLkVOVElUWUNBTExfVFlQRV9DRUxMO1xyXG5cclxuXHRcdFx0XHQvLyDlronlhajotbfop4HvvIwg6L+Z6YeM5riF56m65LiA5LiLXHJcblx0XHRcdFx0Ly8g5aaC5p6c5pyN5Yqh56uv5LiK5L2/55SoZ2l2ZUNsaWVudFRv5YiH5o2i5o6n5Yi25p2DXHJcblx0XHRcdFx0Ly8g5LmL5YmN55qE5a6e5L2T5bey57uP6L+b5YWl5LiW55WM77yMIOWIh+aNouWQjueahOWunuS9k+S5n+i/m+WFpeS4lueVjO+8jCDov5nph4zlj6/og73kvJrmrovnlZnkuYvliY3pgqPkuKrlrp7kvZPov5vlhaXkuJbnlYznmoTkv6Hmga9cclxuXHRcdFx0XHRLQkVuZ2luZS5hcHAuZW50aXR5SURBbGlhc0lETGlzdCA9IFtdO1xyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5lbnRpdGllcyA9IHt9XHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7XHJcblxyXG5cdFx0XHRcdGVudGl0eS5zZXRfZGlyZWN0aW9uKGVudGl0eS5kaXJlY3Rpb24pO1xyXG5cdFx0XHRcdGVudGl0eS5zZXRfcG9zaXRpb24oZW50aXR5LnBvc2l0aW9uKTtcclxuXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy54ID0gZW50aXR5LnBvc2l0aW9uLng7XHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy55ID0gZW50aXR5LnBvc2l0aW9uLnk7XHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy56ID0gZW50aXR5LnBvc2l0aW9uLno7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZW50aXR5LmlzT25Hcm91bmQgPSBpc09uR3JvdW5kID4gMDtcclxuXHRcdFx0XHRlbnRpdHkuaW5Xb3JsZCA9IHRydWU7XHJcblx0XHRcdFx0ZW50aXR5LmVudGVyV29ybGQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihLQkVuZ2luZS5hcHAuYXJncy5pc09uSW5pdENhbGxQcm9wZXJ0eXNTZXRNZXRob2RzKVxyXG5cdFx0XHRcdFx0ZW50aXR5LmNhbGxQcm9wZXJ0eXNTZXRNZXRob2RzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uRW50aXR5TGVhdmVXb3JsZE9wdGltaXplZCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdEtCRW5naW5lLmFwcC5DbGllbnRfb25FbnRpdHlMZWF2ZVdvcmxkKGVpZCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uRW50aXR5TGVhdmVXb3JsZCA9IGZ1bmN0aW9uKGVpZClcclxuXHR7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRpZihlbnRpdHkgPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uRW50aXR5TGVhdmVXb3JsZDogZW50aXR5KFwiICsgZWlkICsgXCIpIG5vdCBmb3VuZCFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoZW50aXR5LmluV29ybGQpXHJcblx0XHRcdGVudGl0eS5sZWF2ZVdvcmxkKCk7XHJcblx0XHRcclxuXHRcdGlmKEtCRW5naW5lLmFwcC5lbnRpdHlfaWQgPiAwICYmIGVpZCAhPSBLQkVuZ2luZS5hcHAuZW50aXR5X2lkKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgbmV3QXJyYXkwID0gW107XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDsgaTxLQkVuZ2luZS5hcHAuY29udHJvbGxlZEVudGl0aWVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYoS0JFbmdpbmUuYXBwLmNvbnRyb2xsZWRFbnRpdGllc1tpXSAhPSBlaWQpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHQgICAgICAgXHRuZXdBcnJheTAucHVzaChLQkVuZ2luZS5hcHAuY29udHJvbGxlZEVudGl0aWVzW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkxvc2VDb250cm9sbGVkRW50aXR5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXMgPSBuZXdBcnJheTBcclxuXHRcdFx0XHRcclxuXHRcdFx0ZGVsZXRlIEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIG5ld0FycmF5ID0gW107XHJcblx0XHRcdGZvcih2YXIgaT0wOyBpPEtCRW5naW5lLmFwcC5lbnRpdHlJREFsaWFzSURMaXN0Lmxlbmd0aDsgaSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYoS0JFbmdpbmUuYXBwLmVudGl0eUlEQWxpYXNJRExpc3RbaV0gIT0gZWlkKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0FycmF5LnB1c2goS0JFbmdpbmUuYXBwLmVudGl0eUlEQWxpYXNJRExpc3RbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmVudGl0eUlEQWxpYXNJRExpc3QgPSBuZXdBcnJheVxyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5hcHAuY2xlYXJTcGFjZShmYWxzZSk7XHJcblx0XHRcdGVudGl0eS5jZWxsID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uRW50aXR5RGVzdHJveWVkID0gZnVuY3Rpb24oZWlkKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkVudGl0eURlc3Ryb3llZDogZW50aXR5KFwiICsgZWlkICsgXCIpIVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdO1xyXG5cdFx0aWYoZW50aXR5ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkVudGl0eURlc3Ryb3llZDogZW50aXR5KFwiICsgZWlkICsgXCIpIG5vdCBmb3VuZCFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihlbnRpdHkuaW5Xb3JsZClcclxuXHRcdHtcclxuXHRcdFx0aWYoS0JFbmdpbmUuYXBwLmVudGl0eV9pZCA9PSBlaWQpXHJcblx0XHRcdFx0S0JFbmdpbmUuYXBwLmNsZWFyU3BhY2UoZmFsc2UpO1xyXG5cclxuXHRcdFx0ZW50aXR5LmxlYXZlV29ybGQoKTtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHRkZWxldGUgS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uRW50aXR5RW50ZXJTcGFjZSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gc3RyZWFtLnJlYWRJbnQzMigpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNwYWNlSUQgPSBzdHJlYW0ucmVhZFVpbnQzMigpO1xyXG5cdFx0dmFyIGlzT25Hcm91bmQgPSB0cnVlO1xyXG5cdFx0XHJcblx0XHRpZihzdHJlYW0ubGVuZ3RoKCkgPiAwKVxyXG5cdFx0XHRpc09uR3JvdW5kID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHRcclxuXHRcdHZhciBlbnRpdHkgPSBLQkVuZ2luZS5hcHAuZW50aXRpZXNbZWlkXTtcclxuXHRcdGlmKGVudGl0eSA9PSB1bmRlZmluZWQpXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25FbnRpdHlFbnRlclNwYWNlOiBlbnRpdHkoXCIgKyBlaWQgKyBcIikgbm90IGZvdW5kIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRlbnRpdHkuaXNPbkdyb3VuZCA9IGlzT25Hcm91bmQ7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zLnggPSBlbnRpdHkucG9zaXRpb24ueDtcclxuXHRcdEtCRW5naW5lLmFwcC5lbnRpdHlTZXJ2ZXJQb3MueSA9IGVudGl0eS5wb3NpdGlvbi55O1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy56ID0gZW50aXR5LnBvc2l0aW9uLno7XHJcblx0XHRlbnRpdHkuZW50ZXJTcGFjZSgpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vbkVudGl0eUxlYXZlU3BhY2UgPSBmdW5jdGlvbihlaWQpXHJcblx0e1xyXG5cdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdO1xyXG5cdFx0aWYoZW50aXR5ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbkVudGl0eUxlYXZlU3BhY2U6IGVudGl0eShcIiArIGVpZCArIFwiKSBub3QgZm91bmQhXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5jbGVhclNwYWNlKGZhbHNlKTtcclxuXHRcdGVudGl0eS5sZWF2ZVNwYWNlKCk7XHJcblx0fVxyXG5cclxuXHR0aGlzLkNsaWVudF9vbktpY2tlZCA9IGZ1bmN0aW9uKGZhaWxlZGNvZGUpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuRVJST1JfTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vbktpY2tlZDogZmFpbGVkY29kZShcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnJzW2ZhaWxlZGNvZGVdLm5hbWUgKyBcIikhXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uS2lja2VkLCBmYWlsZWRjb2RlKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uQ3JlYXRlQWNjb3VudFJlc3VsdCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgcmV0Y29kZSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XHJcblx0XHR2YXIgZGF0YXMgPSBzdHJlYW0ucmVhZEJsb2IoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uQ3JlYXRlQWNjb3VudFJlc3VsdCwgcmV0Y29kZSwgZGF0YXMpO1xyXG5cdFx0XHJcblx0XHRpZihyZXRjb2RlICE9IDApXHJcblx0XHR7XHJcblx0XHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25DcmVhdGVBY2NvdW50UmVzdWx0OiBcIiArIEtCRW5naW5lLmFwcC51c2VybmFtZSArIFwiIGNyZWF0ZSBpcyBmYWlsZWQhIGNvZGU9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyc1tyZXRjb2RlXS5uYW1lICsgXCIhXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uQ3JlYXRlQWNjb3VudFJlc3VsdDogXCIgKyBLQkVuZ2luZS5hcHAudXNlcm5hbWUgKyBcIiBjcmVhdGUgaXMgc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uQ29udHJvbEVudGl0eSA9IGZ1bmN0aW9uKGVpZCwgaXNDb250cm9sbGVkKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBzdHJlYW0ucmVhZEludDMyKCk7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRpZihlbnRpdHkgPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uQ29udHJvbEVudGl0eTogZW50aXR5KFwiICsgZWlkICsgXCIpIG5vdCBmb3VuZCFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIGlzQ29udCA9IGlzQ29udHJvbGxlZCAhPSAwO1xyXG5cdFx0aWYgKGlzQ29udClcclxuXHRcdHtcclxuXHRcdFx0Ly8g5aaC5p6c6KKr5o6n5Yi26ICF5piv546p5a626Ieq5bex77yM6YKj6KGo56S6546p5a626Ieq5bex6KKr5YW25a6D5Lq65o6n5Yi25LqGXHJcblx0XHRcdC8vIOaJgOS7peeOqeWutuiHquW3seS4jeW6lOivpei/m+WFpei/meS4quiiq+aOp+WItuWIl+ihqFxyXG5cdFx0XHRpZiAoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkICE9IGVudGl0eS5pZClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXMucHVzaChlbnRpdHkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0dmFyIG5ld0FycmF5ID0gW107XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDsgaTxLQkVuZ2luZS5hcHAuY29udHJvbGxlZEVudGl0aWVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdGlmKEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXNbaV0gIT0gZW50aXR5LmlkKVxyXG5cdFx0XHQgICAgICAgXHRuZXdBcnJheS5wdXNoKEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXNbaV0pO1xyXG5cdFx0XHRcclxuXHRcdFx0S0JFbmdpbmUuYXBwLmNvbnRyb2xsZWRFbnRpdGllcyA9IG5ld0FycmF5XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGVudGl0eS5pc0NvbnRyb2xsZWQgPSBpc0NvbnQ7XHJcblx0XHRcclxuXHRcdHRyeVxyXG5cdFx0e1xyXG5cdFx0XHRlbnRpdHkub25Db250cm9sbGVkKGlzQ29udCk7XHJcblx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5vbkNvbnRyb2xsZWQsIGVudGl0eSwgaXNDb250KTtcclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZTo6Q2xpZW50X29uQ29udHJvbEVudGl0eTogZW50aXR5IGlkID0gJ1wiICsgZWlkICsgXCInLCBpcyBjb250cm9sbGVkID0gJ1wiICsgaXNDb250ICsgXCInLCBlcnJvciA9ICdcIiArIGUgKyBcIidcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0aGlzLnVwZGF0ZVBsYXllclRvU2VydmVyID0gZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcblx0XHRpZihwbGF5ZXIgPT0gdW5kZWZpbmVkIHx8IHBsYXllci5pbldvcmxkID09IGZhbHNlIHx8IEtCRW5naW5lLmFwcC5zcGFjZUlEID09IDAgfHwgcGxheWVyLmlzQ29udHJvbGxlZClcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0XHJcblx0XHRpZihwbGF5ZXIuZW50aXR5TGFzdExvY2FsUG9zLmRpc3RhbmNlKHBsYXllci5wb3NpdGlvbikgPiAwLjAwMSB8fCBwbGF5ZXIuZW50aXR5TGFzdExvY2FsRGlyLmRpc3RhbmNlKHBsYXllci5kaXJlY3Rpb24pID4gMC4wMDEpXHJcblx0XHR7XHJcblx0XHRcdC8vIOiusOW9leeOqeWutuacgOWQjuS4gOasoeS4iuaKpeS9jee9ruaXtuiHqui6q+W9k+WJjeeahOS9jee9rlxyXG5cdFx0XHRwbGF5ZXIuZW50aXR5TGFzdExvY2FsUG9zLnggPSBwbGF5ZXIucG9zaXRpb24ueDtcclxuXHRcdFx0cGxheWVyLmVudGl0eUxhc3RMb2NhbFBvcy55ID0gcGxheWVyLnBvc2l0aW9uLnk7XHJcblx0XHRcdHBsYXllci5lbnRpdHlMYXN0TG9jYWxQb3MueiA9IHBsYXllci5wb3NpdGlvbi56O1xyXG5cdFx0XHRwbGF5ZXIuZW50aXR5TGFzdExvY2FsRGlyLnggPSBwbGF5ZXIuZGlyZWN0aW9uLng7XHJcblx0XHRcdHBsYXllci5lbnRpdHlMYXN0TG9jYWxEaXIueSA9IHBsYXllci5kaXJlY3Rpb24ueTtcclxuXHRcdFx0cGxheWVyLmVudGl0eUxhc3RMb2NhbERpci56ID0gcGxheWVyLmRpcmVjdGlvbi56O1x0XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdHZhciBidW5kbGUgPSBuZXcgS0JFbmdpbmUuQnVuZGxlKCk7XHJcblx0XHRcdGJ1bmRsZS5uZXdNZXNzYWdlKEtCRW5naW5lLm1lc3NhZ2VzLkJhc2VhcHBfb25VcGRhdGVEYXRhRnJvbUNsaWVudCk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBsYXllci5wb3NpdGlvbi54KTtcclxuXHRcdFx0YnVuZGxlLndyaXRlRmxvYXQocGxheWVyLnBvc2l0aW9uLnkpO1xyXG5cdFx0XHRidW5kbGUud3JpdGVGbG9hdChwbGF5ZXIucG9zaXRpb24ueik7XHJcblx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBsYXllci5kaXJlY3Rpb24ueCk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBsYXllci5kaXJlY3Rpb24ueSk7XHJcblx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBsYXllci5kaXJlY3Rpb24ueik7XHJcblx0XHRcdGJ1bmRsZS53cml0ZVVpbnQ4KHBsYXllci5pc09uR3JvdW5kKTtcclxuXHRcdFx0YnVuZGxlLndyaXRlVWludDMyKEtCRW5naW5lLmFwcC5zcGFjZUlEKTtcclxuXHRcdFx0YnVuZGxlLnNlbmQoS0JFbmdpbmUuYXBwKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Ly8g5byA5aeL5ZCM5q2l5omA5pyJ6KKr5o6n5Yi25LqG55qEZW50aXR555qE5L2N572uXHJcblx0XHRmb3IgKHZhciBlaWQgaW4gS0JFbmdpbmUuYXBwLmNvbnRyb2xsZWRFbnRpdGllcykgIFxyXG5cdFx0eyBcclxuXHRcdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXNbaV07XHJcblx0XHRcdHBvc2l0aW9uID0gZW50aXR5LnBvc2l0aW9uO1xyXG5cdFx0XHRkaXJlY3Rpb24gPSBlbnRpdHkuZGlyZWN0aW9uO1xyXG5cclxuXHRcdFx0cG9zSGFzQ2hhbmdlZCA9IGVudGl0eS5lbnRpdHlMYXN0TG9jYWxQb3MuZGlzdGFuY2UocG9zaXRpb24pID4gMC4wMDE7XHJcblx0XHRcdGRpckhhc0NoYW5nZWQgPSBlbnRpdHkuZW50aXR5TGFzdExvY2FsRGlyLmRpc3RhbmNlKGRpcmVjdGlvbikgPiAwLjAwMTtcclxuXHJcblx0XHRcdGlmIChwb3NIYXNDaGFuZ2VkIHx8IGRpckhhc0NoYW5nZWQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRlbnRpdHkuZW50aXR5TGFzdExvY2FsUG9zID0gcG9zaXRpb247XHJcblx0XHRcdFx0ZW50aXR5LmVudGl0eUxhc3RMb2NhbERpciA9IGRpcmVjdGlvbjtcclxuXHJcblx0XHRcdFx0dmFyIGJ1bmRsZSA9IG5ldyBLQkVuZ2luZS5CdW5kbGUoKTtcclxuXHRcdFx0XHRidW5kbGUubmV3TWVzc2FnZShLQkVuZ2luZS5tZXNzYWdlcy5CYXNlYXBwX29uVXBkYXRlRGF0YUZyb21DbGllbnRGb3JDb250cm9sbGVkRW50aXR5KTtcclxuXHRcdFx0XHRidW5kbGUud3JpdGVJbnQzMihlbnRpdHkuaWQpO1xyXG5cdFx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBvc2l0aW9uLngpO1xyXG5cdFx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBvc2l0aW9uLnkpO1xyXG5cdFx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KHBvc2l0aW9uLnopO1xyXG5cclxuXHRcdFx0XHRidW5kbGUud3JpdGVGbG9hdChkaXJlY3Rpb24ueCk7XHJcblx0XHRcdFx0YnVuZGxlLndyaXRlRmxvYXQoZGlyZWN0aW9uLnkpO1xyXG5cdFx0XHRcdGJ1bmRsZS53cml0ZUZsb2F0KGRpcmVjdGlvbi56KTtcclxuXHRcdFx0XHRidW5kbGUud3JpdGVVaW50OChlbnRpdHkuaXNPbkdyb3VuZCk7XHJcblx0XHRcdFx0YnVuZGxlLndyaXRlVWludDMyKEtCRW5naW5lLmFwcC5zcGFjZUlEKTtcclxuXHRcdFx0XHRidW5kbGUuc2VuZChLQkVuZ2luZS5hcHApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuYWRkU3BhY2VHZW9tZXRyeU1hcHBpbmcgPSBmdW5jdGlvbihzcGFjZUlELCByZXNwYXRoKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OmFkZFNwYWNlR2VvbWV0cnlNYXBwaW5nOiBzcGFjZUlEKFwiICsgc3BhY2VJRCArIFwiKSwgcmVzcGF0aChcIiArIHJlc3BhdGggKyBcIikhXCIpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuc3BhY2VJRCA9IHNwYWNlSUQ7XHJcblx0XHRLQkVuZ2luZS5hcHAuc3BhY2VSZXNQYXRoID0gcmVzcGF0aDtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy5hZGRTcGFjZUdlb21ldHJ5TWFwcGluZywgcmVzcGF0aCk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmNsZWFyU3BhY2UgPSBmdW5jdGlvbihpc0FsbClcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5SURBbGlhc0lETGlzdCA9IFtdO1xyXG5cdFx0S0JFbmdpbmUuYXBwLnNwYWNlZGF0YSA9IHt9O1xyXG5cdFx0S0JFbmdpbmUuYXBwLmNsZWFyRW50aXRpZXMoaXNBbGwpO1xyXG5cdFx0S0JFbmdpbmUuYXBwLmlzTG9hZGVkR2VvbWV0cnkgPSBmYWxzZTtcclxuXHRcdEtCRW5naW5lLmFwcC5zcGFjZUlEID0gMDtcclxuXHR9XHJcblxyXG5cdHRoaXMuY2xlYXJFbnRpdGllcyA9IGZ1bmN0aW9uKGlzQWxsKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLmFwcC5jb250cm9sbGVkRW50aXRpZXMgPSBbXVxyXG5cclxuXHRcdGlmKCFpc0FsbClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGVudGl0eSA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvciAodmFyIGVpZCBpbiBLQkVuZ2luZS5hcHAuZW50aXRpZXMpICBcclxuXHRcdFx0eyBcclxuXHRcdFx0XHRpZihlaWQgPT0gZW50aXR5LmlkKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF0uaW5Xb3JsZClcclxuXHRcdFx0XHR7XHJcblx0XHRcdCAgICBcdEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdLmxlYXZlV29ybGQoKTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF0ub25EZXN0cm95KCk7XHJcblx0XHRcdH0gIFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuZW50aXRpZXMgPSB7fVxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0Zm9yICh2YXIgZWlkIGluIEtCRW5naW5lLmFwcC5lbnRpdGllcykgIFxyXG5cdFx0XHR7IFxyXG5cdFx0XHRcdGlmKEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdLmluV29ybGQpXHJcblx0XHRcdCAgICB7XHJcblx0XHRcdCAgICBcdEtCRW5naW5lLmFwcC5lbnRpdGllc1tlaWRdLmxlYXZlV29ybGQoKTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF0ub25EZXN0cm95KCk7XHJcblx0XHRcdH0gIFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuZW50aXRpZXMgPSB7fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy5DbGllbnRfaW5pdFNwYWNlRGF0YSA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5hcHAuY2xlYXJTcGFjZShmYWxzZSk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5zcGFjZUlEID0gc3RyZWFtLnJlYWRJbnQzMigpO1xyXG5cdFx0d2hpbGUoc3RyZWFtLmxlbmd0aCgpID4gMClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGtleSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcdHZhciB2YWx1ZSA9IHN0cmVhbS5yZWFkU3RyaW5nKCk7XHJcblx0XHRcdEtCRW5naW5lLmFwcC5DbGllbnRfc2V0U3BhY2VEYXRhKEtCRW5naW5lLmFwcC5zcGFjZUlELCBrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHRcdC8vS0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLm9uU2V0U3BhY2VEYXRhKTtcclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9pbml0U3BhY2VEYXRhOiBzcGFjZUlEKFwiICsgS0JFbmdpbmUuYXBwLnNwYWNlSUQgKyBcIiksIGRhdGFzKFwiICsgS0JFbmdpbmUuYXBwLnNwYWNlZGF0YSArIFwiKSFcIik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X3NldFNwYWNlRGF0YSA9IGZ1bmN0aW9uKHNwYWNlSUQsIGtleSwgdmFsdWUpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X3NldFNwYWNlRGF0YTogc3BhY2VJRChcIiArIHNwYWNlSUQgKyBcIiksIGtleShcIiArIGtleSArIFwiKSwgdmFsdWUoXCIgKyB2YWx1ZSArIFwiKSFcIik7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5zcGFjZWRhdGFba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHJcblx0XHRpZihrZXkgPT0gXCJfbWFwcGluZ1wiKVxyXG5cdFx0XHRLQkVuZ2luZS5hcHAuYWRkU3BhY2VHZW9tZXRyeU1hcHBpbmcoc3BhY2VJRCwgdmFsdWUpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TZXRTcGFjZURhdGEsIHNwYWNlSUQsIGtleSwgdmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9kZWxTcGFjZURhdGEgPSBmdW5jdGlvbihzcGFjZUlELCBrZXkpXHJcblx0e1xyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X2RlbFNwYWNlRGF0YTogc3BhY2VJRChcIiArIHNwYWNlSUQgKyBcIiksIGtleShcIiArIGtleSArIFwiKSFcIik7XHJcblx0XHRcclxuXHRcdGRlbGV0ZSBLQkVuZ2luZS5hcHAuc3BhY2VkYXRhW2tleV07XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25EZWxTcGFjZURhdGEsIHNwYWNlSUQsIGtleSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X2dldFNwYWNlRGF0YSA9IGZ1bmN0aW9uKHNwYWNlSUQsIGtleSlcclxuXHR7XHJcblx0XHRyZXR1cm4gS0JFbmdpbmUuYXBwLnNwYWNlZGF0YVtrZXldO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZUJhc2VQb3MgPSBmdW5jdGlvbih4LCB5LCB6KVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLmFwcC5lbnRpdHlTZXJ2ZXJQb3MueCA9IHg7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zLnkgPSB5O1xyXG5cdFx0S0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy56ID0gejtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVCYXNlUG9zWFogPSBmdW5jdGlvbih4LCB6KVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLmFwcC5lbnRpdHlTZXJ2ZXJQb3MueCA9IHg7XHJcblx0XHRLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zLnogPSB6O1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGEgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRpZihlbnRpdHkgPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uVXBkYXRlRGF0YTogZW50aXR5KFwiICsgZWlkICsgXCIpIG5vdCBmb3VuZCFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMuQ2xpZW50X29uU2V0RW50aXR5UG9zQW5kRGlyID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBzdHJlYW0ucmVhZEludDMyKCk7XHJcblx0XHR2YXIgZW50aXR5ID0gS0JFbmdpbmUuYXBwLmVudGl0aWVzW2VpZF07XHJcblx0XHRpZihlbnRpdHkgPT0gdW5kZWZpbmVkKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uU2V0RW50aXR5UG9zQW5kRGlyOiBlbnRpdHkoXCIgKyBlaWQgKyBcIikgbm90IGZvdW5kIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRlbnRpdHkucG9zaXRpb24ueCA9IHN0cmVhbS5yZWFkRmxvYXQoKTtcclxuXHRcdGVudGl0eS5wb3NpdGlvbi55ID0gc3RyZWFtLnJlYWRGbG9hdCgpO1xyXG5cdFx0ZW50aXR5LnBvc2l0aW9uLnogPSBzdHJlYW0ucmVhZEZsb2F0KCk7XHJcblx0XHRlbnRpdHkuZGlyZWN0aW9uLnggPSBzdHJlYW0ucmVhZEZsb2F0KCk7XHJcblx0XHRlbnRpdHkuZGlyZWN0aW9uLnkgPSBzdHJlYW0ucmVhZEZsb2F0KCk7XHJcblx0XHRlbnRpdHkuZGlyZWN0aW9uLnogPSBzdHJlYW0ucmVhZEZsb2F0KCk7XHJcblx0XHRcclxuXHRcdC8vIOiusOW9leeOqeWutuacgOWQjuS4gOasoeS4iuaKpeS9jee9ruaXtuiHqui6q+W9k+WJjeeahOS9jee9rlxyXG5cdFx0ZW50aXR5LmVudGl0eUxhc3RMb2NhbFBvcy54ID0gZW50aXR5LnBvc2l0aW9uLng7XHJcblx0XHRlbnRpdHkuZW50aXR5TGFzdExvY2FsUG9zLnkgPSBlbnRpdHkucG9zaXRpb24ueTtcclxuXHRcdGVudGl0eS5lbnRpdHlMYXN0TG9jYWxQb3MueiA9IGVudGl0eS5wb3NpdGlvbi56O1xyXG5cdFx0ZW50aXR5LmVudGl0eUxhc3RMb2NhbERpci54ID0gZW50aXR5LmRpcmVjdGlvbi54O1xyXG5cdFx0ZW50aXR5LmVudGl0eUxhc3RMb2NhbERpci55ID0gZW50aXR5LmRpcmVjdGlvbi55O1xyXG5cdFx0ZW50aXR5LmVudGl0eUxhc3RMb2NhbERpci56ID0gZW50aXR5LmRpcmVjdGlvbi56O1x0XHJcblx0XHRcdFx0XHJcblx0XHRlbnRpdHkuc2V0X2RpcmVjdGlvbihlbnRpdHkuZGlyZWN0aW9uKTtcclxuXHRcdGVudGl0eS5zZXRfcG9zaXRpb24oZW50aXR5LnBvc2l0aW9uKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3lwciA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdHZhciBwID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHksIHAsIHIsIC0xKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3lwID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeSA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0dmFyIHAgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCB5LCBwLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgLTEpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfeXIgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHksIEtCRW5naW5lLktCRV9GTFRfTUFYLCByLCAtMSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uVXBkYXRlRGF0YV9wciA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHAgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdHZhciByID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5fdXBkYXRlVm9sYXRpbGVEYXRhKGVpZCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHAsIHIsIC0xKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3kgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5fdXBkYXRlVm9sYXRpbGVEYXRhKGVpZCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeSwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCAtMSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uVXBkYXRlRGF0YV9wID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgcCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBwLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgLTEpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfciA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHIgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHIsIC0xKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h6ID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeHpbMV0sIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIDEpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfeHpfeXByID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgcCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0dmFyIHIgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCB4elswXSwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHh6WzFdLCB5LCBwLCByLCAxKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h6X3lwID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgcCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeHpbMV0sIHksIHAsIEtCRW5naW5lLktCRV9GTFRfTUFYLCAxKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h6X3lyID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeHpbMV0sIHksIEtCRW5naW5lLktCRV9GTFRfTUFYLCByLCAxKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h6X3ByID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cclxuXHRcdHZhciBwID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeHpbMV0sIEtCRW5naW5lLktCRV9GTFRfTUFYLCBwLCByLCAxKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h6X3kgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcclxuXHRcdHZhciB4eiA9IHN0cmVhbS5yZWFkUGFja1haKCk7XHJcblxyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCB4elswXSwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHh6WzFdLCB5LCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIDEpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfeHpfcCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHh6ID0gc3RyZWFtLnJlYWRQYWNrWFooKTtcclxuXHJcblx0XHR2YXIgcCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgeHpbMV0sIEtCRW5naW5lLktCRV9GTFRfTUFYLCBwLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgMSk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uVXBkYXRlRGF0YV94el9yID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cclxuXHRcdHZhciByID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5fdXBkYXRlVm9sYXRpbGVEYXRhKGVpZCwgeHpbMF0sIEtCRW5naW5lLktCRV9GTFRfTUFYLCB4elsxXSwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCByLCAxKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h5eiA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHh6ID0gc3RyZWFtLnJlYWRQYWNrWFooKTtcclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRQYWNrWSgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCB5LCB4elsxXSwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgMCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uVXBkYXRlRGF0YV94eXpfeXByID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZFBhY2tZKCk7XHJcblx0XHRcclxuXHRcdHZhciB5YXcgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdHZhciBwID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCB5LCB4elsxXSwgeWF3LCBwLCByLCAwKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h5el95cCA9IGZ1bmN0aW9uKHN0cmVhbSlcclxuXHR7XHJcblx0XHR2YXIgZWlkID0gS0JFbmdpbmUuYXBwLmdldFZpZXdFbnRpdHlJREZyb21TdHJlYW0oc3RyZWFtKTtcclxuXHRcdFxyXG5cdFx0dmFyIHh6ID0gc3RyZWFtLnJlYWRQYWNrWFooKTtcclxuXHRcdHZhciB5ID0gc3RyZWFtLnJlYWRQYWNrWSgpO1xyXG5cdFx0XHJcblx0XHR2YXIgeWF3ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgcCA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHh6WzBdLCB5LCB4elsxXSwgeWF3LCBwLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgMCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uVXBkYXRlRGF0YV94eXpfeXIgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcclxuXHRcdHZhciB4eiA9IHN0cmVhbS5yZWFkUGFja1haKCk7XHJcblx0XHR2YXIgeSA9IHN0cmVhbS5yZWFkUGFja1koKTtcclxuXHRcdFxyXG5cdFx0dmFyIHlhdyA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0dmFyIHIgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCB4elswXSwgeSwgeHpbMV0sIHlhdywgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIHIsIDApO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfeHl6X3ByID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZFBhY2tZKCk7XHJcblx0XHRcclxuXHRcdHZhciBwID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHR2YXIgciA9IHN0cmVhbS5yZWFkSW50OCgpO1xyXG5cdFx0XHJcblx0XHRLQkVuZ2luZS5hcHAuX3VwZGF0ZVZvbGF0aWxlRGF0YShlaWQsIHgsIHksIHosIEtCRW5naW5lLktCRV9GTFRfTUFYLCBwLCByLCAwKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h5el95ID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZFBhY2tZKCk7XHJcblx0XHRcclxuXHRcdHZhciB5YXcgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCB4elswXSwgeSwgeHpbMV0sIHlhdywgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIEtCRW5naW5lLktCRV9GTFRfTUFYLCAwKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25VcGRhdGVEYXRhX3h5el9wID0gZnVuY3Rpb24oc3RyZWFtKVxyXG5cdHtcclxuXHRcdHZhciBlaWQgPSBLQkVuZ2luZS5hcHAuZ2V0Vmlld0VudGl0eUlERnJvbVN0cmVhbShzdHJlYW0pO1xyXG5cdFx0XHJcblx0XHR2YXIgeHogPSBzdHJlYW0ucmVhZFBhY2tYWigpO1xyXG5cdFx0dmFyIHkgPSBzdHJlYW0ucmVhZFBhY2tZKCk7XHJcblx0XHRcclxuXHRcdHZhciBwID0gc3RyZWFtLnJlYWRJbnQ4KCk7XHJcblx0XHRcclxuXHRcdEtCRW5naW5lLmFwcC5fdXBkYXRlVm9sYXRpbGVEYXRhKGVpZCwgeHpbMF0sIHksIHh6WzFdLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgcCwgS0JFbmdpbmUuS0JFX0ZMVF9NQVgsIDApO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblVwZGF0ZURhdGFfeHl6X3IgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGVpZCA9IEtCRW5naW5lLmFwcC5nZXRWaWV3RW50aXR5SURGcm9tU3RyZWFtKHN0cmVhbSk7XHJcblx0XHRcclxuXHRcdHZhciB4eiA9IHN0cmVhbS5yZWFkUGFja1haKCk7XHJcblx0XHR2YXIgeSA9IHN0cmVhbS5yZWFkUGFja1koKTtcclxuXHRcdFxyXG5cdFx0dmFyIHAgPSBzdHJlYW0ucmVhZEludDgoKTtcclxuXHRcdFxyXG5cdFx0S0JFbmdpbmUuYXBwLl91cGRhdGVWb2xhdGlsZURhdGEoZWlkLCB4elswXSwgeSwgeHpbMV0sIHIsIEtCRW5naW5lLktCRV9GTFRfTUFYLCBLQkVuZ2luZS5LQkVfRkxUX01BWCwgMCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuX3VwZGF0ZVZvbGF0aWxlRGF0YSA9IGZ1bmN0aW9uKGVudGl0eUlELCB4LCB5LCB6LCB5YXcsIHBpdGNoLCByb2xsLCBpc09uR3JvdW5kKVxyXG5cdHtcclxuXHRcdHZhciBlbnRpdHkgPSBLQkVuZ2luZS5hcHAuZW50aXRpZXNbZW50aXR5SURdO1xyXG5cdFx0aWYoZW50aXR5ID09IHVuZGVmaW5lZClcclxuXHRcdHtcclxuXHRcdFx0Ly8g5aaC5p6c5Li6MOS4lOWuouaIt+err+S4iuS4gOatpeaYr+mHjeeZu+mZhuaIluiAhemHjei/nuaTjeS9nOW5tuS4lOacjeWKoeerr2VudGl0eeWcqOaWree6v+acn+mXtOS4gOebtOWkhOS6juWcqOe6v+eKtuaAgVxyXG5cdFx0XHQvLyDliJnlj6/ku6Xlv73nlaXov5nkuKrplJnor68sIOWboOS4umNlbGxhcHDlj6/og73kuIDnm7TlnKjlkJFiYXNlYXBw5Y+R6YCB5ZCM5q2l5raI5oGv77yMIOW9k+WuouaIt+err+mHjei/nuS4iuaXtuacquetiVxyXG5cdFx0XHQvLyDmnI3liqHnq6/liJ3lp4vljJbmraXpqqTlvIDlp4vliJnmlLbliLDlkIzmraXkv6Hmga8sIOatpOaXtui/memHjOWwseS8muWHuumUmeOAglx0XHRcdFxyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6X3VwZGF0ZVZvbGF0aWxlRGF0YTogZW50aXR5KFwiICsgZW50aXR5SUQgKyBcIikgbm90IGZvdW5kIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvLyDlsI/kuo4w5LiN6K6+572uXHJcblx0XHRpZihpc09uR3JvdW5kID49IDApXHJcblx0XHR7XHJcblx0XHRcdGVudGl0eS5pc09uR3JvdW5kID0gKGlzT25Hcm91bmQgPiAwKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIGNoYW5nZURpcmVjdGlvbiA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHRpZihyb2xsICE9IEtCRW5naW5lLktCRV9GTFRfTUFYKVxyXG5cdFx0e1xyXG5cdFx0XHRjaGFuZ2VEaXJlY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHRlbnRpdHkuZGlyZWN0aW9uLnggPSBLQkVuZ2luZS5pbnQ4MmFuZ2xlKHJvbGwsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihwaXRjaCAhPSBLQkVuZ2luZS5LQkVfRkxUX01BWClcclxuXHRcdHtcclxuXHRcdFx0Y2hhbmdlRGlyZWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0ZW50aXR5LmRpcmVjdGlvbi55ID0gS0JFbmdpbmUuaW50ODJhbmdsZShwaXRjaCwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih5YXcgIT0gS0JFbmdpbmUuS0JFX0ZMVF9NQVgpXHJcblx0XHR7XHJcblx0XHRcdGNoYW5nZURpcmVjdGlvbiA9IHRydWU7XHJcblx0XHRcdGVudGl0eS5kaXJlY3Rpb24ueiA9IEtCRW5naW5lLmludDgyYW5nbGUoeWF3LCBmYWxzZSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBkb25lID0gZmFsc2U7XHJcblx0XHRpZihjaGFuZ2VEaXJlY3Rpb24gPT0gdHJ1ZSlcclxuXHRcdHtcclxuXHRcdFx0S0JFbmdpbmUuRXZlbnQuZmlyZShLQkVuZ2luZS5FdmVudFR5cGVzLnNldF9kaXJlY3Rpb24sIGVudGl0eSk7XHRcdFxyXG5cdFx0XHRkb25lID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIHBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0aWYoeCAhPSBLQkVuZ2luZS5LQkVfRkxUX01BWCB8fCB5ICE9IEtCRW5naW5lLktCRV9GTFRfTUFYIHx8IHogIT0gS0JFbmdpbmUuS0JFX0ZMVF9NQVgpXHJcblx0XHRcdHBvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XHJcblxyXG5cdFx0aWYgKHggPT0gS0JFbmdpbmUuS0JFX0ZMVF9NQVgpIHggPSAwLjA7XHJcblx0XHRpZiAoeSA9PSBLQkVuZ2luZS5LQkVfRkxUX01BWCkgeSA9IDAuMDtcclxuXHRcdGlmICh6ID09IEtCRW5naW5lLktCRV9GTFRfTUFYKSB6ID0gMC4wO1xyXG4gICAgICAgIFxyXG5cdFx0aWYocG9zaXRpb25DaGFuZ2VkKVxyXG5cdFx0e1xyXG5cdFx0XHRlbnRpdHkucG9zaXRpb24ueCA9IHggKyBLQkVuZ2luZS5hcHAuZW50aXR5U2VydmVyUG9zLng7XHJcblx0XHRcdGVudGl0eS5wb3NpdGlvbi55ID0geSArIEtCRW5naW5lLmFwcC5lbnRpdHlTZXJ2ZXJQb3MueTtcclxuXHRcdFx0ZW50aXR5LnBvc2l0aW9uLnogPSB6ICsgS0JFbmdpbmUuYXBwLmVudGl0eVNlcnZlclBvcy56O1xyXG5cdFx0XHRcclxuXHRcdFx0ZG9uZSA9IHRydWU7XHJcblx0XHRcdEtCRW5naW5lLkV2ZW50LmZpcmUoS0JFbmdpbmUuRXZlbnRUeXBlcy51cGRhdGVQb3NpdGlvbiwgZW50aXR5KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoZG9uZSlcclxuXHRcdFx0ZW50aXR5Lm9uVXBkYXRlVm9sYXRpbGVEYXRhKCk7XHRcdFxyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblN0cmVhbURhdGFTdGFydGVkID0gZnVuY3Rpb24oaWQsIGRhdGFzaXplLCBkZXNjcilcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TdHJlYW1EYXRhU3RhcnRlZCwgaWQsIGRhdGFzaXplLCBkZXNjcik7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uU3RyZWFtRGF0YVJlY3YgPSBmdW5jdGlvbihzdHJlYW0pXHJcblx0e1xyXG5cdFx0dmFyIGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcclxuXHRcdHZhciBkYXRhID0gc3RyZWFtLnJlYWRCbG9iKCk7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TdHJlYW1EYXRhUmVjdiwgaWQsIGRhdGEpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblN0cmVhbURhdGFDb21wbGV0ZWQgPSBmdW5jdGlvbihpZClcclxuXHR7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5maXJlKEtCRW5naW5lLkV2ZW50VHlwZXMub25TdHJlYW1EYXRhQ29tcGxldGVkLCBpZCk7XHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuQ2xpZW50X29uUmVxQWNjb3VudFJlc2V0UGFzc3dvcmRDQiA9IGZ1bmN0aW9uKGZhaWxlZGNvZGUpXHJcblx0e1xyXG5cdFx0aWYoZmFpbGVkY29kZSAhPSAwKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uUmVxQWNjb3VudFJlc2V0UGFzc3dvcmRDQjogXCIgKyBLQkVuZ2luZS5hcHAudXNlcm5hbWUgKyBcIiBpcyBmYWlsZWQhIGNvZGU9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyc1tmYWlsZWRjb2RlXS5uYW1lICsgXCIhXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0S0JFbmdpbmUuSU5GT19NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uUmVxQWNjb3VudFJlc2V0UGFzc3dvcmRDQjogXCIgKyBLQkVuZ2luZS5hcHAudXNlcm5hbWUgKyBcIiBpcyBzdWNjZXNzZnVsbHkhXCIpO1xyXG5cdH1cclxuXHRcclxuXHR0aGlzLkNsaWVudF9vblJlcUFjY291bnRCaW5kRW1haWxDQiA9IGZ1bmN0aW9uKGZhaWxlZGNvZGUpXHJcblx0e1xyXG5cdFx0aWYoZmFpbGVkY29kZSAhPSAwKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uUmVxQWNjb3VudEJpbmRFbWFpbENCOiBcIiArIEtCRW5naW5lLmFwcC51c2VybmFtZSArIFwiIGlzIGZhaWxlZCEgY29kZT1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnJzW2ZhaWxlZGNvZGVdLm5hbWUgKyBcIiFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRLQkVuZ2luZS5JTkZPX01TRyhcIktCRW5naW5lQXBwOjpDbGllbnRfb25SZXFBY2NvdW50QmluZEVtYWlsQ0I6IFwiICsgS0JFbmdpbmUuYXBwLnVzZXJuYW1lICsgXCIgaXMgc3VjY2Vzc2Z1bGx5IVwiKTtcclxuXHR9XHJcblx0XHJcblx0dGhpcy5DbGllbnRfb25SZXFBY2NvdW50TmV3UGFzc3dvcmRDQiA9IGZ1bmN0aW9uKGZhaWxlZGNvZGUpXHJcblx0e1xyXG5cdFx0aWYoZmFpbGVkY29kZSAhPSAwKVxyXG5cdFx0e1xyXG5cdFx0XHRLQkVuZ2luZS5FUlJPUl9NU0coXCJLQkVuZ2luZUFwcDo6Q2xpZW50X29uUmVxQWNjb3VudE5ld1Bhc3N3b3JkQ0I6IFwiICsgS0JFbmdpbmUuYXBwLnVzZXJuYW1lICsgXCIgaXMgZmFpbGVkISBjb2RlPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycnNbZmFpbGVkY29kZV0ubmFtZSArIFwiIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdEtCRW5naW5lLklORk9fTVNHKFwiS0JFbmdpbmVBcHA6OkNsaWVudF9vblJlcUFjY291bnROZXdQYXNzd29yZENCOiBcIiArIEtCRW5naW5lLmFwcC51c2VybmFtZSArIFwiIGlzIHN1Y2Nlc3NmdWxseSFcIik7XHJcblx0fVxyXG59XHJcblxyXG5LQkVuZ2luZS5jcmVhdGUgPSBmdW5jdGlvbihrYmVuZ2luZUFyZ3MpXHJcbntcclxuXHRpZihLQkVuZ2luZS5hcHAgIT0gdW5kZWZpbmVkKVxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHQvLyDkuIDkupvlubPlj7DlpoLlsI/nqIvluo/kuIrlj6/og73msqHmnIlhc3NlcnRcclxuXHRpZihjb25zb2xlLmFzc2VydCA9PSB1bmRlZmluZWQpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5hc3NlcnQgPSBmdW5jdGlvbihiUmV0LCBzKVxyXG5cdFx0e1xyXG5cdFx0XHRpZighKGJSZXQpKSB7XHJcblx0XHRcdFx0S0JFbmdpbmUuRVJST1JfTVNHKHMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZihrYmVuZ2luZUFyZ3MuY29uc3RydWN0b3IgIT0gS0JFbmdpbmUuS0JFbmdpbmVBcmdzKVxyXG5cdHtcclxuXHRcdEtCRW5naW5lLkVSUk9SX01TRyhcIktCRW5naW5lLmNyZWF0ZSgpOiBhcmdzKFwiICsga2JlbmdpbmVBcmdzICsgXCIpIGVycm9yISBub3QgaXMgS0JFbmdpbmUuS0JFbmdpbmVBcmdzXCIpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRcclxuXHRuZXcgS0JFbmdpbmUuS0JFbmdpbmVBcHAoa2JlbmdpbmVBcmdzKTtcclxuXHRcclxuXHRLQkVuZ2luZS5hcHAucmVzZXQoKTtcclxuXHRLQkVuZ2luZS5hcHAuaW5zdGFsbEV2ZW50cygpO1xyXG5cdEtCRW5naW5lLmlkSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChLQkVuZ2luZS5hcHAudXBkYXRlLCBrYmVuZ2luZUFyZ3MudXBkYXRlSFopO1xyXG59XHJcblxyXG5LQkVuZ2luZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcblx0aWYoS0JFbmdpbmUuaWRJbnRlcnZhbCAhPSB1bmRlZmluZWQpXHJcblx0XHRjbGVhckludGVydmFsKEtCRW5naW5lLmlkSW50ZXJ2YWwpO1xyXG5cdFxyXG5cdGlmKEtCRW5naW5lLmFwcCA9PSB1bmRlZmluZWQpXHJcblx0XHRyZXR1cm47XHJcblx0XHRcclxuXHRLQkVuZ2luZS5hcHAudW5pbnN0YWxsRXZlbnRzKCk7XHJcblx0S0JFbmdpbmUuYXBwLnJlc2V0KCk7XHJcblx0S0JFbmdpbmUuYXBwID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG50cnlcclxue1xyXG5cdGlmKG1vZHVsZSAhPSB1bmRlZmluZWQpXHJcblx0e1xyXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBLQkVuZ2luZTtcclxuXHR9XHJcbn1cclxuY2F0Y2goZSlcclxue1xyXG5cdFxyXG59XHJcblxyXG5cclxuIl19