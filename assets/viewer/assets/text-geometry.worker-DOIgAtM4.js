(function(){
/**
* @license
* Copyright 2010-2023 Three.js Authors
* SPDX-License-Identifier: MIT
*/
let e=1e3,t=1001,n=1002,r=1003,i=1006,a=1008,o=1009,s=1014,c=1015,l=1016,u=1020,d=1023,f=1026,p=2300,m=2301,h=2302,g=2400,_=2401,v=2402,y=3e3,b=3001,x=`srgb`,S=`srgb-linear`,C=`display-p3`,w=`display-p3-linear`,T=`linear`,E=`srgb`,D=`rec709`,O=7680,k=2e3;var A=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}};let j=/* @__PURE__ */ `00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),M=Math.PI/180,N=180/Math.PI;function P(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(j[e&255]+j[e>>8&255]+j[e>>16&255]+j[e>>24&255]+`-`+j[t&255]+j[t>>8&255]+`-`+j[t>>16&15|64]+j[t>>24&255]+`-`+j[n&63|128]+j[n>>8&255]+`-`+j[n>>16&255]+j[n>>24&255]+j[r&255]+j[r>>8&255]+j[r>>16&255]+j[r>>24&255]).toLowerCase()}function F(e,t,n){return Math.max(t,Math.min(n,e))}function ee(e,t){return(e%t+t)%t}function I(e,t,n){return(1-n)*e+n*t}function te(e){return!(e&e-1)&&e!==0}function ne(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function re(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function ie(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var L=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(F(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},R=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ae.makeScale(e,t)),this}rotate(e){return this.premultiply(ae.makeRotation(-e)),this}translate(e,t){return this.premultiply(ae.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};let ae=/*@__PURE__*/ new R;function oe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function se(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ce(){let e=se(`canvas`);return e.style.display=`block`,e}let le={};function ue(e){e in le||(le[e]=!0,console.warn(e))}let de=/*@__PURE__*/ new R().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),fe=/*@__PURE__*/ new R().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),pe={[S]:{transfer:T,primaries:D,toReference:e=>e,fromReference:e=>e},[x]:{transfer:E,primaries:D,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[w]:{transfer:T,primaries:`p3`,toReference:e=>e.applyMatrix3(fe),fromReference:e=>e.applyMatrix3(de)},[C]:{transfer:E,primaries:`p3`,toReference:e=>e.convertSRGBToLinear().applyMatrix3(fe),fromReference:e=>e.applyMatrix3(de).convertLinearToSRGB()}},me=/* @__PURE__ */ new Set([S,w]),z={enabled:!0,_workingColorSpace:S,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!me.has(e))throw Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;let r=pe[t].toReference,i=pe[n].fromReference;return i(r(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return pe[e].primaries},getTransfer:function(e){return e===``?T:pe[e].transfer}};function B(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function he(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}let V;var ge=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{V===void 0&&(V=se(`canvas`)),V.width=e.width,V.height=e.height;let n=V.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=V}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=se(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=B(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(B(t[e]/255)*255):t[e]=B(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}};let H=0;var _e=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:H++}),this.uuid=P(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(U(r[t].image)):e.push(U(r[t]))}else e=U(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function U(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?ge.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}let ve=0;var ye=class r extends A{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,s=t,c=t,l=i,u=a,f=d,p=o,m=r.DEFAULT_ANISOTROPY,h=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ve++}),this.uuid=P(),this.name=``,this.source=new _e(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=c,this.magFilter=l,this.minFilter=u,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=p,this.offset=new L(0,0),this.repeat=new L(1,1),this.center=new L(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new R,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h==`string`?this.colorSpace=h:(ue(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=h===3001?x:``),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ue(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace===`srgb`?b:y}set encoding(e){ue(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=e===3001?x:``}};ye.DEFAULT_IMAGE=null,ye.DEFAULT_MAPPING=300,ye.DEFAULT_ANISOTROPY=1;var be=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xe=class extends A{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new be(0,0,e,t),this.scissorTest=!1,this.viewport=new be(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(ue(`THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.`),n.colorSpace=n.encoding===3001?x:``),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:i,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ye(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new _e(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Se=class extends xe{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ce=class extends ye{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},we=class extends ye{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Te=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0)e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;else if(o===1)e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;else{if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(F(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),i=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(i),n*Math.cos(i),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(De.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(De.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ee.copy(this).projectOnVector(e),this.sub(Ee)}reflect(e){return this.sub(Ee.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(F(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};let Ee=/*@__PURE__*/ new W,De=/*@__PURE__*/ new Te;var Oe=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ae.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ae.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ae.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ae):Ae.fromBufferAttribute(r,t),Ae.applyMatrix4(e.matrixWorld),this.expandByPoint(Ae);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),je.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),je.copy(e.boundingBox)),je.applyMatrix4(e.matrixWorld),this.union(je)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ae),Ae.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Re),ze.subVectors(this.max,Re),Me.subVectors(e.a,Re),Ne.subVectors(e.b,Re),Pe.subVectors(e.c,Re),Fe.subVectors(Ne,Me),Ie.subVectors(Pe,Ne),Le.subVectors(Me,Pe);let t=[0,-Fe.z,Fe.y,0,-Ie.z,Ie.y,0,-Le.z,Le.y,Fe.z,0,-Fe.x,Ie.z,0,-Ie.x,Le.z,0,-Le.x,-Fe.y,Fe.x,0,-Ie.y,Ie.x,0,-Le.y,Le.x,0];return!He(t,Me,Ne,Pe,ze)||(t=[1,0,0,0,1,0,0,0,1],!He(t,Me,Ne,Pe,ze))?!1:(Be.crossVectors(Fe,Ie),t=[Be.x,Be.y,Be.z],He(t,Me,Ne,Pe,ze))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ae).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ae).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ke[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ke[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ke[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ke[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ke[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ke[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ke[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ke[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ke)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};let ke=[/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W,/*@__PURE__*/ new W],Ae=/*@__PURE__*/ new W,je=/*@__PURE__*/ new Oe,Me=/*@__PURE__*/ new W,Ne=/*@__PURE__*/ new W,Pe=/*@__PURE__*/ new W,Fe=/*@__PURE__*/ new W,Ie=/*@__PURE__*/ new W,Le=/*@__PURE__*/ new W,Re=/*@__PURE__*/ new W,ze=/*@__PURE__*/ new W,Be=/*@__PURE__*/ new W,Ve=/*@__PURE__*/ new W;function He(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Ve.fromArray(e,a);let o=i.x*Math.abs(Ve.x)+i.y*Math.abs(Ve.y)+i.z*Math.abs(Ve.z),s=t.dot(Ve),c=n.dot(Ve),l=r.dot(Ve);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}let Ue=/*@__PURE__*/ new Oe,We=/*@__PURE__*/ new W,Ge=/*@__PURE__*/ new W;var Ke=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ue.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;We.subVectors(e,this.center);let t=We.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(We,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ge.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(We.copy(e.center).add(Ge)),this.expandByPoint(We.copy(e.center).sub(Ge))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};let qe=/*@__PURE__*/ new W,Je=/*@__PURE__*/ new W,Ye=/*@__PURE__*/ new W,Xe=/*@__PURE__*/ new W,Ze=/*@__PURE__*/ new W,Qe=/*@__PURE__*/ new W,$e=/*@__PURE__*/ new W;var et=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qe)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qe.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qe.copy(this.origin).addScaledVector(this.direction,t),qe.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Je.copy(e).add(t).multiplyScalar(.5),Ye.copy(t).sub(e).normalize(),Xe.copy(this.origin).sub(Je);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ye),o=Xe.dot(this.direction),s=-Xe.dot(Ye),c=Xe.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Je).addScaledVector(Ye,d),f}intersectSphere(e,t){qe.subVectors(e.center,this.origin);let n=qe.dot(this.direction),r=qe.dot(qe)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qe)!==null}intersectTriangle(e,t,n,r,i){Ze.subVectors(t,e),Qe.subVectors(n,e),$e.crossVectors(Ze,Qe);let a=this.direction.dot($e),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xe.subVectors(this.origin,e);let s=o*this.direction.dot(Qe.crossVectors(Xe,Qe));if(s<0)return null;let c=o*this.direction.dot(Ze.cross(Xe));if(c<0||s+c>a)return null;let l=-o*Xe.dot($e);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},tt=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/nt.setFromMatrixColumn(e,0).length(),i=1/nt.setFromMatrixColumn(e,1).length(),a=1/nt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(it,e,at)}lookAt(e,t,n){let r=this.elements;return ct.subVectors(e,t),ct.lengthSq()===0&&(ct.z=1),ct.normalize(),ot.crossVectors(n,ct),ot.lengthSq()===0&&(Math.abs(n.z)===1?ct.x+=1e-4:ct.z+=1e-4,ct.normalize(),ot.crossVectors(n,ct)),ot.normalize(),st.crossVectors(ct,ot),r[0]=ot.x,r[4]=st.x,r[8]=ct.x,r[1]=ot.y,r[5]=st.y,r[9]=ct.y,r[2]=ot.z,r[6]=st.z,r[10]=ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],ee=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*ee,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*ee,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*ee,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=nt.set(r[0],r[1],r[2]).length(),a=nt.set(r[4],r[5],r[6]).length(),o=nt.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],rt.copy(this);let s=1/i,c=1/a,l=1/o;return rt.elements[0]*=s,rt.elements[1]*=s,rt.elements[2]*=s,rt.elements[4]*=c,rt.elements[5]*=c,rt.elements[6]*=c,rt.elements[8]*=l,rt.elements[9]*=l,rt.elements[10]*=l,t.setFromRotationMatrix(rt),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=k){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=k){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};let nt=/*@__PURE__*/ new W,rt=/*@__PURE__*/ new tt,it=/*@__PURE__*/ new W(0,0,0),at=/*@__PURE__*/ new W(1,1,1),ot=/*@__PURE__*/ new W,st=/*@__PURE__*/ new W,ct=/*@__PURE__*/ new W,lt=/*@__PURE__*/ new tt,ut=/*@__PURE__*/ new Te;var dt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(F(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-F(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(F(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-F(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(F(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-F(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return lt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ut.setFromEuler(this),this.setFromQuaternion(ut,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dt.DEFAULT_ORDER=`XYZ`;var ft=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}};let pt=0,mt=/*@__PURE__*/ new W,ht=/*@__PURE__*/ new Te,gt=/*@__PURE__*/ new tt,_t=/*@__PURE__*/ new W,vt=/*@__PURE__*/ new W,yt=/*@__PURE__*/ new W,bt=/*@__PURE__*/ new Te,xt=/*@__PURE__*/ new W(1,0,0),St=/*@__PURE__*/ new W(0,1,0),Ct=/*@__PURE__*/ new W(0,0,1),wt={type:`added`},Tt={type:`removed`};var Et=class e extends A{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pt++}),this.uuid=P(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new dt,r=new Te,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new R}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ft,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ht.setFromAxisAngle(e,t),this.quaternion.multiply(ht),this}rotateOnWorldAxis(e,t){return ht.setFromAxisAngle(e,t),this.quaternion.premultiply(ht),this}rotateX(e){return this.rotateOnAxis(xt,e)}rotateY(e){return this.rotateOnAxis(St,e)}rotateZ(e){return this.rotateOnAxis(Ct,e)}translateOnAxis(e,t){return mt.copy(e).applyQuaternion(this.quaternion),this.position.add(mt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xt,e)}translateY(e){return this.translateOnAxis(St,e)}translateZ(e){return this.translateOnAxis(Ct,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_t.copy(e):_t.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gt.lookAt(vt,_t,this.up):gt.lookAt(_t,vt,this.up),this.quaternion.setFromRotationMatrix(gt),r&&(gt.extractRotation(r.matrixWorld),ht.setFromRotationMatrix(gt),this.quaternion.premultiply(ht.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(wt)):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tt)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gt.multiply(e.parent.matrixWorld)),e.applyMatrix4(gt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vt,e,yt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vt,bt,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++){let n=e[t];n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Et.DEFAULT_UP=/*@__PURE__*/ new W(0,1,0),Et.DEFAULT_MATRIX_AUTO_UPDATE=!0,Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;let Dt=/*@__PURE__*/ new W,Ot=/*@__PURE__*/ new W,kt=/*@__PURE__*/ new W,At=/*@__PURE__*/ new W,jt=/*@__PURE__*/ new W,Mt=/*@__PURE__*/ new W,Nt=/*@__PURE__*/ new W,Pt=/*@__PURE__*/ new W,Ft=/*@__PURE__*/ new W,It=/*@__PURE__*/ new W;var Lt=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Dt.subVectors(e,t),r.cross(Dt);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Dt.subVectors(r,t),Ot.subVectors(n,t),kt.subVectors(e,t);let a=Dt.dot(Dt),o=Dt.dot(Ot),s=Dt.dot(kt),c=Ot.dot(Ot),l=Ot.dot(kt),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,At)!==null&&At.x>=0&&At.y>=0&&At.x+At.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,At)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,At.x),s.addScaledVector(a,At.y),s.addScaledVector(o,At.z),s)}static isFrontFacing(e,t,n,r){return Dt.subVectors(n,t),Ot.subVectors(e,t),Dt.cross(Ot).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dt.subVectors(this.c,this.b),Ot.subVectors(this.a,this.b),Dt.cross(Ot).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;jt.subVectors(r,n),Mt.subVectors(i,n),Pt.subVectors(e,n);let s=jt.dot(Pt),c=Mt.dot(Pt);if(s<=0&&c<=0)return t.copy(n);Ft.subVectors(e,r);let l=jt.dot(Ft),u=Mt.dot(Ft);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(jt,a);It.subVectors(e,i);let f=jt.dot(It),p=Mt.dot(It);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Mt,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Nt.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Nt,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(jt,a).addScaledVector(Mt,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};let Rt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zt={h:0,s:0,l:0},Bt={h:0,s:0,l:0};function Vt(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Ht=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=x){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,z.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=z.workingColorSpace){return this.r=e,this.g=t,this.b=n,z.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=z.workingColorSpace){if(e=ee(e,1),t=F(t,0,1),n=F(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Vt(i,r,e+1/3),this.g=Vt(i,r,e),this.b=Vt(i,r,e-1/3)}return z.toWorkingColorSpace(this,r),this}setStyle(e,t=x){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=x){let n=Rt[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=B(e.r),this.g=B(e.g),this.b=B(e.b),this}copyLinearToSRGB(e){return this.r=he(e.r),this.g=he(e.g),this.b=he(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=x){return z.fromWorkingColorSpace(Ut.copy(this),e),Math.round(F(Ut.r*255,0,255))*65536+Math.round(F(Ut.g*255,0,255))*256+Math.round(F(Ut.b*255,0,255))}getHexString(e=x){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=z.workingColorSpace){z.fromWorkingColorSpace(Ut.copy(this),t);let n=Ut.r,r=Ut.g,i=Ut.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=z.workingColorSpace){return z.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=x){z.fromWorkingColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,r=Ut.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(zt),this.setHSL(zt.h+e,zt.s+t,zt.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zt),e.getHSL(Bt);let n=I(zt.h,Bt.h,t),r=I(zt.s,Bt.s,t),i=I(zt.l,Bt.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};let Ut=/*@__PURE__*/ new Ht;Ht.NAMES=Rt;let Wt=0;var Gt=class extends A{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wt++}),this.uuid=P(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=O,this.stencilZFail=O,this.stencilZPass=O,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Kt=class extends Gt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};let qt=/*@__PURE__*/ new W,Jt=/*@__PURE__*/ new L;var Yt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=c,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return ue(`THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.`),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXY(t,Jt.x,Jt.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=re(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ie(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=re(t,this.array)),t}setX(e,t){return this.normalized&&(t=ie(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=re(t,this.array)),t}setY(e,t){return this.normalized&&(t=ie(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=re(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ie(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=re(t,this.array)),t}setW(e,t){return this.normalized&&(t=ie(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ie(t,this.array),n=ie(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ie(t,this.array),n=ie(n,this.array),r=ie(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ie(t,this.array),n=ie(n,this.array),r=ie(r,this.array),i=ie(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},Xt=class extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Zt=class extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Qt=class extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}};let $t=0,en=/*@__PURE__*/ new tt,tn=/*@__PURE__*/ new Et,nn=/*@__PURE__*/ new W,rn=/*@__PURE__*/ new Oe,an=/*@__PURE__*/ new Oe,on=/*@__PURE__*/ new W;var sn=class e extends A{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$t++}),this.uuid=P(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(oe(e)?Zt:Xt)(e,1):e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new R().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return tn.lookAt(e),tn.updateMatrix(),this.applyMatrix4(tn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nn).negate(),this.translate(nn.x,nn.y,nn.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute(`position`,new Qt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oe);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];rn.setFromBufferAttribute(n),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];an.setFromBufferAttribute(n),this.morphTargetsRelative?(on.addVectors(rn.min,an.min),rn.expandByPoint(on),on.addVectors(rn.max,an.max),rn.expandByPoint(on)):(rn.expandByPoint(an.min),rn.expandByPoint(an.max))}rn.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(on));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)on.fromBufferAttribute(a,t),o&&(nn.fromBufferAttribute(e,t),on.add(nn)),r=Math.max(r,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=e.array,r=t.position.array,i=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Yt(new Float32Array(4*o),4));let s=this.getAttribute(`tangent`).array,c=[],l=[];for(let e=0;e<o;e++)c[e]=new W,l[e]=new W;let u=new W,d=new W,f=new W,p=new L,m=new L,h=new L,g=new W,_=new W;function v(e,t,n){u.fromArray(r,e*3),d.fromArray(r,t*3),f.fromArray(r,n*3),p.fromArray(a,e*2),m.fromArray(a,t*2),h.fromArray(a,n*2),d.sub(u),f.sub(u),m.sub(p),h.sub(p);let i=1/(m.x*h.y-h.x*m.y);isFinite(i)&&(g.copy(d).multiplyScalar(h.y).addScaledVector(f,-m.y).multiplyScalar(i),_.copy(f).multiplyScalar(m.x).addScaledVector(d,-h.x).multiplyScalar(i),c[e].add(g),c[t].add(g),c[n].add(g),l[e].add(_),l[t].add(_),l[n].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)v(n[e+0],n[e+1],n[e+2])}let b=new W,x=new W,S=new W,C=new W;function w(e){S.fromArray(i,e*3),C.copy(S);let t=c[e];b.copy(t),b.sub(S.multiplyScalar(S.dot(t))).normalize(),x.crossVectors(C,t);let n=x.dot(l[e])<0?-1:1;s[e*4]=b.x,s[e*4+1]=b.y,s[e*4+2]=b.z,s[e*4+3]=n}for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)w(n[e+0]),w(n[e+1]),w(n[e+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Yt(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};let cn=/*@__PURE__*/ new tt,ln=/*@__PURE__*/ new et,un=/*@__PURE__*/ new Ke,dn=/*@__PURE__*/ new W,fn=/*@__PURE__*/ new W,pn=/*@__PURE__*/ new W,mn=/*@__PURE__*/ new W,hn=/*@__PURE__*/ new W,gn=/*@__PURE__*/ new W,_n=/*@__PURE__*/ new L,vn=/*@__PURE__*/ new L,yn=/*@__PURE__*/ new L,bn=/*@__PURE__*/ new W,xn=/*@__PURE__*/ new W,Sn=/*@__PURE__*/ new W,Cn=/*@__PURE__*/ new W,wn=/*@__PURE__*/ new W;var Tn=class extends Et{constructor(e=new sn,t=new Kt){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){gn.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(hn.fromBufferAttribute(s,e),a?gn.addScaledVector(hn,r):gn.addScaledVector(hn.sub(t),r))}t.add(gn)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),un.copy(n.boundingSphere),un.applyMatrix4(i),ln.copy(e.ray).recast(e.near),!(un.containsPoint(ln.origin)===!1&&(ln.intersectSphere(un,dn)===null||ln.origin.distanceToSquared(dn)>(e.far-e.near)**2))&&(cn.copy(i).invert(),ln.copy(e.ray).applyMatrix4(cn),(n.boundingBox===null||ln.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ln)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Dn(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Dn(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Dn(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Dn(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function En(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;wn.copy(s),wn.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(wn);return l<n.near||l>n.far?null:{distance:l,point:wn.clone(),object:e}}function Dn(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,fn),e.getVertexPosition(c,pn),e.getVertexPosition(l,mn);let u=En(e,t,n,r,fn,pn,mn,Cn);if(u){i&&(_n.fromBufferAttribute(i,s),vn.fromBufferAttribute(i,c),yn.fromBufferAttribute(i,l),u.uv=Lt.getInterpolation(Cn,fn,pn,mn,_n,vn,yn,new L)),a&&(_n.fromBufferAttribute(a,s),vn.fromBufferAttribute(a,c),yn.fromBufferAttribute(a,l),u.uv1=Lt.getInterpolation(Cn,fn,pn,mn,_n,vn,yn,new L),u.uv2=u.uv1),o&&(bn.fromBufferAttribute(o,s),xn.fromBufferAttribute(o,c),Sn.fromBufferAttribute(o,l),u.normal=Lt.getInterpolation(Cn,fn,pn,mn,bn,xn,Sn,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let e={a:s,b:c,c:l,normal:new W,materialIndex:0};Lt.getNormal(fn,pn,mn,e.normal),u.face=e}return u}var On=class e extends sn{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Qt(c,3)),this.setAttribute(`normal`,new Qt(l,3)),this.setAttribute(`uv`,new Qt(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function kn(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function An(e){let t={};for(let n=0;n<e.length;n++){let r=kn(e[n]);for(let e in r)t[e]=r[e]}return t}function jn(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Mn(e){return e.getRenderTarget()===null?e.outputColorSpace:z.workingColorSpace}let Nn={clone:kn,merge:An};var Pn=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fn=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,In=class extends Gt{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pn,this.fragmentShader=Fn,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=kn(e.uniforms),this.uniformsGroups=jn(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ln=class extends Et{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=k}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};let Rn=/*@__PURE__*/ new W,zn=/*@__PURE__*/ new L,Bn=/*@__PURE__*/ new L;var Vn=class extends Ln{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=N*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(M*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return N*2*Math.atan(Math.tan(M*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z)}getViewSize(e,t){return this.getViewBounds(e,zn,Bn),t.subVectors(Bn,zn)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(M*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Hn=class extends Et{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Vn(-90,1,e,t);r.layers=this.layers,this.add(r);let i=new Vn(-90,1,e,t);i.layers=this.layers,this.add(i);let a=new Vn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new Vn(-90,1,e,t);o.layers=this.layers,this.add(o);let s=new Vn(-90,1,e,t);s.layers=this.layers,this.add(s);let c=new Vn(-90,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Un=class extends ye{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Wn=class extends Se{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(ue(`THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.`),t.colorSpace=t.encoding===3001?x:``),this.texture=new Un(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?i:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new On(5,5,5),a=new In({name:`CubemapFromEquirect`,uniforms:kn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let o=new Tn(r,a),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=i),new Hn(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};let Gn=/*@__PURE__*/ new W,Kn=/*@__PURE__*/ new W,qn=/*@__PURE__*/ new R;var Jn=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Gn.subVectors(n,t).cross(Kn.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Gn),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qn.getNormalMatrix(e),r=this.coplanarPoint(Gn).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};let Yn=/*@__PURE__*/ new Ke,Xn=/*@__PURE__*/ new W;var Zn=class{constructor(e=new Jn,t=new Jn,n=new Jn,r=new Jn,i=new Jn,a=new Jn){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=k){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Xn.x=r.normal.x>0?e.max.x:e.min.x,Xn.y=r.normal.y>0?e.max.y:e.min.y,Xn.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xn)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Qn(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function $n(e,t){let n=t.isWebGL2,r=/* @__PURE__ */ new WeakMap;function i(t,r){let i=t.array,a=t.usage,o=i.byteLength,s=e.createBuffer();e.bindBuffer(r,s),e.bufferData(r,i,a),t.onUploadCallback();let c;if(i instanceof Float32Array)c=e.FLOAT;else if(i instanceof Uint16Array){if(t.isFloat16BufferAttribute){if(n)c=e.HALF_FLOAT;else throw Error(`THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.`)}else c=e.UNSIGNED_SHORT}else if(i instanceof Int16Array)c=e.SHORT;else if(i instanceof Uint32Array)c=e.UNSIGNED_INT;else if(i instanceof Int32Array)c=e.INT;else if(i instanceof Int8Array)c=e.BYTE;else if(i instanceof Uint8Array)c=e.UNSIGNED_BYTE;else if(i instanceof Uint8ClampedArray)c=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+i);return{buffer:s,type:c,bytesPerElement:i.BYTES_PER_ELEMENT,version:t.version,size:o}}function a(t,r,i){let a=r.array,o=r._updateRange,s=r.updateRanges;if(e.bindBuffer(i,t),o.count===-1&&s.length===0&&e.bufferSubData(i,0,a),s.length!==0){for(let t=0,r=s.length;t<r;t++){let r=s[t];n?e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a,r.start,r.count):e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a.subarray(r.start,r.start+r.count))}r.clearUpdateRanges()}o.count!==-1&&(n?e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a,o.offset,o.count):e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a.subarray(o.offset,o.offset+o.count)),o.count=-1),r.onUploadCallback()}function o(e){return e.isInterleavedBufferAttribute&&(e=e.data),r.get(e)}function s(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=r.get(t);n&&(e.deleteBuffer(n.buffer),r.delete(t))}function c(e,t){if(e.isGLBufferAttribute){let t=r.get(e);(!t||t.version<e.version)&&r.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}e.isInterleavedBufferAttribute&&(e=e.data);let n=r.get(e);if(n===void 0)r.set(e,i(e,t));else if(n.version<e.version){if(n.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);a(n.buffer,e,t),n.version=e.version}}return{get:o,remove:s,update:c}}var er=class e extends sn{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Qt(p,3)),this.setAttribute(`normal`,new Qt(m,3)),this.setAttribute(`uv`,new Qt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};let G={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_fragment:`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},K={common:{diffuse:{value:/*@__PURE__*/ new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:/*@__PURE__*/ new R},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new R},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:/*@__PURE__*/ new R}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:/*@__PURE__*/ new R}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:/*@__PURE__*/ new R}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:/*@__PURE__*/ new R},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:/*@__PURE__*/ new R},normalScale:{value:/*@__PURE__*/ new L(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:/*@__PURE__*/ new R},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:/*@__PURE__*/ new R}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:/*@__PURE__*/ new R}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:/*@__PURE__*/ new R}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:/*@__PURE__*/ new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:/*@__PURE__*/ new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new R},alphaTest:{value:0},uvTransform:{value:/*@__PURE__*/ new R}},sprite:{diffuse:{value:/*@__PURE__*/ new Ht(16777215)},opacity:{value:1},center:{value:/*@__PURE__*/ new L(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:/*@__PURE__*/ new R},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new R},alphaTest:{value:0}}},tr={basic:{uniforms:/*@__PURE__*/ An([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:G.meshbasic_vert,fragmentShader:G.meshbasic_frag},lambert:{uniforms:/*@__PURE__*/ An([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:/*@__PURE__*/ new Ht(0)}}]),vertexShader:G.meshlambert_vert,fragmentShader:G.meshlambert_frag},phong:{uniforms:/*@__PURE__*/ An([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:/*@__PURE__*/ new Ht(0)},specular:{value:/*@__PURE__*/ new Ht(1118481)},shininess:{value:30}}]),vertexShader:G.meshphong_vert,fragmentShader:G.meshphong_frag},standard:{uniforms:/*@__PURE__*/ An([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:/*@__PURE__*/ new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:G.meshphysical_vert,fragmentShader:G.meshphysical_frag},toon:{uniforms:/*@__PURE__*/ An([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:/*@__PURE__*/ new Ht(0)}}]),vertexShader:G.meshtoon_vert,fragmentShader:G.meshtoon_frag},matcap:{uniforms:/*@__PURE__*/ An([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:G.meshmatcap_vert,fragmentShader:G.meshmatcap_frag},points:{uniforms:/*@__PURE__*/ An([K.points,K.fog]),vertexShader:G.points_vert,fragmentShader:G.points_frag},dashed:{uniforms:/*@__PURE__*/ An([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:G.linedashed_vert,fragmentShader:G.linedashed_frag},depth:{uniforms:/*@__PURE__*/ An([K.common,K.displacementmap]),vertexShader:G.depth_vert,fragmentShader:G.depth_frag},normal:{uniforms:/*@__PURE__*/ An([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:G.meshnormal_vert,fragmentShader:G.meshnormal_frag},sprite:{uniforms:/*@__PURE__*/ An([K.sprite,K.fog]),vertexShader:G.sprite_vert,fragmentShader:G.sprite_frag},background:{uniforms:{uvTransform:{value:/*@__PURE__*/ new R},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:G.background_vert,fragmentShader:G.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:G.backgroundCube_vert,fragmentShader:G.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:G.cube_vert,fragmentShader:G.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:G.equirect_vert,fragmentShader:G.equirect_frag},distanceRGBA:{uniforms:/*@__PURE__*/ An([K.common,K.displacementmap,{referencePosition:{value:/*@__PURE__*/ new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:G.distanceRGBA_vert,fragmentShader:G.distanceRGBA_frag},shadow:{uniforms:/*@__PURE__*/ An([K.lights,K.fog,{color:{value:/*@__PURE__*/ new Ht(0)},opacity:{value:1}}]),vertexShader:G.shadow_vert,fragmentShader:G.shadow_frag}};tr.physical={uniforms:/*@__PURE__*/ An([tr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:/*@__PURE__*/ new R},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:/*@__PURE__*/ new R},clearcoatNormalScale:{value:/*@__PURE__*/ new L(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:/*@__PURE__*/ new R},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:/*@__PURE__*/ new R},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:/*@__PURE__*/ new R},sheen:{value:0},sheenColor:{value:/*@__PURE__*/ new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:/*@__PURE__*/ new R},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:/*@__PURE__*/ new R},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:/*@__PURE__*/ new R},transmissionSamplerSize:{value:/*@__PURE__*/ new L},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:/*@__PURE__*/ new R},attenuationDistance:{value:0},attenuationColor:{value:/*@__PURE__*/ new Ht(0)},specularColor:{value:/*@__PURE__*/ new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:/*@__PURE__*/ new R},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:/*@__PURE__*/ new R},anisotropyVector:{value:/*@__PURE__*/ new L},anisotropyMap:{value:null},anisotropyMapTransform:{value:/*@__PURE__*/ new R}}]),vertexShader:G.meshphysical_vert,fragmentShader:G.meshphysical_frag};let nr={r:0,b:0,g:0};function rr(e,t,n,r,i,a,o){let s=new Ht(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(a,m){let g=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?n:t).get(_)),_===null?h(s,c):_&&_.isColor&&(h(_,1),g=!0);let v=e.xr.getEnvironmentBlendMode();v===`additive`?r.buffers.color.setClear(0,0,0,1,o):v===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||g)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Tn(new On(1,1,1),new In({name:`BackgroundCubeMaterial`,uniforms:kn(tr.backgroundCube.uniforms),vertexShader:tr.backgroundCube.vertexShader,fragmentShader:tr.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=z.getTransfer(_.colorSpace)!==E,(d!==_||f!==_.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),u.layers.enableAll(),a.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Tn(new er(2,2),new In({name:`BackgroundMaterial`,uniforms:kn(tr.background.uniforms),vertexShader:tr.background.vertexShader,fragmentShader:tr.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=z.getTransfer(_.colorSpace)!==E,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),l.layers.enableAll(),a.unshift(l,l.geometry,l.material,0,0,null))}function h(t,n){t.getRGB(nr,Mn(e)),r.buffers.color.setClear(nr.r,nr.g,nr.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,h(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,h(s,c)},render:m}}function ir(e,t,n,r){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),a=r.isWebGL2?null:t.get(`OES_vertex_array_object`),o=r.isWebGL2||a!==null,s={},c=g(null),l=c,u=!1;function d(t,r,i,a,s){let c=!1;if(o){let e=h(a,i,r);l!==e&&(l=e,p(l.object)),c=_(t,a,i,s),c&&v(t,a,i,s)}else{let e=r.wireframe===!0;(l.geometry!==a.id||l.program!==i.id||l.wireframe!==e)&&(l.geometry=a.id,l.program=i.id,l.wireframe=e,c=!0)}s!==null&&n.update(s,e.ELEMENT_ARRAY_BUFFER),(c||u)&&(u=!1,w(t,r,i,a),s!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(s).buffer))}function f(){return r.isWebGL2?e.createVertexArray():a.createVertexArrayOES()}function p(t){return r.isWebGL2?e.bindVertexArray(t):a.bindVertexArrayOES(t)}function m(t){return r.isWebGL2?e.deleteVertexArray(t):a.deleteVertexArrayOES(t)}function h(e,t,n){let r=n.wireframe===!0,i=s[e.id];i===void 0&&(i={},s[e.id]=i);let a=i[t.id];a===void 0&&(a={},i[t.id]=a);let o=a[r];return o===void 0&&(o=g(f()),a[r]=o),o}function g(e){let t=[],n=[],r=[];for(let e=0;e<i;e++)t[e]=0,n[e]=0,r[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:n,attributeDivisors:r,object:e,attributes:{},index:null}}function _(e,t,n,r){let i=l.attributes,a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=i[t],r=a[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;o++}return l.attributesNum!==o||l.index!==r}function v(e,t,n,r){let i={},a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=a[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,o++}l.attributes=i,l.attributesNum=o,l.index=r}function y(){let e=l.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function b(e){x(e,0)}function x(n,i){let a=l.newAttributes,o=l.enabledAttributes,s=l.attributeDivisors;a[n]=1,o[n]===0&&(e.enableVertexAttribArray(n),o[n]=1),s[n]!==i&&((r.isWebGL2?e:t.get(`ANGLE_instanced_arrays`))[r.isWebGL2?`vertexAttribDivisor`:`vertexAttribDivisorANGLE`](n,i),s[n]=i)}function S(){let t=l.newAttributes,n=l.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function C(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function w(i,a,o,s){if(r.isWebGL2===!1&&(i.isInstancedMesh||s.isInstancedBufferGeometry)&&t.get(`ANGLE_instanced_arrays`)===null)return;y();let c=s.attributes,l=o.getAttributes(),u=a.defaultAttributeValues;for(let t in l){let a=l[t];if(a.location>=0){let o=c[t];if(o===void 0&&(t===`instanceMatrix`&&i.instanceMatrix&&(o=i.instanceMatrix),t===`instanceColor`&&i.instanceColor&&(o=i.instanceColor)),o!==void 0){let t=o.normalized,c=o.itemSize,l=n.get(o);if(l===void 0)continue;let u=l.buffer,d=l.type,f=l.bytesPerElement,p=r.isWebGL2===!0&&(d===e.INT||d===e.UNSIGNED_INT||o.gpuType===1013);if(o.isInterleavedBufferAttribute){let n=o.data,r=n.stride,l=o.offset;if(n.isInstancedInterleavedBuffer){for(let e=0;e<a.locationSize;e++)x(a.location+e,n.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=n.meshPerAttribute*n.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,r*f,(l+c/a.locationSize*e)*f,p)}else{if(o.isInstancedBufferAttribute){for(let e=0;e<a.locationSize;e++)x(a.location+e,o.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=o.meshPerAttribute*o.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,c*f,c/a.locationSize*e*f,p)}}else if(u!==void 0){let n=u[t];if(n!==void 0)switch(n.length){case 2:e.vertexAttrib2fv(a.location,n);break;case 3:e.vertexAttrib3fv(a.location,n);break;case 4:e.vertexAttrib4fv(a.location,n);break;default:e.vertexAttrib1fv(a.location,n)}}}}S()}function T(){O();for(let e in s){let t=s[e];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e]}}function E(e){if(s[e.id]===void 0)return;let t=s[e.id];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e.id]}function D(e){for(let t in s){let n=s[t];if(n[e.id]===void 0)continue;let r=n[e.id];for(let e in r)m(r[e].object),delete r[e];delete n[e.id]}}function O(){k(),u=!0,l!==c&&(l=c,p(l.object))}function k(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:O,resetDefaultState:k,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:b,disableUnusedAttributes:S}}function ar(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}function s(t,r){e.drawArrays(a,t,r),n.update(r,a,1)}function c(r,o,s){if(s===0)return;let c,l;if(i)c=e,l=`drawArraysInstanced`;else if(c=t.get(`ANGLE_instanced_arrays`),l=`drawArraysInstancedANGLE`,c===null){console.error(`THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}c[l](a,r,o,s),n.update(o,a,s)}function l(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t],r[t]);else{o.multiDrawArraysWEBGL(a,e,0,r,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.render=s,this.renderInstances=c,this.renderMultiDraw=l}function or(e,t,n){let r;function i(){if(r!==void 0)return r;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);r=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let o=typeof WebGL2RenderingContext<`u`&&e.constructor.name===`WebGL2RenderingContext`,s=n.precision===void 0?`highp`:n.precision,c=a(s);c!==s&&(console.warn(`THREE.WebGLRenderer:`,s,`not supported, using`,c,`instead.`),s=c);let l=o||t.has(`WEBGL_draw_buffers`),u=n.logarithmicDepthBuffer===!0,d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),f=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,b=o||t.has(`OES_texture_float`),x=y&&b,S=o?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:a,precision:s,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:g,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:x,maxSamples:S}}function sr(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Jn,s=new R,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function cr(e){let t=/* @__PURE__ */ new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new Wn(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=/* @__PURE__ */ new WeakMap}return{get:r,dispose:a}}var lr=class extends Ln{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};let ur=[.125,.215,.35,.446,.526,.582],dr=/*@__PURE__*/ new lr,fr=/*@__PURE__*/ new Ht,pr=null,mr=0,hr=0,gr=(1+Math.sqrt(5))/2,_r=1/gr,vr=[/*@__PURE__*/ new W(1,1,1),/*@__PURE__*/ new W(-1,1,1),/*@__PURE__*/ new W(1,1,-1),/*@__PURE__*/ new W(-1,1,-1),/*@__PURE__*/ new W(0,gr,_r),/*@__PURE__*/ new W(0,gr,-_r),/*@__PURE__*/ new W(_r,0,gr),/*@__PURE__*/ new W(-_r,0,gr),/*@__PURE__*/ new W(gr,_r,0),/*@__PURE__*/ new W(-gr,_r,0)];var yr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){pr=this._renderer.getRenderTarget(),mr=this._renderer.getActiveCubeFace(),hr=this._renderer.getActiveMipmapLevel(),this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pr,mr,hr),e.scissorTest=!1,Sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pr=this._renderer.getRenderTarget(),mr=this._renderer.getActiveCubeFace(),hr=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:i,minFilter:i,generateMipmaps:!1,type:l,format:d,colorSpace:S,depthBuffer:!1},r=xr(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xr(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=br(r)),this._blurMaterial=Cr(r,e,t)}return r}_compileMaterial(e){let t=new Tn(this._lodPlanes[0],e);this._renderer.compile(t,dr)}_sceneToCubeUV(e,t,n,r){let i=new Vn(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor(fr),s.toneMapping=0,s.autoClear=!1;let u=new Kt({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new Tn(new On,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy(fr),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;Sr(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tr()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wr());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new Tn(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Sr(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,dr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let t=1;t<this._lodPlanes.length;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),r=vr[(t-1)%vr.length];this._blur(e,t-1,t,n,r)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new Tn(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):20;m>20&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let h=[],g=0;for(let e=0;e<20;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Sr(t,3*v*(r>_-4?r-_+4:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,dr)}};function br(e){let t=[],n=[],r=[],i=e,a=e-4+1+ur.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-4?s=ur[o-e+4-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=/* @__PURE__ */ new Float32Array(108),p=/* @__PURE__ */ new Float32Array(72),m=/* @__PURE__ */ new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new sn;h.setAttribute(`position`,new Yt(f,3)),h.setAttribute(`uv`,new Yt(p,2)),h.setAttribute(`faceIndex`,new Yt(m,1)),t.push(h),i>4&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function xr(e,t,n){let r=new Se(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Sr(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Cr(e,t,n){let r=/* @__PURE__ */ new Float32Array(20),i=new W(0,1,0);return new In({name:`SphericalGaussianBlur`,defines:{n:20,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Er(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wr(){return new In({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Er(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tr(){return new In({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Er(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Er(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dr(e){let t=/* @__PURE__ */ new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let i=t.get(r);return n===null&&(n=new yr(e)),i=s?n.fromEquirectangular(r,i):n.fromCubemap(r,i),t.set(r,i),i.texture}if(t.has(r))return t.get(r).texture;{let o=r.image;if(s&&o&&o.height>0||c&&o&&i(o)){n===null&&(n=new yr(e));let i=s?n.fromEquirectangular(r):n.fromCubemap(r);return t.set(r,i),r.addEventListener(`dispose`,a),i.texture}return null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=/* @__PURE__ */ new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function Or(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(e){e.isWebGL2?(n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`)):(n(`WEBGL_depth_texture`),n(`OES_texture_float`),n(`OES_texture_half_float`),n(`OES_texture_half_float_linear`),n(`OES_standard_derivatives`),n(`OES_element_index_uint`),n(`OES_vertex_array_object`),n(`ANGLE_instanced_arrays`)),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`)},get:function(e){let t=n(e);return t===null&&console.warn(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function kr(e,t,n,r){let i={},a=/* @__PURE__ */ new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(oe(n)?Zt:Xt)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Ar(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}let s,c;function l(e){s=e.type,c=e.bytesPerElement}function u(t,r){e.drawElements(a,r,s,t*c),n.update(r,a,1)}function d(r,o,l){if(l===0)return;let u,d;if(i)u=e,d=`drawElementsInstanced`;else if(u=t.get(`ANGLE_instanced_arrays`),d=`drawElementsInstancedANGLE`,u===null){console.error(`THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}u[d](a,o,s,r*c,l),n.update(o,a,l)}function f(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t]/c,r[t]);else{o.multiDrawElementsWEBGL(a,r,0,s,e,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function jr(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Mr(e,t){return e[0]-t[0]}function Nr(e,t){return Math.abs(t[1])-Math.abs(e[1])}function Pr(e,t,n){let r={},i=/* @__PURE__ */ new Float32Array(8),a=/* @__PURE__ */ new WeakMap,o=new be,s=[];for(let e=0;e<8;e++)s[e]=[e,0];function l(l,u,d){let f=l.morphTargetInfluences;if(t.isWebGL2===!0){let r=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,i=r===void 0?0:r.length,s=a.get(u);if(s===void 0||s.count!==i){s!==void 0&&s.texture.dispose();let e=u.morphAttributes.position!==void 0,n=u.morphAttributes.normal!==void 0,r=u.morphAttributes.color!==void 0,l=u.morphAttributes.position||[],d=u.morphAttributes.normal||[],f=u.morphAttributes.color||[],m=0;e===!0&&(m=1),n===!0&&(m=2),r===!0&&(m=3);let h=u.attributes.position.count*m,g=1;h>t.maxTextureSize&&(g=Math.ceil(h/t.maxTextureSize),h=t.maxTextureSize);let _=new Float32Array(h*g*4*i),v=new Ce(_,h,g,i);v.type=c,v.needsUpdate=!0;let y=m*4;for(let t=0;t<i;t++){let i=l[t],a=d[t],s=f[t],c=h*g*4*t;for(let t=0;t<i.count;t++){let l=t*y;e===!0&&(o.fromBufferAttribute(i,t),_[c+l+0]=o.x,_[c+l+1]=o.y,_[c+l+2]=o.z,_[c+l+3]=0),n===!0&&(o.fromBufferAttribute(a,t),_[c+l+4]=o.x,_[c+l+5]=o.y,_[c+l+6]=o.z,_[c+l+7]=0),r===!0&&(o.fromBufferAttribute(s,t),_[c+l+8]=o.x,_[c+l+9]=o.y,_[c+l+10]=o.z,_[c+l+11]=s.itemSize===4?o.w:1)}}s={count:i,texture:v,size:new L(h,g)},a.set(u,s);function p(){v.dispose(),a.delete(u),u.removeEventListener(`dispose`,p)}u.addEventListener(`dispose`,p)}let l=0;for(let e=0;e<f.length;e++)l+=f[e];let m=u.morphTargetsRelative?1:1-l;d.getUniforms().setValue(e,`morphTargetBaseInfluence`,m),d.getUniforms().setValue(e,`morphTargetInfluences`,f),d.getUniforms().setValue(e,`morphTargetsTexture`,s.texture,n),d.getUniforms().setValue(e,`morphTargetsTextureSize`,s.size)}else{let t=f===void 0?0:f.length,n=r[u.id];if(n===void 0||n.length!==t){n=[];for(let e=0;e<t;e++)n[e]=[e,0];r[u.id]=n}for(let e=0;e<t;e++){let t=n[e];t[0]=e,t[1]=f[e]}n.sort(Nr);for(let e=0;e<8;e++)e<t&&n[e][1]?(s[e][0]=n[e][0],s[e][1]=n[e][1]):(s[e][0]=2**53-1,s[e][1]=0);s.sort(Mr);let a=u.morphAttributes.position,o=u.morphAttributes.normal,c=0;for(let e=0;e<8;e++){let t=s[e],n=t[0],r=t[1];n!==2**53-1&&r?(a&&u.getAttribute(`morphTarget`+e)!==a[n]&&u.setAttribute(`morphTarget`+e,a[n]),o&&u.getAttribute(`morphNormal`+e)!==o[n]&&u.setAttribute(`morphNormal`+e,o[n]),i[e]=r,c+=r):(a&&u.hasAttribute(`morphTarget`+e)===!0&&u.deleteAttribute(`morphTarget`+e),o&&u.hasAttribute(`morphNormal`+e)===!0&&u.deleteAttribute(`morphNormal`+e),i[e]=0)}let l=u.morphTargetsRelative?1:1-c;d.getUniforms().setValue(e,`morphTargetBaseInfluence`,l),d.getUniforms().setValue(e,`morphTargetInfluences`,i)}}return{update:l}}function Fr(e,t,n,r){let i=/* @__PURE__ */ new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=/* @__PURE__ */ new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Ir=class extends ye{constructor(e,t,n,i,a,o,c,l,d,p){if(p=p===void 0?f:p,p!==1026&&p!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&p===1026&&(n=s),n===void 0&&p===1027&&(n=u),super(null,i,a,o,c,l,p,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c===void 0?r:c,this.minFilter=l===void 0?r:l,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};let Lr=/*@__PURE__*/ new ye,Rr=/*@__PURE__*/ new Ir(1,1);Rr.compareFunction=515;let zr=/*@__PURE__*/ new Ce,Br=/*@__PURE__*/ new we,Vr=/*@__PURE__*/ new Un,Hr=[],Ur=[],Wr=/* @__PURE__ */ new Float32Array(16),Gr=/* @__PURE__ */ new Float32Array(9),Kr=/* @__PURE__ */ new Float32Array(4);function qr(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Hr[i];if(a===void 0&&(a=new Float32Array(i),Hr[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Jr(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Yr(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Xr(e,t){let n=Ur[t];n===void 0&&(n=new Int32Array(t),Ur[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Zr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Qr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jr(n,t))return;e.uniform2fv(this.addr,t),Yr(n,t)}}function $r(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Jr(n,t))return;e.uniform3fv(this.addr,t),Yr(n,t)}}function ei(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jr(n,t))return;e.uniform4fv(this.addr,t),Yr(n,t)}}function ti(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jr(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Yr(n,t)}else{if(Jr(n,r))return;Kr.set(r),e.uniformMatrix2fv(this.addr,!1,Kr),Yr(n,r)}}function ni(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jr(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Yr(n,t)}else{if(Jr(n,r))return;Gr.set(r),e.uniformMatrix3fv(this.addr,!1,Gr),Yr(n,r)}}function ri(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jr(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Yr(n,t)}else{if(Jr(n,r))return;Wr.set(r),e.uniformMatrix4fv(this.addr,!1,Wr),Yr(n,r)}}function ii(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ai(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jr(n,t))return;e.uniform2iv(this.addr,t),Yr(n,t)}}function oi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Jr(n,t))return;e.uniform3iv(this.addr,t),Yr(n,t)}}function si(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jr(n,t))return;e.uniform4iv(this.addr,t),Yr(n,t)}}function ci(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function li(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jr(n,t))return;e.uniform2uiv(this.addr,t),Yr(n,t)}}function ui(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Jr(n,t))return;e.uniform3uiv(this.addr,t),Yr(n,t)}}function di(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jr(n,t))return;e.uniform4uiv(this.addr,t),Yr(n,t)}}function fi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a=this.type===e.SAMPLER_2D_SHADOW?Rr:Lr;n.setTexture2D(t||a,i)}function pi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Br,i)}function mi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Vr,i)}function hi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||zr,i)}function gi(e){switch(e){case 5126:return Zr;case 35664:return Qr;case 35665:return $r;case 35666:return ei;case 35674:return ti;case 35675:return ni;case 35676:return ri;case 5124:case 35670:return ii;case 35667:case 35671:return ai;case 35668:case 35672:return oi;case 35669:case 35673:return si;case 5125:return ci;case 36294:return li;case 36295:return ui;case 36296:return di;case 35678:case 36198:case 36298:case 36306:case 35682:return fi;case 35679:case 36299:case 36307:return pi;case 35680:case 36300:case 36308:case 36293:return mi;case 36289:case 36303:case 36311:case 36292:return hi}}function _i(e,t){e.uniform1fv(this.addr,t)}function vi(e,t){let n=qr(t,this.size,2);e.uniform2fv(this.addr,n)}function yi(e,t){let n=qr(t,this.size,3);e.uniform3fv(this.addr,n)}function bi(e,t){let n=qr(t,this.size,4);e.uniform4fv(this.addr,n)}function xi(e,t){let n=qr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Si(e,t){let n=qr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ci(e,t){let n=qr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function wi(e,t){e.uniform1iv(this.addr,t)}function Ti(e,t){e.uniform2iv(this.addr,t)}function Ei(e,t){e.uniform3iv(this.addr,t)}function Di(e,t){e.uniform4iv(this.addr,t)}function Oi(e,t){e.uniform1uiv(this.addr,t)}function ki(e,t){e.uniform2uiv(this.addr,t)}function Ai(e,t){e.uniform3uiv(this.addr,t)}function ji(e,t){e.uniform4uiv(this.addr,t)}function Mi(e,t,n){let r=this.cache,i=t.length,a=Xr(n,i);Jr(r,a)||(e.uniform1iv(this.addr,a),Yr(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||Lr,a[e])}function Ni(e,t,n){let r=this.cache,i=t.length,a=Xr(n,i);Jr(r,a)||(e.uniform1iv(this.addr,a),Yr(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Br,a[e])}function Pi(e,t,n){let r=this.cache,i=t.length,a=Xr(n,i);Jr(r,a)||(e.uniform1iv(this.addr,a),Yr(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Vr,a[e])}function Fi(e,t,n){let r=this.cache,i=t.length,a=Xr(n,i);Jr(r,a)||(e.uniform1iv(this.addr,a),Yr(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||zr,a[e])}function Ii(e){switch(e){case 5126:return _i;case 35664:return vi;case 35665:return yi;case 35666:return bi;case 35674:return xi;case 35675:return Si;case 35676:return Ci;case 5124:case 35670:return wi;case 35667:case 35671:return Ti;case 35668:case 35672:return Ei;case 35669:case 35673:return Di;case 5125:return Oi;case 36294:return ki;case 36295:return Ai;case 36296:return ji;case 35678:case 36198:case 36298:case 36306:case 35682:return Mi;case 35679:case 36299:case 36307:return Ni;case 35680:case 36300:case 36308:case 36293:return Pi;case 36289:case 36303:case 36311:case 36292:return Fi}}var Li=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gi(t.type)}},Ri=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ii(t.type)}},zi=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}};let Bi=/(\w+)(\])?(\[|\.)?/g;function Vi(e,t){e.seq.push(t),e.map[t.id]=t}function Hi(e,t,n){let r=e.name,i=r.length;for(Bi.lastIndex=0;;){let a=Bi.exec(r),o=Bi.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Vi(n,l===void 0?new Li(s,e,t):new Ri(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new zi(s),Vi(n,e)),n=e}}}var Ui=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Hi(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Wi(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}let Gi=0;function Ki(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}function qi(e){let t=z.getPrimaries(z.workingColorSpace),n=z.getPrimaries(e),r;switch(t===n?r=``:t===`p3`&&n===`rec709`?r=`LinearDisplayP3ToLinearSRGB`:t===`rec709`&&n===`p3`&&(r=`LinearSRGBToLinearDisplayP3`),e){case S:case w:return[r,`LinearTransferOETF`];case x:case C:return[r,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space:`,e),[r,`LinearTransferOETF`]}}function Ji(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ki(e.getShaderSource(t),r)}return i}function Yi(e,t){let n=qi(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Xi(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`OptimizedCineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}function Zi(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.alphaToCoverage||e.shaderID===`physical`?`#extension GL_OES_standard_derivatives : enable`:``,(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?`#extension GL_EXT_frag_depth : enable`:``,e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?`#extension GL_EXT_draw_buffers : require`:``,(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?`#extension GL_EXT_shader_texture_lod : enable`:``].filter(ta).join(`
`)}function Qi(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ta).join(`
`)}function $i(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ea(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ta(e){return e!==``}function na(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ra(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}let ia=/^[ \t]*#include +<([\w\d./]+)>/gm;function aa(e){return e.replace(ia,sa)}let oa=/* @__PURE__ */ new Map([[`encodings_fragment`,`colorspace_fragment`],[`encodings_pars_fragment`,`colorspace_pars_fragment`],[`output_fragment`,`opaque_fragment`]]);function sa(e,t){let n=G[t];if(n===void 0){let e=oa.get(t);if(e!==void 0)n=G[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return aa(n)}let ca=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function la(e){return e.replace(ca,ua)}function ua(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function da(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	`;return e.isWebGL2&&(t+=`precision ${e.precision} sampler3D;
		precision ${e.precision} sampler2DArray;
		precision ${e.precision} sampler2DShadow;
		precision ${e.precision} samplerCubeShadow;
		precision ${e.precision} sampler2DArrayShadow;
		precision ${e.precision} isampler2D;
		precision ${e.precision} isampler3D;
		precision ${e.precision} isamplerCube;
		precision ${e.precision} isampler2DArray;
		precision ${e.precision} usampler2D;
		precision ${e.precision} usampler3D;
		precision ${e.precision} usamplerCube;
		precision ${e.precision} usampler2DArray;
		`),e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function fa(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function pa(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function ma(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function ha(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function ga(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function _a(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=fa(n),l=pa(n),u=ma(n),d=ha(n),f=ga(n),p=n.isWebGL2?``:Zi(n),m=Qi(n),h=$i(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ta).join(`
`),_.length>0&&(_+=`
`),v=[p,`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ta).join(`
`),v.length>0&&(v+=`
`)):(_=[da(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors&&n.isWebGL2?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )`,`	attribute vec3 morphTarget0;`,`	attribute vec3 morphTarget1;`,`	attribute vec3 morphTarget2;`,`	attribute vec3 morphTarget3;`,`	#ifdef USE_MORPHNORMALS`,`		attribute vec3 morphNormal0;`,`		attribute vec3 morphNormal1;`,`		attribute vec3 morphNormal2;`,`		attribute vec3 morphNormal3;`,`	#else`,`		attribute vec3 morphTarget4;`,`		attribute vec3 morphTarget5;`,`		attribute vec3 morphTarget6;`,`		attribute vec3 morphTarget7;`,`	#endif`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ta).join(`
`),v=[p,da(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:G.tonemapping_pars_fragment,n.toneMapping===0?``:Xi(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,G.colorspace_pars_fragment,Yi(`linearToOutputTexel`,n.outputColorSpace),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ta).join(`
`)),o=aa(o),o=na(o,n),o=ra(o,n),s=aa(s),s=na(s,n),s=ra(s,n),o=la(o),s=la(s),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`precision mediump sampler2DArray;`,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`precision mediump sampler2DArray;`,`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=Wi(i,i.VERTEX_SHADER,b),C=Wi(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g).trim(),r=i.getShaderInfoLog(S).trim(),a=i.getShaderInfoLog(C).trim(),o=!0,s=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Ji(i,S,`vertex`),r=Ji(i,C,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+n+`
`+e+`
`+r)}}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:_},fragmentShader:{log:a,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Ui(i,g),E=ea(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,37297)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Gi++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}let va=0;var ya=class{constructor(){this.shaderCache=/* @__PURE__ */ new Map,this.materialCache=/* @__PURE__ */ new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=/* @__PURE__ */ new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ba(e),t.set(e,n)),n}},ba=class{constructor(e){this.id=va++,this.code=e,this.usedTimes=0}};function xa(e,t,n,r,i,a,o){let s=new ft,c=new ya,l=/* @__PURE__ */ new Set,u=[],d=i.isWebGL2,f=i.logarithmicDepthBuffer,p=i.vertexTextures,m=i.precision,h={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function g(e){return l.add(e),e===0?`uv`:`uv${e}`}function _(a,s,u,_,v){let y=_.fog,b=v.geometry,x=a.isMeshStandardMaterial?_.environment:null,C=(a.isMeshStandardMaterial?n:t).get(a.envMap||x),w=C&&C.mapping===306?C.image.height:null,T=h[a.type];a.precision!==null&&(m=i.getMaxPrecision(a.precision),m!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,m,`instead.`));let E=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,D=E===void 0?0:E.length,O=0;b.morphAttributes.position!==void 0&&(O=1),b.morphAttributes.normal!==void 0&&(O=2),b.morphAttributes.color!==void 0&&(O=3);let k,A,j,M;if(T){let e=tr[T];k=e.vertexShader,A=e.fragmentShader}else k=a.vertexShader,A=a.fragmentShader,c.update(a),j=c.getVertexShaderID(a),M=c.getFragmentShaderID(a);let N=e.getRenderTarget(),P=v.isInstancedMesh===!0,F=v.isBatchedMesh===!0,ee=!!a.map,I=!!a.matcap,te=!!C,ne=!!a.aoMap,re=!!a.lightMap,ie=!!a.bumpMap,L=!!a.normalMap,R=!!a.displacementMap,ae=!!a.emissiveMap,oe=!!a.metalnessMap,se=!!a.roughnessMap,ce=a.anisotropy>0,le=a.clearcoat>0,ue=a.iridescence>0,de=a.sheen>0,fe=a.transmission>0,pe=ce&&!!a.anisotropyMap,me=le&&!!a.clearcoatMap,B=le&&!!a.clearcoatNormalMap,he=le&&!!a.clearcoatRoughnessMap,V=ue&&!!a.iridescenceMap,ge=ue&&!!a.iridescenceThicknessMap,H=de&&!!a.sheenColorMap,_e=de&&!!a.sheenRoughnessMap,U=!!a.specularMap,ve=!!a.specularColorMap,ye=!!a.specularIntensityMap,be=fe&&!!a.transmissionMap,xe=fe&&!!a.thicknessMap,Se=!!a.gradientMap,Ce=!!a.alphaMap,we=a.alphaTest>0,Te=!!a.alphaHash,W=!!a.extensions,Ee=0;a.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ee=e.toneMapping);let De={isWebGL2:d,shaderID:T,shaderType:a.type,shaderName:a.name,vertexShader:k,fragmentShader:A,defines:a.defines,customVertexShaderID:j,customFragmentShaderID:M,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:m,batching:F,instancing:P,instancingColor:P&&v.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:N===null?e.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:S,alphaToCoverage:!!a.alphaToCoverage,map:ee,matcap:I,envMap:te,envMapMode:te&&C.mapping,envMapCubeUVHeight:w,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:L,displacementMap:p&&R,emissiveMap:ae,normalMapObjectSpace:L&&a.normalMapType===1,normalMapTangentSpace:L&&a.normalMapType===0,metalnessMap:oe,roughnessMap:se,anisotropy:ce,anisotropyMap:pe,clearcoat:le,clearcoatMap:me,clearcoatNormalMap:B,clearcoatRoughnessMap:he,iridescence:ue,iridescenceMap:V,iridescenceThicknessMap:ge,sheen:de,sheenColorMap:H,sheenRoughnessMap:_e,specularMap:U,specularColorMap:ve,specularIntensityMap:ye,transmission:fe,transmissionMap:be,thicknessMap:xe,gradientMap:Se,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Ce,alphaTest:we,alphaHash:Te,combine:a.combine,mapUv:ee&&g(a.map.channel),aoMapUv:ne&&g(a.aoMap.channel),lightMapUv:re&&g(a.lightMap.channel),bumpMapUv:ie&&g(a.bumpMap.channel),normalMapUv:L&&g(a.normalMap.channel),displacementMapUv:R&&g(a.displacementMap.channel),emissiveMapUv:ae&&g(a.emissiveMap.channel),metalnessMapUv:oe&&g(a.metalnessMap.channel),roughnessMapUv:se&&g(a.roughnessMap.channel),anisotropyMapUv:pe&&g(a.anisotropyMap.channel),clearcoatMapUv:me&&g(a.clearcoatMap.channel),clearcoatNormalMapUv:B&&g(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&g(a.clearcoatRoughnessMap.channel),iridescenceMapUv:V&&g(a.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&g(a.iridescenceThicknessMap.channel),sheenColorMapUv:H&&g(a.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(a.sheenRoughnessMap.channel),specularMapUv:U&&g(a.specularMap.channel),specularColorMapUv:ve&&g(a.specularColorMap.channel),specularIntensityMapUv:ye&&g(a.specularIntensityMap.channel),transmissionMapUv:be&&g(a.transmissionMap.channel),thicknessMapUv:xe&&g(a.thicknessMap.channel),alphaMapUv:Ce&&g(a.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(L||ce),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:v.isPoints===!0&&!!b.attributes.uv&&(ee||Ce),fog:!!y,useFog:a.fog===!0,fogExp2:!!y&&y.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:v.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:O,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ee,useLegacyLights:e._useLegacyLights,decodeVideoTexture:ee&&a.map.isVideoTexture===!0&&z.getTransfer(a.map.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionDerivatives:W&&a.extensions.derivatives===!0,extensionFragDepth:W&&a.extensions.fragDepth===!0,extensionDrawBuffers:W&&a.extensions.drawBuffers===!0,extensionShaderTextureLOD:W&&a.extensions.shaderTextureLOD===!0,extensionClipCullDistance:W&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:W&&a.extensions.multiDraw===!0&&r.has(`WEBGL_multi_draw`),rendererExtensionFragDepth:d||r.has(`EXT_frag_depth`),rendererExtensionDrawBuffers:d||r.has(`WEBGL_draw_buffers`),rendererExtensionShaderTextureLod:d||r.has(`EXT_shader_texture_lod`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function v(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(y(n,t),b(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function y(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function b(e,t){s.disableAll(),t.isWebGL2&&s.enable(0),t.supportsVertexTextures&&s.enable(1),t.instancing&&s.enable(2),t.instancingColor&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.skinning&&s.enable(4),t.morphTargets&&s.enable(5),t.morphNormals&&s.enable(6),t.morphColors&&s.enable(7),t.premultipliedAlpha&&s.enable(8),t.shadowMapEnabled&&s.enable(9),t.useLegacyLights&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.alphaToCoverage&&s.enable(20),e.push(s.mask)}function x(e){let t=h[e.type],n;if(t){let e=tr[t];n=Nn.clone(e.uniforms)}else n=e.uniforms;return n}function C(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new _a(e,n,t,a),u.push(r)),r}function w(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function T(e){c.remove(e)}function E(){c.dispose()}return{getParameters:_,getProgramCacheKey:v,getUniforms:x,acquireProgram:C,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:E}}function Sa(){let e=/* @__PURE__ */ new WeakMap;function t(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function n(t){e.delete(t)}function r(t,n,r){e.get(t)[n]=r}function i(){e=/* @__PURE__ */ new WeakMap}return{get:t,remove:n,update:r,dispose:i}}function Ca(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wa(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ta(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||Ca),r.length>1&&r.sort(t||wa),i.length>1&&i.sort(t||wa)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function Ea(){let e=/* @__PURE__ */ new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ta,e.set(t,[i])):n>=r.length?(i=new Ta,r.push(i)):i=r[n],i}function n(){e=/* @__PURE__ */ new WeakMap}return{get:t,dispose:n}}function Da(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new W,color:new Ht};break;case`SpotLight`:n={position:new W,direction:new W,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new Ht,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new Ht,groundColor:new Ht};break;case`RectAreaLight`:n={color:new Ht,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function Oa(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`SpotLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`PointLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}let ka=0;function Aa(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ja(e,t){let n=new Da,r=Oa(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)i.probe.push(new W);let a=new W,o=new tt,s=new tt;function c(a,o){let s=0,c=0,l=0;for(let e=0;e<9;e++)i.probe[e].set(0,0,0);let u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0;a.sort(Aa);let x=o===!0?Math.PI:1;for(let e=0,t=a.length;e<t;e++){let t=a[e],o=t.color,S=t.intensity,C=t.distance,w=t.shadow&&t.shadow.map?t.shadow.map.texture:null;if(t.isAmbientLight)s+=o.r*S*x,c+=o.g*S*x,l+=o.b*S*x;else if(t.isLightProbe){for(let e=0;e<9;e++)i.probe[e].addScaledVector(t.sh.coefficients[e],S);b++}else if(t.isDirectionalLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,i.directionalShadow[u]=n,i.directionalShadowMap[u]=w,i.directionalShadowMatrix[u]=t.shadow.matrix,h++}i.directional[u]=e,u++}else if(t.isSpotLight){let e=n.get(t);e.position.setFromMatrixPosition(t.matrixWorld),e.color.copy(o).multiplyScalar(S*x),e.distance=C,e.coneCos=Math.cos(t.angle),e.penumbraCos=Math.cos(t.angle*(1-t.penumbra)),e.decay=t.decay,i.spot[f]=e;let a=t.shadow;if(t.map&&(i.spotLightMap[v]=t.map,v++,a.updateMatrices(t),t.castShadow&&y++),i.spotLightMatrix[f]=a.matrix,t.castShadow){let e=r.get(t);e.shadowBias=a.bias,e.shadowNormalBias=a.normalBias,e.shadowRadius=a.radius,e.shadowMapSize=a.mapSize,i.spotShadow[f]=e,i.spotShadowMap[f]=w,_++}f++}else if(t.isRectAreaLight){let e=n.get(t);e.color.copy(o).multiplyScalar(S),e.halfWidth.set(t.width*.5,0,0),e.halfHeight.set(0,t.height*.5,0),i.rectArea[p]=e,p++}else if(t.isPointLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),e.distance=t.distance,e.decay=t.decay,t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,n.shadowCameraNear=e.camera.near,n.shadowCameraFar=e.camera.far,i.pointShadow[d]=n,i.pointShadowMap[d]=w,i.pointShadowMatrix[d]=t.shadow.matrix,g++}i.point[d]=e,d++}else if(t.isHemisphereLight){let e=n.get(t);e.skyColor.copy(t.color).multiplyScalar(S*x),e.groundColor.copy(t.groundColor).multiplyScalar(S*x),i.hemi[m]=e,m++}}p>0&&(t.isWebGL2?e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=K.LTC_FLOAT_1,i.rectAreaLTC2=K.LTC_FLOAT_2):(i.rectAreaLTC1=K.LTC_HALF_1,i.rectAreaLTC2=K.LTC_HALF_2):e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=K.LTC_FLOAT_1,i.rectAreaLTC2=K.LTC_FLOAT_2):e.has(`OES_texture_half_float_linear`)===!0?(i.rectAreaLTC1=K.LTC_HALF_1,i.rectAreaLTC2=K.LTC_HALF_2):console.error(`THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.`)),i.ambient[0]=s,i.ambient[1]=c,i.ambient[2]=l;let S=i.hash;(S.directionalLength!==u||S.pointLength!==d||S.spotLength!==f||S.rectAreaLength!==p||S.hemiLength!==m||S.numDirectionalShadows!==h||S.numPointShadows!==g||S.numSpotShadows!==_||S.numSpotMaps!==v||S.numLightProbes!==b)&&(i.directional.length=u,i.spot.length=f,i.rectArea.length=p,i.point.length=d,i.hemi.length=m,i.directionalShadow.length=h,i.directionalShadowMap.length=h,i.pointShadow.length=g,i.pointShadowMap.length=g,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=h,i.pointShadowMatrix.length=g,i.spotLightMatrix.length=_+v-y,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=b,S.directionalLength=u,S.pointLength=d,S.spotLength=f,S.rectAreaLength=p,S.hemiLength=m,S.numDirectionalShadows=h,S.numPointShadows=g,S.numSpotShadows=_,S.numSpotMaps=v,S.numLightProbes=b,i.version=ka++)}function l(e,t){let n=0,r=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=i.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=i.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=i.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s.identity(),o.copy(f.matrixWorld),o.premultiply(d),s.extractRotation(o),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(s),e.halfHeight.applyMatrix4(s),l++}else if(f.isPointLight){let e=i.point[r];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),r++}else if(f.isHemisphereLight){let e=i.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:c,setupView:l,state:i}}function Ma(e,t){let n=new ja(e,t),r=[],i=[];function a(){r.length=0,i.length=0}function o(e){r.push(e)}function s(e){i.push(e)}function c(e){n.setup(r,e)}function l(e){n.setupView(r,e)}return{init:a,state:{lightsArray:r,shadowsArray:i,lights:n},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Na(e,t){let n=/* @__PURE__ */ new WeakMap;function r(r,i=0){let a=n.get(r),o;return a===void 0?(o=new Ma(e,t),n.set(r,[o])):i>=a.length?(o=new Ma(e,t),a.push(o)):o=a[i],o}function i(){n=/* @__PURE__ */ new WeakMap}return{get:r,dispose:i}}var Pa=class extends Gt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fa=class extends Gt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ia(e,t,n){let i=new Zn,a=new L,o=new L,s=new be,c=new Pa({depthPacking:3201}),l=new Fa,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new L},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new sn;h.setAttribute(`position`,new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Tn(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let g=f.getFrameExtents();if(a.multiply(g),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/g.x),a.x=o.x*g.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/g.y),a.y=o.y*g.y,f.mapSize.y=o.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:r,magFilter:r};f.map!==null&&f.map.dispose(),f.map=new Se(a.x,a.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(o.x*t.x,o.y*t.y,o.x*t.z,o.y*t.w),p.viewport(s),f.updateMatrices(u,e),i=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let i=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Se(a.x,a.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],r,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function La(e,t,n){let r=n.isWebGL2;function i(){let t=!1,n=new be,r=null,i=new be(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function a(){let t=!1,n=null,r=null,i=null;return{setTest:function(t){t?oe(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(r){n!==r&&!t&&(e.depthMask(r),n=r)},setFunc:function(t){if(r!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}r=t}},setLocked:function(e){t=e},setClear:function(t){i!==t&&(e.clearDepth(t),i=t)},reset:function(){t=!1,n=null,r=null,i=null}}}function o(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?oe(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let s=new i,c=new a,l=new o,u=/* @__PURE__ */ new WeakMap,d=/* @__PURE__ */ new WeakMap,f={},p={},m=/* @__PURE__ */ new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new Ht(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,N=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,F=0,ee=e.getParameter(e.VERSION);ee.indexOf(`WebGL`)===-1?ee.indexOf(`OpenGL ES`)!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),P=F>=2):(F=parseFloat(/^WebGL (\d)/.exec(ee)[1]),P=F>=1);let I=null,te={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new be().fromArray(ne),L=new be().fromArray(re);function R(t,n,i,a){let o=/* @__PURE__ */ new Uint8Array(4),s=e.createTexture();e.bindTexture(t,s),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let s=0;s<i;s++)r&&(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)?e.texImage3D(n,0,e.RGBA,1,1,a,0,e.RGBA,e.UNSIGNED_BYTE,o):e.texImage2D(n+s,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,o);return s}let ae={};ae[e.TEXTURE_2D]=R(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=R(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(ae[e.TEXTURE_2D_ARRAY]=R(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=R(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),s.setClear(0,0,0,1),c.setClear(1),l.setClear(0),oe(e.DEPTH_TEST),c.setFunc(3),z(!1),B(1),oe(e.CULL_FACE),pe(0);function oe(t){f[t]!==!0&&(e.enable(t),f[t]=!0)}function se(t){f[t]!==!1&&(e.disable(t),f[t]=!1)}function ce(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,r&&(t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n)),!0)}function le(r,i){let a=h,o=!1;if(r){if(a=m.get(i),a===void 0&&(a=[],m.set(i,a)),r.isWebGLMultipleRenderTargets){let t=r.texture;if(a.length!==t.length||a[0]!==e.COLOR_ATTACHMENT0){for(let n=0,r=t.length;n<r;n++)a[n]=e.COLOR_ATTACHMENT0+n;a.length=t.length,o=!0}}else a[0]!==e.COLOR_ATTACHMENT0&&(a[0]=e.COLOR_ATTACHMENT0,o=!0)}else a[0]!==e.BACK&&(a[0]=e.BACK,o=!0);o&&(n.isWebGL2?e.drawBuffers(a):t.get(`WEBGL_draw_buffers`).drawBuffersWEBGL(a))}function ue(t){return g!==t&&(e.useProgram(t),g=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(r)de[103]=e.MIN,de[104]=e.MAX;else{let e=t.get(`EXT_blend_minmax`);e!==null&&(de[103]=e.MIN_EXT,de[104]=e.MAX_EXT)}let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)_===!0&&(se(e.BLEND),_=!1);else if(_===!1&&(oe(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}}else a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(de[n],de[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function me(t,n){t.side===2?se(e.CULL_FACE):oe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),z(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),c.setFunc(t.depthFunc),c.setTest(t.depthTest),c.setMask(t.depthWrite),s.setMask(t.colorWrite);let i=t.stencilWrite;l.setTest(i),i&&(l.setMask(t.stencilWriteMask),l.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),l.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),V(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function z(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function B(t){t===0?se(e.CULL_FACE):(oe(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function he(t){t!==A&&(P&&e.lineWidth(t),A=t)}function V(t,n,r){t?(oe(e.POLYGON_OFFSET_FILL),(j!==n||M!==r)&&(e.polygonOffset(n,r),j=n,M=r)):se(e.POLYGON_OFFSET_FILL)}function ge(t){t?oe(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function H(t){t===void 0&&(t=e.TEXTURE0+N-1),I!==t&&(e.activeTexture(t),I=t)}function _e(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+N-1:I);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function U(){let t=te[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ve(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ye(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function xe(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Se(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ce(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function W(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function ke(t){L.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),L.copy(t))}function Ae(t,n){let r=d.get(n);r===void 0&&(r=/* @__PURE__ */ new WeakMap,d.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function je(t,n){let r=d.get(n).get(t);u.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),u.set(n,r))}function Me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),r===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},I=null,te={},p={},m=/* @__PURE__ */ new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new Ht(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,ie.set(0,0,e.canvas.width,e.canvas.height),L.set(0,0,e.canvas.width,e.canvas.height),s.reset(),c.reset(),l.reset()}return{buffers:{color:s,depth:c,stencil:l},enable:oe,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:z,setCullFace:B,setLineWidth:he,setPolygonOffset:V,setScissorTest:ge,activeTexture:H,bindTexture:_e,unbindTexture:U,compressedTexImage2D:ve,compressedTexImage3D:ye,texImage2D:Ee,texImage3D:De,updateUBOMapping:Ae,uniformBlockBinding:je,texStorage2D:Te,texStorage3D:W,texSubImage2D:xe,texSubImage3D:Se,compressedTexSubImage2D:Ce,compressedTexSubImage3D:we,scissor:Oe,viewport:ke,reset:Me}}function Ra(o,c,l,d,f,p,m){let h=f.isWebGL2,g=c.has(`WEBGL_multisampled_render_to_texture`)?c.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=/* @__PURE__ */ new WeakMap,y,b=/* @__PURE__ */ new WeakMap,x=!1;try{x=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function S(e,t){return x?new OffscreenCanvas(e,t):se(`canvas`)}function C(e,t,n,r){let i=1;if((e.width>r||e.height>r)&&(i=r/Math.max(e.width,e.height)),i<1||t===!0){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let r=t?ne:Math.floor,a=r(i*e.width),o=r(i*e.height);y===void 0&&(y=S(a,o));let s=n?S(a,o):y;return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+e.width+`x`+e.height+`) to (`+a+`x`+o+`).`),s}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+e.width+`x`+e.height+`).`),e}return e}function w(e){return te(e.width)&&te(e.height)}function E(e){return h?!1:e.wrapS!==1001||e.wrapT!==1001||e.minFilter!==1003&&e.minFilter!==1006}function D(e,t){return e.generateMipmaps&&t&&e.minFilter!==1003&&e.minFilter!==1006}function O(e){o.generateMipmap(e)}function k(e,t,n,r,i=!1){if(h===!1)return t;if(e!==null){if(o[e]!==void 0)return o[e];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let a=t;if(t===o.RED&&(n===o.FLOAT&&(a=o.R32F),n===o.HALF_FLOAT&&(a=o.R16F),n===o.UNSIGNED_BYTE&&(a=o.R8)),t===o.RED_INTEGER&&(n===o.UNSIGNED_BYTE&&(a=o.R8UI),n===o.UNSIGNED_SHORT&&(a=o.R16UI),n===o.UNSIGNED_INT&&(a=o.R32UI),n===o.BYTE&&(a=o.R8I),n===o.SHORT&&(a=o.R16I),n===o.INT&&(a=o.R32I)),t===o.RG&&(n===o.FLOAT&&(a=o.RG32F),n===o.HALF_FLOAT&&(a=o.RG16F),n===o.UNSIGNED_BYTE&&(a=o.RG8)),t===o.RGBA){let e=i?T:z.getTransfer(r);n===o.FLOAT&&(a=o.RGBA32F),n===o.HALF_FLOAT&&(a=o.RGBA16F),n===o.UNSIGNED_BYTE&&(a=e===`srgb`?o.SRGB8_ALPHA8:o.RGBA8),n===o.UNSIGNED_SHORT_4_4_4_4&&(a=o.RGBA4),n===o.UNSIGNED_SHORT_5_5_5_1&&(a=o.RGB5_A1)}return(a===o.R16F||a===o.R32F||a===o.RG16F||a===o.RG32F||a===o.RGBA16F||a===o.RGBA32F)&&c.get(`EXT_color_buffer_float`),a}function A(e,t,n){return D(e,n)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function j(e){return e===1003||e===1004||e===1005?o.NEAREST:o.LINEAR}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),P(t),t.isVideoTexture&&v.delete(t)}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),ee(t)}function P(e){let t=d.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=b.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&F(e),Object.keys(r).length===0&&b.delete(n)}d.remove(e)}function F(e){let t=d.get(e);o.deleteTexture(t.__webglTexture);let n=e.source,r=b.get(n);delete r[t.__cacheKey],m.memory.textures--}function ee(e){let t=e.texture,n=d.get(e),r=d.get(t);if(r.__webglTexture!==void 0&&(o.deleteTexture(r.__webglTexture),m.memory.textures--),e.depthTexture&&e.depthTexture.dispose(),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(n.__webglFramebuffer[e]))for(let t=0;t<n.__webglFramebuffer[e].length;t++)o.deleteFramebuffer(n.__webglFramebuffer[e][t]);else o.deleteFramebuffer(n.__webglFramebuffer[e]);n.__webglDepthbuffer&&o.deleteRenderbuffer(n.__webglDepthbuffer[e])}else{if(Array.isArray(n.__webglFramebuffer))for(let e=0;e<n.__webglFramebuffer.length;e++)o.deleteFramebuffer(n.__webglFramebuffer[e]);else o.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&o.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&o.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let e=0;e<n.__webglColorRenderbuffer.length;e++)n.__webglColorRenderbuffer[e]&&o.deleteRenderbuffer(n.__webglColorRenderbuffer[e]);n.__webglDepthRenderbuffer&&o.deleteRenderbuffer(n.__webglDepthRenderbuffer)}if(e.isWebGLMultipleRenderTargets)for(let e=0,n=t.length;e<n;e++){let n=d.get(t[e]);n.__webglTexture&&(o.deleteTexture(n.__webglTexture),m.memory.textures--),d.remove(t[e])}d.remove(t),d.remove(e)}let I=0;function re(){I=0}function ie(){let e=I;return e>=f.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+f.maxTextures),I+=1,e}function L(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function R(e,t){let n=d.get(e);if(e.isVideoTexture&&Ce(e),e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{me(n,e,t);return}}l.bindTexture(o.TEXTURE_2D,n.__webglTexture,o.TEXTURE0+t)}function ae(e,t){let n=d.get(e);e.version>0&&n.__version!==e.version?me(n,e,t):l.bindTexture(o.TEXTURE_2D_ARRAY,n.__webglTexture,o.TEXTURE0+t)}function oe(e,t){let n=d.get(e);e.version>0&&n.__version!==e.version?me(n,e,t):l.bindTexture(o.TEXTURE_3D,n.__webglTexture,o.TEXTURE0+t)}function ce(e,t){let n=d.get(e);e.version>0&&n.__version!==e.version?B(n,e,t):l.bindTexture(o.TEXTURE_CUBE_MAP,n.__webglTexture,o.TEXTURE0+t)}let le={[e]:o.REPEAT,[t]:o.CLAMP_TO_EDGE,[n]:o.MIRRORED_REPEAT},ue={[r]:o.NEAREST,1004:o.NEAREST_MIPMAP_NEAREST,1005:o.NEAREST_MIPMAP_LINEAR,[i]:o.LINEAR,1007:o.LINEAR_MIPMAP_NEAREST,[a]:o.LINEAR_MIPMAP_LINEAR},de={512:o.NEVER,519:o.ALWAYS,513:o.LESS,515:o.LEQUAL,514:o.EQUAL,518:o.GEQUAL,516:o.GREATER,517:o.NOTEQUAL};function fe(e,t,n){if(t.type===1015&&c.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),n?(o.texParameteri(e,o.TEXTURE_WRAP_S,le[t.wrapS]),o.texParameteri(e,o.TEXTURE_WRAP_T,le[t.wrapT]),(e===o.TEXTURE_3D||e===o.TEXTURE_2D_ARRAY)&&o.texParameteri(e,o.TEXTURE_WRAP_R,le[t.wrapR]),o.texParameteri(e,o.TEXTURE_MAG_FILTER,ue[t.magFilter]),o.texParameteri(e,o.TEXTURE_MIN_FILTER,ue[t.minFilter])):(o.texParameteri(e,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(e,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),(e===o.TEXTURE_3D||e===o.TEXTURE_2D_ARRAY)&&o.texParameteri(e,o.TEXTURE_WRAP_R,o.CLAMP_TO_EDGE),(t.wrapS!==1001||t.wrapT!==1001)&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.`),o.texParameteri(e,o.TEXTURE_MAG_FILTER,j(t.magFilter)),o.texParameteri(e,o.TEXTURE_MIN_FILTER,j(t.minFilter)),t.minFilter!==1003&&t.minFilter!==1006&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.`)),t.compareFunction&&(o.texParameteri(e,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(e,o.TEXTURE_COMPARE_FUNC,de[t.compareFunction])),c.has(`EXT_texture_filter_anisotropic`)===!0){let n=c.get(`EXT_texture_filter_anisotropic`);if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&c.has(`OES_texture_float_linear`)===!1||h===!1&&t.type===1016&&c.has(`OES_texture_half_float_linear`)===!1)return;(t.anisotropy>1||d.get(t).__currentAnisotropy)&&(o.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,f.getMaxAnisotropy())),d.get(t).__currentAnisotropy=t.anisotropy)}}function pe(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,M));let r=t.source,i=b.get(r);i===void 0&&(i={},b.set(r,i));let a=L(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:o.createTexture(),usedTimes:0},m.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&F(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function me(e,t,n){let r=o.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=o.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=o.TEXTURE_3D);let i=pe(e,t),a=t.source;l.bindTexture(r,e.__webglTexture,o.TEXTURE0+n);let c=d.get(a);if(a.version!==c.__version||i===!0){l.activeTexture(o.TEXTURE0+n);let e=z.getPrimaries(z.workingColorSpace),d=t.colorSpace===``?null:z.getPrimaries(t.colorSpace),m=t.colorSpace===``||e===d?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,t.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,t.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,m);let g=E(t)&&w(t.image)===!1,_=C(t.image,g,!1,f.maxTextureSize);_=we(t,_);let v=w(_)||h,y=p.convert(t.format,t.colorSpace),b=p.convert(t.type),x=k(t.internalFormat,y,b,t.colorSpace,t.isVideoTexture);fe(r,t,v);let S,T=t.mipmaps,j=h&&t.isVideoTexture!==!0&&x!==36196,M=c.__version===void 0||i===!0,N=a.dataReady,P=A(t,_,v);if(t.isDepthTexture)x=o.DEPTH_COMPONENT,h?x=t.type===1015?o.DEPTH_COMPONENT32F:t.type===1014?o.DEPTH_COMPONENT24:t.type===1020?o.DEPTH24_STENCIL8:o.DEPTH_COMPONENT16:t.type===1015&&console.error(`WebGLRenderer: Floating point depth texture requires WebGL2.`),t.format===1026&&x===o.DEPTH_COMPONENT&&t.type!==1012&&t.type!==1014&&(console.warn(`THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.`),t.type=s,b=p.convert(t.type)),t.format===1027&&x===o.DEPTH_COMPONENT&&(x=o.DEPTH_STENCIL,t.type!==1020&&(console.warn(`THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.`),t.type=u,b=p.convert(t.type))),M&&(j?l.texStorage2D(o.TEXTURE_2D,1,x,_.width,_.height):l.texImage2D(o.TEXTURE_2D,0,x,_.width,_.height,0,y,b,null));else if(t.isDataTexture){if(T.length>0&&v){j&&M&&l.texStorage2D(o.TEXTURE_2D,P,x,T[0].width,T[0].height);for(let e=0,t=T.length;e<t;e++)S=T[e],j?N&&l.texSubImage2D(o.TEXTURE_2D,e,0,0,S.width,S.height,y,b,S.data):l.texImage2D(o.TEXTURE_2D,e,x,S.width,S.height,0,y,b,S.data);t.generateMipmaps=!1}else j?(M&&l.texStorage2D(o.TEXTURE_2D,P,x,_.width,_.height),N&&l.texSubImage2D(o.TEXTURE_2D,0,0,0,_.width,_.height,y,b,_.data)):l.texImage2D(o.TEXTURE_2D,0,x,_.width,_.height,0,y,b,_.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){j&&M&&l.texStorage3D(o.TEXTURE_2D_ARRAY,P,x,T[0].width,T[0].height,_.depth);for(let e=0,n=T.length;e<n;e++)S=T[e],t.format===1023?j?N&&l.texSubImage3D(o.TEXTURE_2D_ARRAY,e,0,0,0,S.width,S.height,_.depth,y,b,S.data):l.texImage3D(o.TEXTURE_2D_ARRAY,e,x,S.width,S.height,_.depth,0,y,b,S.data):y===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):j?N&&l.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,e,0,0,0,S.width,S.height,_.depth,y,S.data,0,0):l.compressedTexImage3D(o.TEXTURE_2D_ARRAY,e,x,S.width,S.height,_.depth,0,S.data,0,0)}else{j&&M&&l.texStorage2D(o.TEXTURE_2D,P,x,T[0].width,T[0].height);for(let e=0,n=T.length;e<n;e++)S=T[e],t.format===1023?j?N&&l.texSubImage2D(o.TEXTURE_2D,e,0,0,S.width,S.height,y,b,S.data):l.texImage2D(o.TEXTURE_2D,e,x,S.width,S.height,0,y,b,S.data):y===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):j?N&&l.compressedTexSubImage2D(o.TEXTURE_2D,e,0,0,S.width,S.height,y,S.data):l.compressedTexImage2D(o.TEXTURE_2D,e,x,S.width,S.height,0,S.data)}}else if(t.isDataArrayTexture)j?(M&&l.texStorage3D(o.TEXTURE_2D_ARRAY,P,x,_.width,_.height,_.depth),N&&l.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,_.width,_.height,_.depth,y,b,_.data)):l.texImage3D(o.TEXTURE_2D_ARRAY,0,x,_.width,_.height,_.depth,0,y,b,_.data);else if(t.isData3DTexture)j?(M&&l.texStorage3D(o.TEXTURE_3D,P,x,_.width,_.height,_.depth),N&&l.texSubImage3D(o.TEXTURE_3D,0,0,0,0,_.width,_.height,_.depth,y,b,_.data)):l.texImage3D(o.TEXTURE_3D,0,x,_.width,_.height,_.depth,0,y,b,_.data);else if(t.isFramebufferTexture){if(M){if(j)l.texStorage2D(o.TEXTURE_2D,P,x,_.width,_.height);else{let e=_.width,t=_.height;for(let n=0;n<P;n++)l.texImage2D(o.TEXTURE_2D,n,x,e,t,0,y,b,null),e>>=1,t>>=1}}}else if(T.length>0&&v){j&&M&&l.texStorage2D(o.TEXTURE_2D,P,x,T[0].width,T[0].height);for(let e=0,t=T.length;e<t;e++)S=T[e],j?N&&l.texSubImage2D(o.TEXTURE_2D,e,0,0,y,b,S):l.texImage2D(o.TEXTURE_2D,e,x,y,b,S);t.generateMipmaps=!1}else j?(M&&l.texStorage2D(o.TEXTURE_2D,P,x,_.width,_.height),N&&l.texSubImage2D(o.TEXTURE_2D,0,0,0,y,b,_)):l.texImage2D(o.TEXTURE_2D,0,x,y,b,_);D(t,v)&&O(r),c.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function B(e,t,n){if(t.image.length!==6)return;let r=pe(e,t),i=t.source;l.bindTexture(o.TEXTURE_CUBE_MAP,e.__webglTexture,o.TEXTURE0+n);let a=d.get(i);if(i.version!==a.__version||r===!0){l.activeTexture(o.TEXTURE0+n);let e=z.getPrimaries(z.workingColorSpace),s=t.colorSpace===``?null:z.getPrimaries(t.colorSpace),c=t.colorSpace===``||e===s?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,t.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,t.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let u=t.isCompressedTexture||t.image[0].isCompressedTexture,d=t.image[0]&&t.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!u&&!d?m[e]=C(t.image[e],!1,!0,f.maxCubemapSize):m[e]=d?t.image[e].image:t.image[e],m[e]=we(t,m[e]);let g=m[0],_=w(g)||h,v=p.convert(t.format,t.colorSpace),y=p.convert(t.type),b=k(t.internalFormat,v,y,t.colorSpace),x=h&&t.isVideoTexture!==!0,S=a.__version===void 0||r===!0,T=i.dataReady,E=A(t,g,_);fe(o.TEXTURE_CUBE_MAP,t,_);let j;if(u){x&&S&&l.texStorage2D(o.TEXTURE_CUBE_MAP,E,b,g.width,g.height);for(let e=0;e<6;e++){j=m[e].mipmaps;for(let n=0;n<j.length;n++){let r=j[n];t.format===1023?x?T&&l.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,v,y,r.data):l.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,b,r.width,r.height,0,v,y,r.data):v===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):x?T&&l.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,v,r.data):l.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,b,r.width,r.height,0,r.data)}}}else{j=t.mipmaps,x&&S&&(j.length>0&&E++,l.texStorage2D(o.TEXTURE_CUBE_MAP,E,b,m[0].width,m[0].height));for(let e=0;e<6;e++)if(d){x?T&&l.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,m[e].width,m[e].height,v,y,m[e].data):l.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,b,m[e].width,m[e].height,0,v,y,m[e].data);for(let t=0;t<j.length;t++){let n=j[t].image[e].image;x?T&&l.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,v,y,n.data):l.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,b,n.width,n.height,0,v,y,n.data)}}else{x?T&&l.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,v,y,m[e]):l.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,b,v,y,m[e]);for(let t=0;t<j.length;t++){let n=j[t];x?T&&l.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,v,y,n.image[e]):l.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,b,v,y,n.image[e])}}}D(t,_)&&O(o.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function he(e,t,n,r,i,a){let s=p.convert(n.format,n.colorSpace),c=p.convert(n.type),u=k(n.internalFormat,s,c,n.colorSpace);if(!d.get(t).__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===o.TEXTURE_3D||i===o.TEXTURE_2D_ARRAY?l.texImage3D(i,a,u,e,n,t.depth,0,s,c,null):l.texImage2D(i,a,u,e,n,0,s,c,null)}l.bindFramebuffer(o.FRAMEBUFFER,e),Se(t)?g.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,r,i,d.get(n).__webglTexture,0,xe(t)):(i===o.TEXTURE_2D||i>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,r,i,d.get(n).__webglTexture,a),l.bindFramebuffer(o.FRAMEBUFFER,null)}function V(e,t,n){if(o.bindRenderbuffer(o.RENDERBUFFER,e),t.depthBuffer&&!t.stencilBuffer){let r=h===!0?o.DEPTH_COMPONENT24:o.DEPTH_COMPONENT16;if(n||Se(t)){let e=t.depthTexture;e&&e.isDepthTexture&&(e.type===1015?r=o.DEPTH_COMPONENT32F:e.type===1014&&(r=o.DEPTH_COMPONENT24));let n=xe(t);Se(t)?g.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,n,r,t.width,t.height):o.renderbufferStorageMultisample(o.RENDERBUFFER,n,r,t.width,t.height)}else o.renderbufferStorage(o.RENDERBUFFER,r,t.width,t.height);o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,e)}else if(t.depthBuffer&&t.stencilBuffer){let r=xe(t);n&&Se(t)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,r,o.DEPTH24_STENCIL8,t.width,t.height):Se(t)?g.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,r,o.DEPTH24_STENCIL8,t.width,t.height):o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_STENCIL,t.width,t.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.RENDERBUFFER,e)}else{let e=t.isWebGLMultipleRenderTargets===!0?t.texture:[t.texture];for(let r=0;r<e.length;r++){let i=e[r],a=p.convert(i.format,i.colorSpace),s=p.convert(i.type),c=k(i.internalFormat,a,s,i.colorSpace),l=xe(t);n&&Se(t)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,l,c,t.width,t.height):Se(t)?g.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,l,c,t.width,t.height):o.renderbufferStorage(o.RENDERBUFFER,c,t.width,t.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function H(e,t){if(t&&t.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(l.bindFramebuffer(o.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);d.get(t.depthTexture).__webglTexture&&t.depthTexture.image.width===t.width&&t.depthTexture.image.height===t.height||(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),R(t.depthTexture,0);let n=d.get(t.depthTexture).__webglTexture,r=xe(t);if(t.depthTexture.format===1026)Se(t)?g.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,n,0,r):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,n,0);else if(t.depthTexture.format===1027)Se(t)?g.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,n,0,r):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,n,0);else throw Error(`Unknown depthTexture format`)}function _e(e){let t=d.get(e),n=e.isWebGLCubeRenderTarget===!0;if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)throw Error(`target.depthTexture not supported in Cube render targets`);H(t.__webglFramebuffer,e)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)l.bindFramebuffer(o.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]=o.createRenderbuffer(),V(t.__webglDepthbuffer[n],e,!1)}else l.bindFramebuffer(o.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer=o.createRenderbuffer(),V(t.__webglDepthbuffer,e,!1);l.bindFramebuffer(o.FRAMEBUFFER,null)}function U(e,t,n){let r=d.get(e);t!==void 0&&he(r.__webglFramebuffer,e,e.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),n!==void 0&&_e(e)}function ve(e){let t=e.texture,n=d.get(e),r=d.get(t);e.addEventListener(`dispose`,N),e.isWebGLMultipleRenderTargets!==!0&&(r.__webglTexture===void 0&&(r.__webglTexture=o.createTexture()),r.__version=t.version,m.memory.textures++);let i=e.isWebGLCubeRenderTarget===!0,a=e.isWebGLMultipleRenderTargets===!0,s=w(e)||h;if(i){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(h&&t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=o.createFramebuffer()}else n.__webglFramebuffer[e]=o.createFramebuffer()}else{if(h&&t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=o.createFramebuffer()}else n.__webglFramebuffer=o.createFramebuffer();if(a){if(f.drawBuffers){let t=e.texture;for(let e=0,n=t.length;e<n;e++){let n=d.get(t[e]);n.__webglTexture===void 0&&(n.__webglTexture=o.createTexture(),m.memory.textures++)}}else console.warn(`THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.`)}if(h&&e.samples>0&&Se(e)===!1){let r=a?t:[t];n.__webglMultisampledFramebuffer=o.createFramebuffer(),n.__webglColorRenderbuffer=[],l.bindFramebuffer(o.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<r.length;t++){let i=r[t];n.__webglColorRenderbuffer[t]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=p.convert(i.format,i.colorSpace),s=p.convert(i.type),c=k(i.internalFormat,a,s,i.colorSpace,e.isXRRenderTarget===!0),l=xe(e);o.renderbufferStorageMultisample(o.RENDERBUFFER,l,c,e.width,e.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+t,o.RENDERBUFFER,n.__webglColorRenderbuffer[t])}o.bindRenderbuffer(o.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=o.createRenderbuffer(),V(n.__webglDepthRenderbuffer,e,!0)),l.bindFramebuffer(o.FRAMEBUFFER,null)}}if(i){l.bindTexture(o.TEXTURE_CUBE_MAP,r.__webglTexture),fe(o.TEXTURE_CUBE_MAP,t,s);for(let r=0;r<6;r++)if(h&&t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)he(n.__webglFramebuffer[r][i],e,t,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else he(n.__webglFramebuffer[r],e,t,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t,s)&&O(o.TEXTURE_CUBE_MAP),l.unbindTexture()}else if(a){let t=e.texture;for(let r=0,i=t.length;r<i;r++){let i=t[r],a=d.get(i);l.bindTexture(o.TEXTURE_2D,a.__webglTexture),fe(o.TEXTURE_2D,i,s),he(n.__webglFramebuffer,e,i,o.COLOR_ATTACHMENT0+r,o.TEXTURE_2D,0),D(i,s)&&O(o.TEXTURE_2D)}l.unbindTexture()}else{let i=o.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(h?i=e.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY:console.error(`THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.`)),l.bindTexture(i,r.__webglTexture),fe(i,t,s),h&&t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)he(n.__webglFramebuffer[r],e,t,o.COLOR_ATTACHMENT0,i,r);else he(n.__webglFramebuffer,e,t,o.COLOR_ATTACHMENT0,i,0);D(t,s)&&O(i),l.unbindTexture()}e.depthBuffer&&_e(e)}function ye(e){let t=w(e)||h,n=e.isWebGLMultipleRenderTargets===!0?e.texture:[e.texture];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(D(i,t)){let t=e.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:o.TEXTURE_2D,n=d.get(i).__webglTexture;l.bindTexture(t,n),O(t),l.unbindTexture()}}}function be(e){if(h&&e.samples>0&&Se(e)===!1){let t=e.isWebGLMultipleRenderTargets?e.texture:[e.texture],n=e.width,r=e.height,i=o.COLOR_BUFFER_BIT,a=[],s=e.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,c=d.get(e),u=e.isWebGLMultipleRenderTargets===!0;if(u)for(let e=0;e<t.length;e++)l.bindFramebuffer(o.FRAMEBUFFER,c.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.RENDERBUFFER,null),l.bindFramebuffer(o.FRAMEBUFFER,c.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.TEXTURE_2D,null,0);l.bindFramebuffer(o.READ_FRAMEBUFFER,c.__webglMultisampledFramebuffer),l.bindFramebuffer(o.DRAW_FRAMEBUFFER,c.__webglFramebuffer);for(let l=0;l<t.length;l++){a.push(o.COLOR_ATTACHMENT0+l),e.depthBuffer&&a.push(s);let f=c.__ignoreDepthValues!==void 0&&c.__ignoreDepthValues;if(f===!1&&(e.depthBuffer&&(i|=o.DEPTH_BUFFER_BIT),e.stencilBuffer&&(i|=o.STENCIL_BUFFER_BIT)),u&&o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,c.__webglColorRenderbuffer[l]),f===!0&&(o.invalidateFramebuffer(o.READ_FRAMEBUFFER,[s]),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[s])),u){let e=d.get(t[l]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0)}o.blitFramebuffer(0,0,n,r,0,0,n,r,i,o.NEAREST),_&&o.invalidateFramebuffer(o.READ_FRAMEBUFFER,a)}if(l.bindFramebuffer(o.READ_FRAMEBUFFER,null),l.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),u)for(let e=0;e<t.length;e++){l.bindFramebuffer(o.FRAMEBUFFER,c.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.RENDERBUFFER,c.__webglColorRenderbuffer[e]);let n=d.get(t[e]).__webglTexture;l.bindFramebuffer(o.FRAMEBUFFER,c.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+e,o.TEXTURE_2D,n,0)}l.bindFramebuffer(o.DRAW_FRAMEBUFFER,c.__webglMultisampledFramebuffer)}}function xe(e){return Math.min(f.maxSamples,e.samples)}function Se(e){let t=d.get(e);return h&&e.samples>0&&c.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Ce(e){let t=m.render.frame;v.get(e)!==t&&(v.set(e,t),e.update())}function we(e,t){let n=e.colorSpace,r=e.format,a=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||e.format===1035||n!==`srgb-linear`&&n!==``&&(z.getTransfer(n)===`srgb`?h===!1?c.has(`EXT_sRGB`)===!0&&r===1023?(e.format=1035,e.minFilter=i,e.generateMipmaps=!1):t=ge.sRGBToLinear(t):(r!==1023||a!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}this.allocateTextureUnit=ie,this.resetTextureUnits=re,this.setTexture2D=R,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=ce,this.rebindTextures=U,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Se}function za(e,t,n){let r=n.isWebGL2;function i(n,i=``){let a,o=z.getTransfer(i);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return r?e.HALF_FLOAT:(a=t.get(`OES_texture_half_float`),a===null?null:a.HALF_FLOAT_OES);if(n===1021)return e.ALPHA;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1035)return a=t.get(`EXT_sRGB`),a===null?null:a.SRGB_ALPHA_EXT;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(o===`srgb`){if(a=t.get(`WEBGL_compressed_texture_s3tc_srgb`),a!==null){if(n===33776)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(a=t.get(`WEBGL_compressed_texture_s3tc`),a!==null){if(n===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(a=t.get(`WEBGL_compressed_texture_pvrtc`),a!==null){if(n===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196)return a=t.get(`WEBGL_compressed_texture_etc1`),a===null?null:a.COMPRESSED_RGB_ETC1_WEBGL;if(n===37492||n===37496){if(a=t.get(`WEBGL_compressed_texture_etc`),a!==null){if(n===37492)return o===`srgb`?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===37496)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(a=t.get(`WEBGL_compressed_texture_astc`),a!==null){if(n===37808)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(a=t.get(`EXT_texture_compression_bptc`),a!==null){if(n===36492)return o===`srgb`?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(a=t.get(`EXT_texture_compression_rgtc`),a!==null){if(n===36492)return a.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?r?e.UNSIGNED_INT_24_8:(a=t.get(`WEBGL_depth_texture`),a===null?null:a.UNSIGNED_INT_24_8_WEBGL):e[n]===void 0?null:e[n]}return{convert:i}}var Ba=class extends Vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Va=class extends Et{constructor(){super(),this.isGroup=!0,this.type=`Group`}};let Ha={type:`move`};var Ua=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Va,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Va,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Va,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ha)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Va;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wa=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new ye,i=e.properties.get(r);i.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){let e=t.cameras[0].viewport,n=new In({extensions:{fragDepth:!0},vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tn(new er(20,20),n)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}},Ga=class extends A{constructor(e,t){super();let n=this,r=null,i=1,a=null,c=`local-floor`,l=1,p=null,m=null,h=null,g=null,_=null,v=null,y=new Wa,b=t.getContextAttributes(),x=null,S=null,C=[],w=[],T=new L,E=null,D=new Vn;D.layers.enable(1),D.viewport=new be;let O=new Vn;O.layers.enable(2),O.viewport=new be;let k=[D,O],A=new Ba;A.layers.enable(1),A.layers.enable(2);let j=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Ua,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Ua,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Ua,C[e]=t),t.getHandSpace()};function P(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,p||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function F(){r.removeEventListener(`select`,P),r.removeEventListener(`selectstart`,P),r.removeEventListener(`selectend`,P),r.removeEventListener(`squeeze`,P),r.removeEventListener(`squeezestart`,P),r.removeEventListener(`squeezeend`,P),r.removeEventListener(`end`,F),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}j=null,M=null,y.reset(),e.setRenderTarget(x),_=null,g=null,h=null,r=null,S=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){c=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return p||a},this.setReferenceSpace=function(e){p=e},this.getBaseLayer=function(){return g===null?_:g},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(m){if(r=m,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,P),r.addEventListener(`selectstart`,P),r.addEventListener(`selectend`,P),r.addEventListener(`squeeze`,P),r.addEventListener(`squeezestart`,P),r.addEventListener(`squeezeend`,P),r.addEventListener(`end`,F),r.addEventListener(`inputsourceschange`,ee),b.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let n={antialias:r.renderState.layers!==void 0||b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};_=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),S=new Se(_.framebufferWidth,_.framebufferHeight,{format:d,type:o,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let n=null,a=null,c=null;b.depth&&(c=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?1027:f,a=b.stencil?u:s);let l={colorFormat:t.RGBA8,depthFormat:c,scaleFactor:i};h=new XRWebGLBinding(r,t),g=h.createProjectionLayer(l),r.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),S=new Se(g.textureWidth,g.textureHeight,{format:d,type:o,depthTexture:new Ir(g.textureWidth,g.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});let p=e.properties.get(S);p.__ignoreDepthValues=g.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(l),p=null,a=await r.requestReferenceSpace(c),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let I=new W,te=new W;function ne(e,t,n){I.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=I.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert();let g=o+m,_=s+m,v=f-h,y=p+(r-h),b=c*s/_*g,x=l*s/_*g;e.projectionMatrix.makePerspective(v,y,b,x,g,_),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;y.texture!==null&&(e.near=y.depthNear,e.far=y.depthFar),A.near=O.near=D.near=e.near,A.far=O.far=D.far=e.far,(j!==A.near||M!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),j=A.near,M=A.far,D.near=j,D.far=M,O.near=j,O.far=M,D.updateProjectionMatrix(),O.updateProjectionMatrix(),e.updateProjectionMatrix());let t=e.parent,n=A.cameras;re(A,t);for(let e=0;e<n.length;e++)re(n[e],t);n.length===2?ne(A,D,O):A.projectionMatrix.copy(D.projectionMatrix),ie(e,A,t)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=N*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(g!==null||_!==null)return l},this.setFoveation=function(e){l=e,g!==null&&(g.fixedFoveation=e),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=e)},this.hasDepthSensing=function(){return y.texture!==null};let R=null;function ae(t,i){if(m=i.getViewerPose(p||a),v=i,m!==null){let t=m.views;_!==null&&(e.setRenderTargetFramebuffer(S,_.framebuffer),e.setRenderTarget(S));let n=!1;t.length!==A.cameras.length&&(A.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(_!==null)a=_.getViewport(i);else{let t=h.getViewSubImage(g,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(S,t.colorTexture,g.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(S))}let o=k[r];o===void 0&&(o=new Vn,o.layers.enable(r),o.viewport=new be,k[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),n===!0&&A.cameras.push(o)}let i=r.enabledFeatures;if(i&&i.includes(`depth-sensing`)){let n=h.getDepthInformation(t[0]);n&&n.isValid&&n.texture&&y.init(e,n,r.renderState)}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,p||a)}y.render(e,A),R&&R(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),v=null}let oe=new Qn;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){R=e},this.dispose=function(){}}};function Ka(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Mn(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(r,i){r.opacity.value=i.opacity,i.color&&r.diffuse.value.copy(i.color),i.emissive&&r.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),i.map&&(r.map.value=i.map,n(i.map,r.mapTransform)),i.alphaMap&&(r.alphaMap.value=i.alphaMap,n(i.alphaMap,r.alphaMapTransform)),i.bumpMap&&(r.bumpMap.value=i.bumpMap,n(i.bumpMap,r.bumpMapTransform),r.bumpScale.value=i.bumpScale,i.side===1&&(r.bumpScale.value*=-1)),i.normalMap&&(r.normalMap.value=i.normalMap,n(i.normalMap,r.normalMapTransform),r.normalScale.value.copy(i.normalScale),i.side===1&&r.normalScale.value.negate()),i.displacementMap&&(r.displacementMap.value=i.displacementMap,n(i.displacementMap,r.displacementMapTransform),r.displacementScale.value=i.displacementScale,r.displacementBias.value=i.displacementBias),i.emissiveMap&&(r.emissiveMap.value=i.emissiveMap,n(i.emissiveMap,r.emissiveMapTransform)),i.specularMap&&(r.specularMap.value=i.specularMap,n(i.specularMap,r.specularMapTransform)),i.alphaTest>0&&(r.alphaTest.value=i.alphaTest);let a=t.get(i).envMap;if(a&&(r.envMap.value=a,r.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=i.reflectivity,r.ior.value=i.ior,r.refractionRatio.value=i.refractionRatio),i.lightMap){r.lightMap.value=i.lightMap;let t=e._useLegacyLights===!0?Math.PI:1;r.lightMapIntensity.value=i.lightMapIntensity*t,n(i.lightMap,r.lightMapTransform)}i.aoMap&&(r.aoMap.value=i.aoMap,r.aoMapIntensity.value=i.aoMapIntensity,n(i.aoMap,r.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,r){e.metalness.value=r.metalness,r.metalnessMap&&(e.metalnessMap.value=r.metalnessMap,n(r.metalnessMap,e.metalnessMapTransform)),e.roughness.value=r.roughness,r.roughnessMap&&(e.roughnessMap.value=r.roughnessMap,n(r.roughnessMap,e.roughnessMapTransform)),t.get(r).envMap&&(e.envMapIntensity.value=r.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function qa(e,t,n,r){let i={},a={},o=[],s=n.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16;o!==0&&16-o<a.boundary&&(n+=16-o),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Ja=class{constructor(e={}){let{canvas:t=ce(),context:n=null,depth:r=!0,stencil:i=!0,alpha:s=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f=`default`,failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;m=n===null?s:n.getContextAttributes().alpha;let h=/* @__PURE__ */ new Uint32Array(4),g=/* @__PURE__ */ new Int32Array(4),_=null,v=null,y=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=x,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let C=this,w=!1,T=0,E=0,D=null,O=-1,k=null,A=new be,j=new be,M=null,N=new Ht(0),P=0,F=t.width,ee=t.height,I=1,te=null,re=null,ie=new be(0,0,F,ee),R=new be(0,0,F,ee),ae=!1,oe=new Zn,se=!1,le=!1,ue=null,de=new tt,fe=new L,pe=new W,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function z(){return D===null?I:1}let B=n;function he(e,n){for(let r=0;r<e.length;r++){let i=e[r],a=t.getContext(i,n);if(a!==null)return a}return null}try{let e={alpha:!0,depth:r,stencil:i,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r161`),t.addEventListener(`webglcontextlost`,Ve,!1),t.addEventListener(`webglcontextrestored`,He,!1),t.addEventListener(`webglcontextcreationerror`,Ue,!1),B===null){let t=[`webgl2`,`webgl`,`experimental-webgl`];if(C.isWebGL1Renderer===!0&&t.shift(),B=he(t,e),B===null)throw he(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}typeof WebGLRenderingContext<`u`&&B instanceof WebGLRenderingContext&&console.warn(`THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.`),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let V,ge,H,_e,U,ve,ye,xe,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re;function ze(){V=new Or(B),ge=new or(B,V,e),V.init(ge),Ie=new za(B,V,ge),H=new La(B,V,ge),_e=new jr(B),U=new Sa,ve=new Ra(B,V,H,U,ge,Ie,_e),ye=new cr(C),xe=new Dr(C),Ce=new $n(B,ge),Le=new ir(B,V,Ce,ge),we=new kr(B,Ce,_e,Le),Te=new Fr(B,we,Ce,_e),Ne=new Pr(B,ge,ve),Ae=new sr(U),Ee=new xa(C,ye,xe,V,ge,Le,Ae),De=new Ka(C,U),Oe=new Ea,ke=new Na(V,ge),Me=new rr(C,ye,xe,H,Te,m,u),je=new Ia(C,Te,ge),Re=new qa(B,_e,ge,H),Pe=new ar(B,V,_e,ge),Fe=new Ar(B,V,_e,ge),_e.programs=Ee.programs,C.capabilities=ge,C.extensions=V,C.properties=U,C.renderLists=Oe,C.shadowMap=je,C.state=H,C.info=_e}ze();let Be=new Ga(C,B);this.xr=Be,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=V.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=V.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(e){e!==void 0&&(I=e,this.setSize(F,ee,!1))},this.getSize=function(e){return e.set(F,ee)},this.setSize=function(e,n,r=!0){Be.isPresenting?console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`):(F=e,ee=n,t.width=Math.floor(e*I),t.height=Math.floor(n*I),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(F*I,ee*I).floor()},this.setDrawingBufferSize=function(e,n,r){F=e,ee=n,I=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(A)},this.getViewport=function(e){return e.copy(ie)},this.setViewport=function(e,t,n,r){e.isVector4?ie.set(e.x,e.y,e.z,e.w):ie.set(e,t,n,r),H.viewport(A.copy(ie).multiplyScalar(I).floor())},this.getScissor=function(e){return e.copy(R)},this.setScissor=function(e,t,n,r){e.isVector4?R.set(e.x,e.y,e.z,e.w):R.set(e,t,n,r),H.scissor(j.copy(R).multiplyScalar(I).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(e){H.setScissorTest(ae=e)},this.setOpaqueSort=function(e){te=e},this.setTransparentSort=function(e){re=e},this.getClearColor=function(e){return e.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor.apply(Me,arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha.apply(Me,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(D!==null){let t=D.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=D.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=Me.getClearColor(),r=Me.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,B.clearBufferuiv(B.COLOR,0,h)):(g[0]=i,g[1]=a,g[2]=o,g[3]=r,B.clearBufferiv(B.COLOR,0,g))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ve,!1),t.removeEventListener(`webglcontextrestored`,He,!1),t.removeEventListener(`webglcontextcreationerror`,Ue,!1),Oe.dispose(),ke.dispose(),U.dispose(),ye.dispose(),xe.dispose(),Te.dispose(),Le.dispose(),Re.dispose(),Ee.dispose(),Be.dispose(),Be.removeEventListener(`sessionstart`,Xe),Be.removeEventListener(`sessionend`,Ze),ue&&=(ue.dispose(),null),Qe.stop()};function Ve(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),w=!0}function He(){console.log(`THREE.WebGLRenderer: Context Restored.`),w=!1;let e=_e.autoReset,t=je.enabled,n=je.autoUpdate,r=je.needsUpdate,i=je.type;ze(),_e.autoReset=e,je.enabled=t,je.autoUpdate=n,je.needsUpdate=r,je.type=i}function Ue(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function We(e){let t=e.target;t.removeEventListener(`dispose`,We),Ge(t)}function Ge(e){Ke(e),U.remove(e)}function Ke(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){Ee.releaseProgram(e)}),e.isShaderMaterial&&Ee.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=me);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ct(e,t,n,r,i);H.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=we.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Le.setup(i,r,s,n,c);let h,g=Pe;if(c!==null&&(h=Ce.get(c),g=Fe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(H.setLineWidth(r.wireframeLinewidth*z()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),H.setLineWidth(e*z()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh)g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function qe(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,at(e,t,n),e.side=0,e.needsUpdate=!0,at(e,t,n),e.side=2):at(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),v=ke.get(n),v.init(),b.push(v),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(v.pushLight(e),e.castShadow&&v.pushShadow(e))}),v.setupLights(C._useLegacyLights);let r=/* @__PURE__ */ new Set;return e.traverse(function(e){let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];qe(a,n,e),r.add(a)}else qe(t,n,e),r.add(t)}}),b.pop(),v=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){U.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}V.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Je=null;function Ye(e){Je&&Je(e)}function Xe(){Qe.stop()}function Ze(){Qe.start()}let Qe=new Qn;Qe.setAnimationLoop(Ye),typeof self<`u`&&Qe.setContext(self),this.setAnimationLoop=function(e){Je=e,Be.setAnimationLoop(e),e===null?Qe.stop():Qe.start()},Be.addEventListener(`sessionstart`,Xe),Be.addEventListener(`sessionend`,Ze),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(w===!0)return;e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(t),t=Be.getCamera()),e.isScene===!0&&e.onBeforeRender(C,e,t,D),v=ke.get(e,b.length),v.init(),b.push(v),de.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),oe.setFromProjectionMatrix(de),le=this.localClippingEnabled,se=Ae.init(this.clippingPlanes,le),_=Oe.get(e,y.length),_.init(),y.push(_),$e(e,t,0,C.sortObjects),_.finish(),C.sortObjects===!0&&_.sort(te,re),this.info.render.frame++,se===!0&&Ae.beginShadows();let n=v.state.shadowsArray;if(je.render(n,e,t),se===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1)&&Me.render(_,e),v.setupLights(C._useLegacyLights),t.isArrayCamera){let n=t.cameras;for(let t=0,r=n.length;t<r;t++){let r=n[t];et(_,e,r,r.viewport)}}else et(_,e,t);D!==null&&(ve.updateMultisampleRenderTarget(D),ve.updateRenderTargetMipmap(D)),e.isScene===!0&&e.onAfterRender(C,e,t),Le.resetDefaultState(),O=-1,k=null,b.pop(),v=b.length>0?b[b.length-1]:null,y.pop(),_=y.length>0?y[y.length-1]:null};function $e(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)v.pushLight(e),e.castShadow&&v.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||oe.intersectsSprite(e)){r&&pe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(de);let t=Te.update(e),i=e.material;i.visible&&_.push(e,t,i,n,pe.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||oe.intersectsObject(e))){let t=Te.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),pe.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),pe.copy(e.boundingSphere.center)),pe.applyMatrix4(e.matrixWorld).applyMatrix4(de)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&_.push(e,t,s,n,pe.z,o)}}else i.visible&&_.push(e,t,i,n,pe.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)$e(i[e],t,n,r)}function et(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;v.setupLightsView(n),se===!0&&Ae.setGlobalState(C.clippingPlanes,n),a.length>0&&nt(i,a,t,n),r&&H.viewport(A.copy(r)),i.length>0&&rt(i,t,n),a.length>0&&rt(a,t,n),o.length>0&&rt(o,t,n),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function nt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;let i=ge.isWebGL2;ue===null&&(ue=new Se(1,1,{generateMipmaps:!0,type:V.has(`EXT_color_buffer_half_float`)?l:o,minFilter:a,samples:i?4:0})),C.getDrawingBufferSize(fe),i?ue.setSize(fe.x,fe.y):ue.setSize(ne(fe.x),ne(fe.y));let s=C.getRenderTarget();C.setRenderTarget(ue),C.getClearColor(N),P=C.getClearAlpha(),P<1&&C.setClearColor(16777215,.5),C.clear();let c=C.toneMapping;C.toneMapping=0,rt(e,n,r),ve.updateMultisampleRenderTarget(ue),ve.updateRenderTargetMipmap(ue);let u=!1;for(let e=0,i=t.length;e<i;e++){let i=t[e],a=i.object,o=i.geometry,s=i.material,c=i.group;if(s.side===2&&a.layers.test(r.layers)){let e=s.side;s.side=1,s.needsUpdate=!0,it(a,n,r,o,s,c),s.side=e,s.needsUpdate=!0,u=!0}}u===!0&&(ve.updateMultisampleRenderTarget(ue),ve.updateRenderTargetMipmap(ue)),C.setRenderTarget(s),C.setClearColor(N,P),C.toneMapping=c}function rt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&it(o,t,n,s,c,l)}}function it(e,t,n,r,i,a){e.onBeforeRender(C,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(C,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,C.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,C.renderBufferDirect(n,t,r,i,e,a),i.side=2):C.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(C,t,n,r,i,a)}function at(e,t,n){t.isScene!==!0&&(t=me);let r=U.get(e),i=v.state.lights,a=v.state.shadowsArray,o=i.state.version,s=Ee.getParameters(e,i.state,a,t,n),c=Ee.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?xe:ye).get(e.envMap||r.environment),l===void 0&&(e.addEventListener(`dispose`,We),l=/* @__PURE__ */ new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return st(e,s),u}else s.uniforms=Ee.getUniforms(e),e.onBuild(n,s,C),e.onBeforeCompile(s,C),u=Ee.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=Ae.uniform),st(e,s),r.needsLights=ut(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ui.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function st(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ct(e,t,n,r,i){t.isScene!==!0&&(t=me),ve.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=D===null?C.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:S,c=(r.isMeshStandardMaterial?xe:ye).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(m=C.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=U.get(r),y=v.state.lights;if(se===!0&&(le===!0||e!==k)){let t=e===k&&r.id===O;Ae.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==y.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==Ae.numPlanes||_.numIntersection!==Ae.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?ge.isWebGL2===!0&&_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=at(r,t,i));let w=!1,T=!1,E=!1,A=x.getUniforms(),j=_.uniforms;if(H.useProgram(x.program)&&(w=!0,T=!0,E=!0),r.id!==O&&(O=r.id,T=!0),w||k!==e){A.setValue(B,`projectionMatrix`,e.projectionMatrix),A.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(B,pe.setFromMatrixPosition(e.matrixWorld)),ge.logarithmicDepthBuffer&&A.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),k!==e&&(k=e,T=!0,E=!0)}if(i.isSkinnedMesh){A.setOptional(B,i,`bindMatrix`),A.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(ge.floatVertexTextures?(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(B,`boneTexture`,e.boneTexture,ve)):console.warn(`THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.`))}i.isBatchedMesh&&(A.setOptional(B,i,`batchingTexture`),A.setValue(B,`batchingTexture`,i._matricesTexture,ve));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0&&ge.isWebGL2===!0)&&Ne.update(i,n,x),(T||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,A.setValue(B,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(j.envMap.value=c,j.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),T&&(A.setValue(B,`toneMappingExposure`,C.toneMappingExposure),_.needsLights&&lt(j,E),a&&r.fog===!0&&De.refreshFogUniforms(j,a),De.refreshMaterialUniforms(j,r,I,ee,ue),Ui.upload(B,ot(_),j,ve)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ui.upload(B,ot(_),j,ve),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(B,`center`,i.center),A.setValue(B,`modelViewMatrix`,i.modelViewMatrix),A.setValue(B,`normalMatrix`,i.normalMatrix),A.setValue(B,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++)if(ge.isWebGL2){let n=e[t];Re.update(n,x),Re.bind(n,x)}else console.warn(`THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.`)}return x}function lt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ut(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(e,t,n){U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=n;let r=U.get(e);r.__hasExternalTextures=!0,r.__hasExternalTextures&&(r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||V.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){D=e,T=t,E=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=U.get(e);s.__useDefaultFramebuffer===void 0?s.__webglFramebuffer===void 0?ve.setupRenderTarget(e):s.__hasExternalTextures&&ve.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture):(H.bindFramebuffer(B.FRAMEBUFFER,null),r=!1);let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=ge.isWebGL2&&e.samples>0&&ve.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,A.copy(e.viewport),j.copy(e.scissor),M=e.scissorTest}else A.copy(ie).multiplyScalar(I).floor(),j.copy(R).multiplyScalar(I).floor(),M=ae;if(H.bindFramebuffer(B.FRAMEBUFFER,i)&&ge.drawBuffers&&r&&H.drawBuffers(e,i),H.viewport(A),H.scissor(j),H.setScissorTest(M),a){let r=U.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=U.get(e.texture),i=t||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}O=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){H.bindFramebuffer(B.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(s!==1023&&Ie.convert(s)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}let l=c===1016&&(V.has(`EXT_color_buffer_half_float`)||ge.isWebGL2&&V.has(`EXT_color_buffer_float`));if(c!==1009&&Ie.convert(c)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(c===1015&&(ge.isWebGL2||V.has(`OES_texture_float`)||V.has(`WEBGL_color_buffer_float`)))&&!l){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,Ie.convert(s),Ie.convert(c),a)}finally{let e=D===null?null:U.get(D).__webglFramebuffer;H.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.copyFramebufferToTexture=function(e,t,n=0){let r=2**-n,i=Math.floor(t.image.width*r),a=Math.floor(t.image.height*r);ve.setTexture2D(t,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,e.x,e.y,i,a),H.unbindTexture()},this.copyTextureToTexture=function(e,t,n,r=0){let i=t.image.width,a=t.image.height,o=Ie.convert(n.format),s=Ie.convert(n.type);ve.setTexture2D(n,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,n.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,n.unpackAlignment),t.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,r,e.x,e.y,i,a,o,s,t.image.data):t.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,r,e.x,e.y,t.mipmaps[0].width,t.mipmaps[0].height,o,t.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,r,e.x,e.y,o,s,t.image),r===0&&n.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n,r,i=0){if(C.isWebGL1Renderer){console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.`);return}let a=e.max.x-e.min.x+1,o=e.max.y-e.min.y+1,s=e.max.z-e.min.z+1,c=Ie.convert(r.format),l=Ie.convert(r.type),u;if(r.isData3DTexture)ve.setTexture3D(r,0),u=B.TEXTURE_3D;else if(r.isDataArrayTexture||r.isCompressedArrayTexture)ve.setTexture2DArray(r,0),u=B.TEXTURE_2D_ARRAY;else{console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.`);return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,r.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,r.unpackAlignment);let d=B.getParameter(B.UNPACK_ROW_LENGTH),f=B.getParameter(B.UNPACK_IMAGE_HEIGHT),p=B.getParameter(B.UNPACK_SKIP_PIXELS),m=B.getParameter(B.UNPACK_SKIP_ROWS),h=B.getParameter(B.UNPACK_SKIP_IMAGES),g=n.isCompressedTexture?n.mipmaps[i]:n.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,g.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,g.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,e.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,e.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,e.min.z),n.isDataTexture||n.isData3DTexture?B.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g.data):n.isCompressedArrayTexture?(console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.`),B.compressedTexSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,g.data)):B.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g),B.pixelStorei(B.UNPACK_ROW_LENGTH,d),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,f),B.pixelStorei(B.UNPACK_SKIP_PIXELS,p),B.pixelStorei(B.UNPACK_SKIP_ROWS,m),B.pixelStorei(B.UNPACK_SKIP_IMAGES,h),i===0&&r.generateMipmaps&&B.generateMipmap(u),H.unbindTexture()},this.initTexture=function(e){e.isCubeTexture?ve.setTextureCube(e,0):e.isData3DTexture?ve.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ve.setTexture2DArray(e,0):ve.setTexture2D(e,0),H.unbindTexture()},this.resetState=function(){T=0,E=0,D=null,H.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return k}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===`display-p3`?`display-p3`:`srgb`,t.unpackColorSpace=z.workingColorSpace===`display-p3-linear`?`display-p3`:`srgb`}get outputEncoding(){return console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace===`srgb`?b:y}set outputEncoding(e){console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace=e===3001?x:S}get useLegacyLights(){return console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights}set useLegacyLights(e){console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights=e}},Ya=class extends Ja{};Ya.prototype.isWebGL1Renderer=!0;var Xa=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200}getPoint(){return console.warn(`THREE.Curve: .getPoint() not implemented.`),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new L:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new W,r=[],i=[],a=[],o=new W,s=new tt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(F(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(F(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Za=class extends Xa{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t){let n=t||new L,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Qa=class extends Za{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function $a(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}let eo=/*@__PURE__*/ new W,to=/*@__PURE__*/ new $a,no=/*@__PURE__*/ new $a,ro=/*@__PURE__*/ new $a;var io=class extends Xa{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(eo.subVectors(r[0],r[1]).add(r[0]),c=eo);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(eo.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=eo),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),to.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),no.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ro.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(to.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),no.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ro.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(to.calc(s),no.calc(s),ro.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ao(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function oo(e,t){let n=1-e;return n*n*t}function so(e,t){return 2*(1-e)*e*t}function co(e,t){return e*e*t}function lo(e,t,n,r){return oo(e,t)+so(e,n)+co(e,r)}function uo(e,t){let n=1-e;return n*n*n*t}function fo(e,t){let n=1-e;return 3*n*n*e*t}function po(e,t){return 3*(1-e)*e*e*t}function mo(e,t){return e*e*e*t}function ho(e,t,n,r,i){return uo(e,t)+fo(e,n)+po(e,r)+mo(e,i)}var go=class extends Xa{constructor(e=new L,t=new L,n=new L,r=new L){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new L){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ho(e,r.x,i.x,a.x,o.x),ho(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_o=class extends Xa{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ho(e,r.x,i.x,a.x,o.x),ho(e,r.y,i.y,a.y,o.y),ho(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},vo=class extends Xa{constructor(e=new L,t=new L){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends Xa{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bo=class extends Xa{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(lo(e,r.x,i.x,a.x),lo(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends Xa{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(lo(e,r.x,i.x,a.x),lo(e,r.y,i.y,a.y),lo(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},So=class extends Xa{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new L){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ao(o,s.x,c.x,l.x,u.x),ao(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new L().fromArray(n))}return this}},Co=/*#__PURE__*/ Object.freeze({__proto__:null,ArcCurve:Qa,CatmullRomCurve3:io,CubicBezierCurve:go,CubicBezierCurve3:_o,EllipseCurve:Za,LineCurve:vo,LineCurve3:yo,QuadraticBezierCurve:bo,QuadraticBezierCurve3:xo,SplineCurve:So}),wo=class extends Xa{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Co[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Co[n.type]().fromJSON(n))}return this}},To=class extends wo{constructor(e){super(),this.type=`Path`,this.currentPoint=new L,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new vo(this.currentPoint.clone(),new L(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new bo(this.currentPoint.clone(),new L(e,t),new L(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new go(this.currentPoint.clone(),new L(e,t),new L(n,r),new L(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new So([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Za(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Eo=class extends To{constructor(e){super(e),this.uuid=P(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new To().fromJSON(n))}return this}};let Do={triangulate:function(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Oo(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l,u,d,f,p;if(r&&(a=Fo(e,t,a,n)),e.length>80*n){s=l=e[0],c=u=e[1];for(let t=n;t<i;t+=n)d=e[t],f=e[t+1],d<s&&(s=d),f<c&&(c=f),d>l&&(l=d),f>u&&(u=f);p=Math.max(l-s,u-c),p=p===0?0:32767/p}return Ao(a,o,n,s,c,p,0),o}};function Oo(e,t,n,r,i){let a,o;if(i===is(e,t,n,r)>0)for(a=t;a<n;a+=r)o=ts(a,e[a],e[a+1],o);else for(a=n-r;a>=t;a-=r)o=ts(a,e[a],e[a+1],o);return o&&qo(o,o.next)&&(ns(o),o=o.next),o}function ko(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(qo(n,n.next)||Ko(n.prev,n,n.next)===0)){if(ns(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ao(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Bo(e,r,i,a);let s=e,c,l;for(;e.prev!==e.next;)if(c=e.prev,l=e.next,a?Mo(e,r,i,a):jo(e))t.push(c.i/n|0),t.push(e.i/n|0),t.push(l.i/n|0),ns(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=No(ko(e),t,n),Ao(e,t,n,r,i,a,2)):o===2&&Po(e,t,n,r,i,a):Ao(ko(e),t,n,r,i,a,1);break}}function jo(e){let t=e.prev,n=e,r=e.next;if(Ko(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=i<a?i<o?i:o:a<o?a:o,d=s<c?s<l?s:l:c<l?c:l,f=i>a?i>o?i:o:a>o?a:o,p=s>c?s>l?s:l:c>l?c:l,m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Wo(i,s,a,c,o,l,m.x,m.y)&&Ko(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Mo(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ko(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=s<c?s<l?s:l:c<l?c:l,m=u<d?u<f?u:f:d<f?d:f,h=s>c?s>l?s:l:c>l?c:l,g=u>d?u>f?u:f:d>f?d:f,_=Ho(p,m,t,n,r),v=Ho(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Wo(s,u,c,d,l,f,y.x,y.y)&&Ko(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Wo(s,u,c,d,l,f,b.x,b.y)&&Ko(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Wo(s,u,c,d,l,f,y.x,y.y)&&Ko(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Wo(s,u,c,d,l,f,b.x,b.y)&&Ko(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function No(e,t,n){let r=e;do{let i=r.prev,a=r.next.next;!qo(i,a)&&Jo(i,r,r.next,a)&&Qo(i,a)&&Qo(a,i)&&(t.push(i.i/n|0),t.push(r.i/n|0),t.push(a.i/n|0),ns(r),ns(r.next),r=e=a),r=r.next}while(r!==e);return ko(r)}function Po(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Go(o,e)){let s=es(o,e);o=ko(o,o.next),s=ko(s,s.next),Ao(o,t,n,r,i,a,0),Ao(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Fo(e,t,n,r){let i=[],a,o,s,c,l;for(a=0,o=t.length;a<o;a++)s=t[a]*r,c=a<o-1?t[a+1]*r:e.length,l=Oo(e,s,c,r,!1),l===l.next&&(l.steiner=!0),i.push(Uo(l));for(i.sort(Io),a=0;a<i.length;a++)n=Lo(i[a],n);return n}function Io(e,t){return e.x-t.x}function Lo(e,t){let n=Ro(e,t);if(!n)return t;let r=es(n,e);return ko(r,r.next),ko(n,n.next)}function Ro(e,t){let n=t,r=-1/0,i,a=e.x,o=e.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let e=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=a&&e>r&&(r=e,i=n.x<n.next.x?n:n.next,e===a))return i}n=n.next}while(n!==t);if(!i)return null;let s=i,c=i.x,l=i.y,u=1/0,d;n=i;do a>=n.x&&n.x>=c&&a!==n.x&&Wo(o<l?a:r,o,c,l,o<l?r:a,o,n.x,n.y)&&(d=Math.abs(o-n.y)/(a-n.x),Qo(n,e)&&(d<u||d===u&&(n.x>i.x||n.x===i.x&&zo(i,n)))&&(i=n,u=d)),n=n.next;while(n!==s);return i}function zo(e,t){return Ko(e.prev,e,t.prev)<0&&Ko(t.next,e,e.next)<0}function Bo(e,t,n,r){let i=e;do i.z===0&&(i.z=Ho(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Vo(i)}function Vo(e){let t,n,r,i,a,o,s,c,l=1;do{for(n=e,e=null,a=null,o=0;n;){for(o++,r=n,s=0,t=0;t<l&&(s++,r=r.nextZ,r);t++);for(c=l;s>0||c>0&&r;)s!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;n=r}a.nextZ=null,l*=2}while(o>1);return e}function Ho(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Uo(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Wo(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Go(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Zo(e,t)&&(Qo(e,t)&&Qo(t,e)&&$o(e,t)&&(Ko(e.prev,e,t.prev)||Ko(e,t.prev,t))||qo(e,t)&&Ko(e.prev,e,e.next)>0&&Ko(t.prev,t,t.next)>0)}function Ko(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function qo(e,t){return e.x===t.x&&e.y===t.y}function Jo(e,t,n,r){let i=Xo(Ko(e,t,n)),a=Xo(Ko(e,t,r)),o=Xo(Ko(n,r,e)),s=Xo(Ko(n,r,t));return!!(i!==a&&o!==s||i===0&&Yo(e,n,t)||a===0&&Yo(e,r,t)||o===0&&Yo(n,e,r)||s===0&&Yo(n,t,r))}function Yo(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Xo(e){return e>0?1:e<0?-1:0}function Zo(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Jo(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Qo(e,t){return Ko(e.prev,e,e.next)<0?Ko(e,t,e.next)>=0&&Ko(e,e.prev,t)>=0:Ko(e,t,e.prev)<0||Ko(e,e.next,t)<0}function $o(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function es(e,t){let n=new rs(e.i,e.x,e.y),r=new rs(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function ts(e,t,n,r){let i=new rs(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function ns(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function rs(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function is(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var as=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];os(e),ss(n,e);let a=e.length;t.forEach(os);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,ss(n,t[e]);let o=Do.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function os(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function ss(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var cs=class e extends sn{constructor(e=new Eo([new L(.5,.5),new L(-.5,.5),new L(-.5,-.5),new L(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Qt(r,3)),this.setAttribute(`uv`,new Qt(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?ls:t.UVGenerator,g,_=!1,v,y,b,x;m&&(g=m.getSpacedPoints(s),_=!0,l=!1,v=m.computeFrenetFrames(s,!1),y=new W,b=new W,x=new W),l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!as.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];as.isClockWise(t)&&(w[e]=t.reverse())}}let T=as.triangulateShape(C,w),E=C;for(let e=0,t=w.length;e<t;e++){let t=w[e];C=C.concat(t)}function D(e,t,n){return t||console.error(`THREE.ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let O=C.length,k=T.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new L(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new L(r/a,i/a)}let j=[];for(let e=0,t=E.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(E[e],E[n],E[r]);let M=[],N,P=j.concat();for(let e=0,t=w.length;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}for(let e=0;e<p;e++){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=E.length;e<t;e++){let t=D(E[e],j[e],r);ne(t.x,t.y,-n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=D(t[e],N[e],r);ne(i.x,i.y,-n)}}}let F=d+f;for(let e=0;e<O;e++){let t=l?D(C[e],P[e],F):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ne(x.x,x.y,x.z)):ne(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<O;t++){let n=l?D(C[t],P[t],F):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ne(x.x,x.y,x.z)):ne(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=E.length;e<t;e++){let t=D(E[e],j[e],r);ne(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=D(t[e],N[e],r);_?ne(i.x,i.y+g[s-1].y,g[s-1].x+n):ne(i.x,i.y,c+n)}}}ee(),I();function ee(){let e=r.length/3;if(l){let e=0,t=O*e;for(let e=0;e<k;e++){let n=T[e];re(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=O*e;for(let e=0;e<k;e++){let n=T[e];re(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<k;e++){let t=T[e];re(t[2],t[1],t[0])}for(let e=0;e<k;e++){let t=T[e];re(t[0]+O*s,t[1]+O*s,t[2]+O*s)}}n.addGroup(e,r.length/3-e,0)}function I(){let e=r.length/3,t=0;te(E,t),t+=E.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];te(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function te(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=O*e,a=O*(e+1);ie(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ne(e,t,n){a.push(e),a.push(t),a.push(n)}function re(e,t,i){R(e),R(t),R(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ae(o[0]),ae(o[1]),ae(o[2])}function ie(e,t,i,a){R(e),R(t),R(a),R(t),R(i),R(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ae(s[0]),ae(s[1]),ae(s[3]),ae(s[1]),ae(s[2]),ae(s[3])}function R(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ae(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return us(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Co[i.type]().fromJSON(i)),new e(r,t.options)}};let ls={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new L(a,o),new L(s,c),new L(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new L(o,1-c),new L(l,1-d),new L(f,1-m),new L(h,1-_)]:[new L(s,1-c),new L(u,1-d),new L(p,1-m),new L(g,1-_)]}};function us(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}function ds(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function fs(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var ps=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},ms=class extends ps{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:g,endingEnd:g}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case _:i=e,o=2*t-n;break;case v:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case _:a=e,s=2*n-t;break;case v:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},hs=class extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},gs=class extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_s=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ds(t,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ds(e.times,Array),values:ds(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new gs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ms(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case p:t=this.InterpolantFactoryMethodDiscrete;break;case m:t=this.InterpolantFactoryMethodLinear;break;case h:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return p;case this.InterpolantFactoryMethodLinear:return m;case this.InterpolantFactoryMethodSmooth:return h}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&fs(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===h,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};_s.prototype.TimeBufferType=Float32Array,_s.prototype.ValueBufferType=Float32Array,_s.prototype.DefaultInterpolation=m;var vs=class extends _s{};vs.prototype.ValueTypeName=`bool`,vs.prototype.ValueBufferType=Array,vs.prototype.DefaultInterpolation=p,vs.prototype.InterpolantFactoryMethodLinear=void 0,vs.prototype.InterpolantFactoryMethodSmooth=void 0;var ys=class extends _s{};ys.prototype.ValueTypeName=`color`;var bs=class extends _s{};bs.prototype.ValueTypeName=`number`;var xs=class extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Te.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ss=class extends _s{InterpolantFactoryMethodLinear(e){return new xs(this.times,this.values,this.getValueSize(),e)}};Ss.prototype.ValueTypeName=`quaternion`,Ss.prototype.DefaultInterpolation=m,Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends _s{};Cs.prototype.ValueTypeName=`string`,Cs.prototype.ValueBufferType=Array,Cs.prototype.DefaultInterpolation=p,Cs.prototype.InterpolantFactoryMethodLinear=void 0,Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var ws=class extends _s{};ws.prototype.ValueTypeName=`vector`;let Ts={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},Es=/*@__PURE__*/ new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null}}};var Ds=class{constructor(e){this.manager=e===void 0?Es:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ds.DEFAULT_MATERIAL_NAME=`__DEFAULT`;let Os={};var ks=class extends Error{constructor(e,t){super(e),this.response=t}},As=class extends Ds{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Ts.get(e);if(i!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0),i;if(Os[e]!==void 0){Os[e].push({onLoad:t,onProgress:n,onError:r});return}Os[e]=[],Os[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&console.warn(`THREE.FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Os[e],r=t.body.getReader(),i=t.headers.get(`Content-Length`)||t.headers.get(`X-File-Size`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}})}}});return new Response(c)}throw new ks(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===void 0)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Ts.add(e,t);let n=Os[e];delete Os[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Os[e];if(n===void 0)throw this.manager.itemError(e),t;delete Os[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};let js=/* @__PURE__ */ RegExp(`[\\[\\]\\.:\\/]`,`g`),Ms=/* @__PURE__ */ RegExp(`^((?:[^\\[\\]\\.:\\/]+[\\/:])*)([^\\[\\]:\\/]+)?(?:\\.([^\\[\\]\\.:\\/]+)(?:\\[(.+)\\])?)?\\.([^\\[\\]\\.:\\/]+)(?:\\[(.+)\\])?$`),Ns=[`material`,`materials`,`bones`,`map`];var Ps=class{constructor(e,t,n){let r=n||Fs.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Fs=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(js,``)}static parseTrackName(e){let t=Ms.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ns.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Fs.Composite=Ps,Fs.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Fs.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Fs.prototype.GetterByBindingType=[Fs.prototype._getValue_direct,Fs.prototype._getValue_array,Fs.prototype._getValue_arrayElement,Fs.prototype._getValue_toArray],Fs.prototype.SetterByBindingTypeAndVersioning=[[Fs.prototype._setValue_direct,Fs.prototype._setValue_direct_setNeedsUpdate,Fs.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Fs.prototype._setValue_array,Fs.prototype._setValue_array_setNeedsUpdate,Fs.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Fs.prototype._setValue_arrayElement,Fs.prototype._setValue_arrayElement_setNeedsUpdate,Fs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Fs.prototype._setValue_fromArray,Fs.prototype._setValue_fromArray_setNeedsUpdate,Fs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Is=class{constructor(){this.type=`ShapePath`,this.color=new Ht,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new To,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,r){return this.currentPath.quadraticCurveTo(e,t,n,r),this}bezierCurveTo(e,t,n,r,i,a){return this.currentPath.bezierCurveTo(e,t,n,r,i,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n],i=new Eo;i.curves=r.curves,t.push(i)}return t}function n(e,t){let n=t.length,r=!1;for(let i=n-1,a=0;a<n;i=a++){let n=t[i],o=t[a],s=o.x-n.x,c=o.y-n.y;if(Math.abs(c)>2**-52){if(c<0&&(n=t[a],s=-s,o=t[i],c=-c),e.y<n.y||e.y>o.y)continue;if(e.y===n.y){if(e.x===n.x)return!0}else{let t=c*(e.x-n.x)-s*(e.y-n.y);if(t===0)return!0;if(t<0)continue;r=!r}}else{if(e.y!==n.y)continue;if(o.x<=e.x&&e.x<=n.x||n.x<=e.x&&e.x<=o.x)return!0}}return r}let r=as.isClockWise,i=this.subPaths;if(i.length===0)return[];let a,o,s,c=[];if(i.length===1)return o=i[0],s=new Eo,s.curves=o.curves,c.push(s),c;let l=!r(i[0].getPoints());l=e?!l:l;let u=[],d=[],f=[],p=0,m;d[p]=void 0,f[p]=[];for(let t=0,n=i.length;t<n;t++)o=i[t],m=o.getPoints(),a=r(m),a=e?!a:a,a?(!l&&d[p]&&p++,d[p]={s:new Eo,p:m},d[p].s.curves=o.curves,l&&p++,f[p]=[]):f[p].push({h:o,p:m[0]});if(!d[0])return t(i);if(d.length>1){let e=!1,t=0;for(let e=0,t=d.length;e<t;e++)u[e]=[];for(let r=0,i=d.length;r<i;r++){let i=f[r];for(let a=0;a<i.length;a++){let o=i[a],s=!0;for(let i=0;i<d.length;i++)n(o.p,d[i].p)&&(r!==i&&t++,s?(s=!1,u[i].push(o)):e=!0);s&&u[r].push(o)}}t>0&&e===!1&&(f=u)}let h;for(let e=0,t=d.length;e<t;e++){s=d[e].s,c.push(s),h=f[e];for(let e=0,t=h.length;e<t;e++)s.holes.push(h[e].h)}return c}};typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`161`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`161`);var Ls=class extends Ds{constructor(e){super(e)}load(e,t,n,r){let i=this,a=new As(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(e){let n=i.parse(JSON.parse(e));t&&t(n)},n,r)}parse(e){return new Rs(e)}},Rs=class{constructor(e){this.isFont=!0,this.type=`Font`,this.data=e}generateShapes(e,t=100){let n=[],r=zs(e,t,this.data);for(let e=0,t=r.length;e<t;e++)n.push(...r[e].toShapes());return n}};function zs(e,t,n){let r=Array.from(e),i=t/n.resolution,a=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*i,o=[],s=0,c=0;for(let e=0;e<r.length;e++){let t=r[e];if(t===`
`)s=0,c-=a;else{let e=Bs(t,i,s,c,n);s+=e.offsetX,o.push(e.path)}}return o}function Bs(e,t,n,r,i){let a=i.glyphs[e]||i.glyphs[`?`];if(!a){console.error(`THREE.Font: character "`+e+`" does not exists in font family `+i.familyName+`.`);return}let o=new Is,s,c,l,u,d,f,p,m;if(a.o){let e=a._cachedOutline||=a.o.split(` `);for(let i=0,a=e.length;i<a;)switch(e[i++]){case`m`:s=e[i++]*t+n,c=e[i++]*t+r,o.moveTo(s,c);break;case`l`:s=e[i++]*t+n,c=e[i++]*t+r,o.lineTo(s,c);break;case`q`:l=e[i++]*t+n,u=e[i++]*t+r,d=e[i++]*t+n,f=e[i++]*t+r,o.quadraticCurveTo(d,f,l,u);break;case`b`:l=e[i++]*t+n,u=e[i++]*t+r,d=e[i++]*t+n,f=e[i++]*t+r,p=e[i++]*t+n,m=e[i++]*t+r,o.bezierCurveTo(d,f,p,m,l,u)}}return{offsetX:a.ha*t,path:o}}
/*! https://mths.be/codepointat v0.2.0 by @mathias */
String.prototype.codePointAt||(function(){var e=function(){try{var e={},t=Object.defineProperty,n=t(e,e,e)&&t}catch{}return n}(),t=function(e){if(this==null)throw TypeError();var t=String(this),n=t.length,r=e?Number(e):0;if(r!=r&&(r=0),!(r<0||r>=n)){var i=t.charCodeAt(r),a;return i>=55296&&i<=56319&&n>r+1&&(a=t.charCodeAt(r+1),a>=56320&&a<=57343)?(i-55296)*1024+a-56320+65536:i}};e?e(String.prototype,`codePointAt`,{value:t,configurable:!0,writable:!0}):String.prototype.codePointAt=t})();var Vs=0,Hs=-3;function Us(){this.table=/* @__PURE__ */ new Uint16Array(16),this.trans=/* @__PURE__ */ new Uint16Array(288)}function Ws(e,t){this.source=e,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=t,this.destLen=0,this.ltree=new Us,this.dtree=new Us}var Gs=new Us,Ks=new Us,qs=/* @__PURE__ */ new Uint8Array(30),Js=/* @__PURE__ */ new Uint16Array(30),Ys=/* @__PURE__ */ new Uint8Array(30),Xs=/* @__PURE__ */ new Uint16Array(30),Zs=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Qs=new Us,$s=/* @__PURE__ */ new Uint8Array(320);function ec(e,t,n,r){for(var i=0,a;i<n;++i)e[i]=0;for(i=0;i<30-n;++i)e[i+n]=i/n|0;for(a=r,i=0;i<30;++i)t[i]=a,a+=1<<e[i]}function tc(e,t){for(var n=0;n<7;++n)e.table[n]=0;for(e.table[7]=24,e.table[8]=152,e.table[9]=112,n=0;n<24;++n)e.trans[n]=256+n;for(n=0;n<144;++n)e.trans[24+n]=n;for(n=0;n<8;++n)e.trans[168+n]=280+n;for(n=0;n<112;++n)e.trans[176+n]=144+n;for(n=0;n<5;++n)t.table[n]=0;for(t.table[5]=32,n=0;n<32;++n)t.trans[n]=n}var nc=/* @__PURE__ */ new Uint16Array(16);function rc(e,t,n,r){for(var i=0,a;i<16;++i)e.table[i]=0;for(i=0;i<r;++i)e.table[t[n+i]]++;for(e.table[0]=0,a=0,i=0;i<16;++i)nc[i]=a,a+=e.table[i];for(i=0;i<r;++i)t[n+i]&&(e.trans[nc[t[n+i]]++]=i)}function ic(e){e.bitcount--||(e.tag=e.source[e.sourceIndex++],e.bitcount=7);var t=e.tag&1;return e.tag>>>=1,t}function ac(e,t,n){if(!t)return n;for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;var r=e.tag&65535>>>16-t;return e.tag>>>=t,e.bitcount-=t,r+n}function oc(e,t){for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;var n=0,r=0,i=0,a=e.tag;do r=2*r+(a&1),a>>>=1,++i,n+=t.table[i],r-=t.table[i];while(r>=0);return e.tag=a,e.bitcount-=i,t.trans[n+r]}function sc(e,t,n){for(var r=ac(e,5,257),i=ac(e,5,1),a=ac(e,4,4),o=0,s,c;o<19;++o)$s[o]=0;for(o=0;o<a;++o){var l=ac(e,3,0);$s[Zs[o]]=l}for(rc(Qs,$s,0,19),s=0;s<r+i;){var u=oc(e,Qs);switch(u){case 16:var d=$s[s-1];for(c=ac(e,2,3);c;--c)$s[s++]=d;break;case 17:for(c=ac(e,3,3);c;--c)$s[s++]=0;break;case 18:for(c=ac(e,7,11);c;--c)$s[s++]=0;break;default:$s[s++]=u}}rc(t,$s,0,r),rc(n,$s,r,i)}function cc(e,t,n){for(;;){var r=oc(e,t);if(r===256)return Vs;if(r<256)e.dest[e.destLen++]=r;else{var i,a,o,s;for(r-=257,i=ac(e,qs[r],Js[r]),a=oc(e,n),o=e.destLen-ac(e,Ys[a],Xs[a]),s=o;s<o+i;++s)e.dest[e.destLen++]=e.dest[s]}}}function lc(e){for(var t,n,r;e.bitcount>8;)e.sourceIndex--,e.bitcount-=8;if(t=e.source[e.sourceIndex+1],t=256*t+e.source[e.sourceIndex],n=e.source[e.sourceIndex+3],n=256*n+e.source[e.sourceIndex+2],t!==(~n&65535))return Hs;for(e.sourceIndex+=4,r=t;r;--r)e.dest[e.destLen++]=e.source[e.sourceIndex++];return e.bitcount=0,Vs}function uc(e,t){var n=new Ws(e,t),r,i,a;do{switch(r=ic(n),i=ac(n,2,0),i){case 0:a=lc(n);break;case 1:a=cc(n,Gs,Ks);break;case 2:sc(n,n.ltree,n.dtree),a=cc(n,n.ltree,n.dtree);break;default:a=Hs}if(a!==Vs)throw Error(`Data error`)}while(!r);return n.destLen<n.dest.length?typeof n.dest.slice==`function`?n.dest.slice(0,n.destLen):n.dest.subarray(0,n.destLen):n.dest}tc(Gs,Ks),ec(qs,Js,4,3),ec(Ys,Xs,2,1),qs[28]=0,Js[28]=258;var dc=uc;function fc(e,t,n,r,i){return(1-i)**3*e+3*(1-i)**2*i*t+3*(1-i)*i**2*n+i**3*r}function pc(){this.x1=NaN,this.y1=NaN,this.x2=NaN,this.y2=NaN}pc.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)},pc.prototype.addPoint=function(e,t){typeof e==`number`&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=e,this.x2=e),e<this.x1&&(this.x1=e),e>this.x2&&(this.x2=e)),typeof t==`number`&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=t,this.y2=t),t<this.y1&&(this.y1=t),t>this.y2&&(this.y2=t))},pc.prototype.addX=function(e){this.addPoint(e,null)},pc.prototype.addY=function(e){this.addPoint(null,e)},pc.prototype.addBezier=function(e,t,n,r,i,a,o,s){var c=[e,t],l=[n,r],u=[i,a],d=[o,s];this.addPoint(e,t),this.addPoint(o,s);for(var f=0;f<=1;f++){var p=6*c[f]-12*l[f]+6*u[f],m=-3*c[f]+9*l[f]-9*u[f]+3*d[f],h=3*l[f]-3*c[f];if(m===0){if(p===0)continue;var g=-h/p;0<g&&g<1&&(f===0&&this.addX(fc(c[f],l[f],u[f],d[f],g)),f===1&&this.addY(fc(c[f],l[f],u[f],d[f],g)))}else{var _=p**2-4*h*m;if(!(_<0)){var v=(-p+Math.sqrt(_))/(2*m);0<v&&v<1&&(f===0&&this.addX(fc(c[f],l[f],u[f],d[f],v)),f===1&&this.addY(fc(c[f],l[f],u[f],d[f],v)));var y=(-p-Math.sqrt(_))/(2*m);0<y&&y<1&&(f===0&&this.addX(fc(c[f],l[f],u[f],d[f],y)),f===1&&this.addY(fc(c[f],l[f],u[f],d[f],y)))}}}},pc.prototype.addQuad=function(e,t,n,r,i,a){var o=e+2/3*(n-e),s=t+2/3*(r-t),c=o+1/3*(i-e),l=s+1/3*(a-t);this.addBezier(e,t,o,s,c,l,i,a)};function mc(){this.commands=[],this.fill=`black`,this.stroke=null,this.strokeWidth=1}mc.prototype.moveTo=function(e,t){this.commands.push({type:`M`,x:e,y:t})},mc.prototype.lineTo=function(e,t){this.commands.push({type:`L`,x:e,y:t})},mc.prototype.curveTo=mc.prototype.bezierCurveTo=function(e,t,n,r,i,a){this.commands.push({type:`C`,x1:e,y1:t,x2:n,y2:r,x:i,y:a})},mc.prototype.quadTo=mc.prototype.quadraticCurveTo=function(e,t,n,r){this.commands.push({type:`Q`,x1:e,y1:t,x:n,y:r})},mc.prototype.close=mc.prototype.closePath=function(){this.commands.push({type:`Z`})},mc.prototype.extend=function(e){if(e.commands)e=e.commands;else if(e instanceof pc){var t=e;this.moveTo(t.x1,t.y1),this.lineTo(t.x2,t.y1),this.lineTo(t.x2,t.y2),this.lineTo(t.x1,t.y2),this.close();return}Array.prototype.push.apply(this.commands,e)},mc.prototype.getBoundingBox=function(){for(var e=new pc,t=0,n=0,r=0,i=0,a=0;a<this.commands.length;a++){var o=this.commands[a];switch(o.type){case`M`:e.addPoint(o.x,o.y),t=r=o.x,n=i=o.y;break;case`L`:e.addPoint(o.x,o.y),r=o.x,i=o.y;break;case`Q`:e.addQuad(r,i,o.x1,o.y1,o.x,o.y),r=o.x,i=o.y;break;case`C`:e.addBezier(r,i,o.x1,o.y1,o.x2,o.y2,o.x,o.y),r=o.x,i=o.y;break;case`Z`:r=t,i=n;break;default:throw Error(`Unexpected path command `+o.type)}}return e.isEmpty()&&e.addPoint(0,0),e},mc.prototype.draw=function(e){e.beginPath();for(var t=0;t<this.commands.length;t+=1){var n=this.commands[t];n.type===`M`?e.moveTo(n.x,n.y):n.type===`L`?e.lineTo(n.x,n.y):n.type===`C`?e.bezierCurveTo(n.x1,n.y1,n.x2,n.y2,n.x,n.y):n.type===`Q`?e.quadraticCurveTo(n.x1,n.y1,n.x,n.y):n.type===`Z`&&e.closePath()}this.fill&&(e.fillStyle=this.fill,e.fill()),this.stroke&&(e.strokeStyle=this.stroke,e.lineWidth=this.strokeWidth,e.stroke())},mc.prototype.toPathData=function(e){e=e===void 0?2:e;function t(t){return Math.round(t)===t?``+Math.round(t):t.toFixed(e)}function n(){for(var e=arguments,n=``,r=0;r<arguments.length;r+=1){var i=e[r];i>=0&&r>0&&(n+=` `),n+=t(i)}return n}for(var r=``,i=0;i<this.commands.length;i+=1){var a=this.commands[i];a.type===`M`?r+=`M`+n(a.x,a.y):a.type===`L`?r+=`L`+n(a.x,a.y):a.type===`C`?r+=`C`+n(a.x1,a.y1,a.x2,a.y2,a.x,a.y):a.type===`Q`?r+=`Q`+n(a.x1,a.y1,a.x,a.y):a.type===`Z`&&(r+=`Z`)}return r},mc.prototype.toSVG=function(e){var t=`<path d="`;return t+=this.toPathData(e),t+=`"`,this.fill&&this.fill!==`black`&&(this.fill===null?t+=` fill="none"`:t+=` fill="`+this.fill+`"`),this.stroke&&(t+=` stroke="`+this.stroke+`" stroke-width="`+this.strokeWidth+`"`),t+=`/>`,t},mc.prototype.toDOMElement=function(e){var t=this.toPathData(e),n=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return n.setAttribute(`d`,t),n};function hc(e){throw Error(e)}function gc(e,t){e||hc(t)}var q={fail:hc,argument:gc,assert:gc},_c=32768,vc=2147483648,yc={},J={},Y={};function bc(e){return function(){return e}}J.BYTE=function(e){return q.argument(e>=0&&e<=255,`Byte value should be between 0 and 255.`),[e]},Y.BYTE=bc(1),J.CHAR=function(e){return[e.charCodeAt(0)]},Y.CHAR=bc(1),J.CHARARRAY=function(e){e===void 0&&(e=``,console.warn(`Undefined CHARARRAY encountered and treated as an empty string. This is probably caused by a missing glyph name.`));for(var t=[],n=0;n<e.length;n+=1)t[n]=e.charCodeAt(n);return t},Y.CHARARRAY=function(e){return e===void 0?0:e.length},J.USHORT=function(e){return[e>>8&255,e&255]},Y.USHORT=bc(2),J.SHORT=function(e){return e>=_c&&(e=-(2*_c-e)),[e>>8&255,e&255]},Y.SHORT=bc(2),J.UINT24=function(e){return[e>>16&255,e>>8&255,e&255]},Y.UINT24=bc(3),J.ULONG=function(e){return[e>>24&255,e>>16&255,e>>8&255,e&255]},Y.ULONG=bc(4),J.LONG=function(e){return e>=vc&&(e=-(2*vc-e)),[e>>24&255,e>>16&255,e>>8&255,e&255]},Y.LONG=bc(4),J.FIXED=J.ULONG,Y.FIXED=Y.ULONG,J.FWORD=J.SHORT,Y.FWORD=Y.SHORT,J.UFWORD=J.USHORT,Y.UFWORD=Y.USHORT,J.LONGDATETIME=function(e){return[0,0,0,0,e>>24&255,e>>16&255,e>>8&255,e&255]},Y.LONGDATETIME=bc(8),J.TAG=function(e){return q.argument(e.length===4,`Tag should be exactly 4 ASCII characters.`),[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]},Y.TAG=bc(4),J.Card8=J.BYTE,Y.Card8=Y.BYTE,J.Card16=J.USHORT,Y.Card16=Y.USHORT,J.OffSize=J.BYTE,Y.OffSize=Y.BYTE,J.SID=J.USHORT,Y.SID=Y.USHORT,J.NUMBER=function(e){return e>=-107&&e<=107?[e+139]:e>=108&&e<=1131?(e-=108,[(e>>8)+247,e&255]):e>=-1131&&e<=-108?(e=-e-108,[(e>>8)+251,e&255]):e>=-32768&&e<=32767?J.NUMBER16(e):J.NUMBER32(e)},Y.NUMBER=function(e){return J.NUMBER(e).length},J.NUMBER16=function(e){return[28,e>>8&255,e&255]},Y.NUMBER16=bc(3),J.NUMBER32=function(e){return[29,e>>24&255,e>>16&255,e>>8&255,e&255]},Y.NUMBER32=bc(5),J.REAL=function(e){var t=e.toString(),n=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);if(n){var r=parseFloat(`1e`+((n[2]?+n[2]:0)+n[1].length));t=(Math.round(e*r)/r).toString()}for(var i=``,a=0,o=t.length;a<o;a+=1){var s=t[a];i+=s===`e`?t[++a]===`-`?`c`:`b`:s===`.`?`a`:s===`-`?`e`:s}i+=i.length&1?`f`:`ff`;for(var c=[30],l=0,u=i.length;l<u;l+=2)c.push(parseInt(i.substr(l,2),16));return c},Y.REAL=function(e){return J.REAL(e).length},J.NAME=J.CHARARRAY,Y.NAME=Y.CHARARRAY,J.STRING=J.CHARARRAY,Y.STRING=Y.CHARARRAY,yc.UTF8=function(e,t,n){for(var r=[],i=n,a=0;a<i;a++,t+=1)r[a]=e.getUint8(t);return String.fromCharCode.apply(null,r)},yc.UTF16=function(e,t,n){for(var r=[],i=n/2,a=0;a<i;a++,t+=2)r[a]=e.getUint16(t);return String.fromCharCode.apply(null,r)},J.UTF16=function(e){for(var t=[],n=0;n<e.length;n+=1){var r=e.charCodeAt(n);t[t.length]=r>>8&255,t[t.length]=r&255}return t},Y.UTF16=function(e){return e.length*2};var xc={"x-mac-croatian":`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č…\xA0ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ`,"x-mac-cyrillic":`АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»…\xA0ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю`,"x-mac-gaelic":`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»…\xA0ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ`,"x-mac-greek":`Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»…\xA0ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­`,"x-mac-icelandic":`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ`,"x-mac-inuit":`ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ…\xA0ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł`,"x-mac-ce":`ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»…\xA0ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ`,macintosh:`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ`,"x-mac-romanian":`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ`,"x-mac-turkish":`ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ`};yc.MACSTRING=function(e,t,n,r){var i=xc[r];if(i!==void 0){for(var a=``,o=0;o<n;o++){var s=e.getUint8(t+o);a+=s<=127?String.fromCharCode(s):i[s&127]}return a}};var Sc=typeof WeakMap==`function`&&/* @__PURE__ */ new WeakMap,Cc,wc=function(e){if(!Cc)for(var t in Cc={},xc)Cc[t]=new String(t);var n=Cc[e];if(n!==void 0){if(Sc){var r=Sc.get(n);if(r!==void 0)return r}var i=xc[e];if(i!==void 0){for(var a={},o=0;o<i.length;o++)a[i.charCodeAt(o)]=o+128;return Sc&&Sc.set(n,a),a}}};J.MACSTRING=function(e,t){var n=wc(t);if(n!==void 0){for(var r=[],i=0;i<e.length;i++){var a=e.charCodeAt(i);if(a>=128&&(a=n[a],a===void 0))return;r[i]=a}return r}},Y.MACSTRING=function(e,t){var n=J.MACSTRING(e,t);return n===void 0?0:n.length};function Tc(e){return e>=-128&&e<=127}function Ec(e,t,n){for(var r=0,i=e.length;t<i&&r<64&&e[t]===0;)++t,++r;return n.push(128|r-1),t}function Dc(e,t,n){for(var r=0,i=e.length,a=t;a<i&&r<64;){var o=e[a];if(!Tc(o)||o===0&&a+1<i&&e[a+1]===0)break;++a,++r}n.push(r-1);for(var s=t;s<a;++s)n.push(e[s]+256&255);return a}function Oc(e,t,n){for(var r=0,i=e.length,a=t;a<i&&r<64;){var o=e[a];if(o===0||Tc(o)&&a+1<i&&Tc(e[a+1]))break;++a,++r}n.push(64|r-1);for(var s=t;s<a;++s){var c=e[s];n.push(c+65536>>8&255,c+256&255)}return a}J.VARDELTAS=function(e){for(var t=0,n=[];t<e.length;){var r=e[t];t=r===0?Ec(e,t,n):r>=-128&&r<=127?Dc(e,t,n):Oc(e,t,n)}return n},J.INDEX=function(e){for(var t=1,n=[t],r=[],i=0;i<e.length;i+=1){var a=J.OBJECT(e[i]);Array.prototype.push.apply(r,a),t+=a.length,n.push(t)}if(r.length===0)return[0,0];for(var o=[],s=1+Math.floor(Math.log(t)/Math.log(2))/8|0,c=[void 0,J.BYTE,J.USHORT,J.UINT24,J.ULONG][s],l=0;l<n.length;l+=1){var u=c(n[l]);Array.prototype.push.apply(o,u)}return Array.prototype.concat(J.Card16(e.length),J.OffSize(s),o,r)},Y.INDEX=function(e){return J.INDEX(e).length},J.DICT=function(e){for(var t=[],n=Object.keys(e),r=n.length,i=0;i<r;i+=1){var a=parseInt(n[i],0),o=e[a];t=t.concat(J.OPERAND(o.value,o.type)),t=t.concat(J.OPERATOR(a))}return t},Y.DICT=function(e){return J.DICT(e).length},J.OPERATOR=function(e){return e<1200?[e]:[12,e-1200]},J.OPERAND=function(e,t){var n=[];if(Array.isArray(t))for(var r=0;r<t.length;r+=1)q.argument(e.length===t.length,`Not enough arguments given for type`+t),n=n.concat(J.OPERAND(e[r],t[r]));else if(t===`SID`)n=n.concat(J.NUMBER(e));else if(t===`offset`)n=n.concat(J.NUMBER32(e));else if(t===`number`)n=n.concat(J.NUMBER(e));else if(t===`real`)n=n.concat(J.REAL(e));else throw Error(`Unknown operand type `+t);return n},J.OP=J.BYTE,Y.OP=Y.BYTE;var kc=typeof WeakMap==`function`&&/* @__PURE__ */ new WeakMap;J.CHARSTRING=function(e){if(kc){var t=kc.get(e);if(t!==void 0)return t}for(var n=[],r=e.length,i=0;i<r;i+=1){var a=e[i];n=n.concat(J[a.type](a.value))}return kc&&kc.set(e,n),n},Y.CHARSTRING=function(e){return J.CHARSTRING(e).length},J.OBJECT=function(e){var t=J[e.type];return q.argument(t!==void 0,`No encoding function for type `+e.type),t(e.value)},Y.OBJECT=function(e){var t=Y[e.type];return q.argument(t!==void 0,`No sizeOf function for type `+e.type),t(e.value)},J.TABLE=function(e){for(var t=[],n=e.fields.length,r=[],i=[],a=0;a<n;a+=1){var o=e.fields[a],s=J[o.type];q.argument(s!==void 0,`No encoding function for field type `+o.type+` (`+o.name+`)`);var c=e[o.name];c===void 0&&(c=o.value);var l=s(c);o.type===`TABLE`?(i.push(t.length),t=t.concat([0,0]),r.push(l)):t=t.concat(l)}for(var u=0;u<r.length;u+=1){var d=i[u],f=t.length;q.argument(f<65536,`Table `+e.tableName+` too big.`),t[d]=f>>8,t[d+1]=f&255,t=t.concat(r[u])}return t},Y.TABLE=function(e){for(var t=0,n=e.fields.length,r=0;r<n;r+=1){var i=e.fields[r],a=Y[i.type];q.argument(a!==void 0,`No sizeOf function for field type `+i.type+` (`+i.name+`)`);var o=e[i.name];o===void 0&&(o=i.value),t+=a(o),i.type===`TABLE`&&(t+=2)}return t},J.RECORD=J.TABLE,Y.RECORD=Y.TABLE,J.LITERAL=function(e){return e},Y.LITERAL=function(e){return e.length};function Ac(e,t,n){if(t.length&&(t[0].name!==`coverageFormat`||t[0].value===1))for(var r=0;r<t.length;r+=1){var i=t[r];this[i.name]=i.value}if(this.tableName=e,this.fields=t,n)for(var a=Object.keys(n),o=0;o<a.length;o+=1){var s=a[o],c=n[s];this[s]!==void 0&&(this[s]=c)}}Ac.prototype.encode=function(){return J.TABLE(this)},Ac.prototype.sizeOf=function(){return Y.TABLE(this)};function jc(e,t,n){n===void 0&&(n=t.length);var r=Array(t.length+1);r[0]={name:e+`Count`,type:`USHORT`,value:n};for(var i=0;i<t.length;i++)r[i+1]={name:e+i,type:`USHORT`,value:t[i]};return r}function Mc(e,t,n){var r=t.length,i=Array(r+1);i[0]={name:e+`Count`,type:`USHORT`,value:r};for(var a=0;a<r;a++)i[a+1]={name:e+a,type:`TABLE`,value:n(t[a],a)};return i}function Nc(e,t,n){var r=t.length,i=[];i[0]={name:e+`Count`,type:`USHORT`,value:r};for(var a=0;a<r;a++)i=i.concat(n(t[a],a));return i}function Pc(e){e.format===1?Ac.call(this,`coverageTable`,[{name:`coverageFormat`,type:`USHORT`,value:1}].concat(jc(`glyph`,e.glyphs))):e.format===2?Ac.call(this,`coverageTable`,[{name:`coverageFormat`,type:`USHORT`,value:2}].concat(Nc(`rangeRecord`,e.ranges,function(e){return[{name:`startGlyphID`,type:`USHORT`,value:e.start},{name:`endGlyphID`,type:`USHORT`,value:e.end},{name:`startCoverageIndex`,type:`USHORT`,value:e.index}]}))):q.assert(!1,`Coverage format must be 1 or 2.`)}Pc.prototype=Object.create(Ac.prototype),Pc.prototype.constructor=Pc;function Fc(e){Ac.call(this,`scriptListTable`,Nc(`scriptRecord`,e,function(e,t){var n=e.script,r=n.defaultLangSys;return q.assert(!!r,`Unable to write GSUB: script `+e.tag+` has no default language system.`),[{name:`scriptTag`+t,type:`TAG`,value:e.tag},{name:`script`+t,type:`TABLE`,value:new Ac(`scriptTable`,[{name:`defaultLangSys`,type:`TABLE`,value:new Ac(`defaultLangSys`,[{name:`lookupOrder`,type:`USHORT`,value:0},{name:`reqFeatureIndex`,type:`USHORT`,value:r.reqFeatureIndex}].concat(jc(`featureIndex`,r.featureIndexes)))}].concat(Nc(`langSys`,n.langSysRecords,function(e,t){var n=e.langSys;return[{name:`langSysTag`+t,type:`TAG`,value:e.tag},{name:`langSys`+t,type:`TABLE`,value:new Ac(`langSys`,[{name:`lookupOrder`,type:`USHORT`,value:0},{name:`reqFeatureIndex`,type:`USHORT`,value:n.reqFeatureIndex}].concat(jc(`featureIndex`,n.featureIndexes)))}]})))}]}))}Fc.prototype=Object.create(Ac.prototype),Fc.prototype.constructor=Fc;function Ic(e){Ac.call(this,`featureListTable`,Nc(`featureRecord`,e,function(e,t){var n=e.feature;return[{name:`featureTag`+t,type:`TAG`,value:e.tag},{name:`feature`+t,type:`TABLE`,value:new Ac(`featureTable`,[{name:`featureParams`,type:`USHORT`,value:n.featureParams}].concat(jc(`lookupListIndex`,n.lookupListIndexes)))}]}))}Ic.prototype=Object.create(Ac.prototype),Ic.prototype.constructor=Ic;function Lc(e,t){Ac.call(this,`lookupListTable`,Mc(`lookup`,e,function(e){var n=t[e.lookupType];return q.assert(!!n,`Unable to write GSUB lookup type `+e.lookupType+` tables.`),new Ac(`lookupTable`,[{name:`lookupType`,type:`USHORT`,value:e.lookupType},{name:`lookupFlag`,type:`USHORT`,value:e.lookupFlag}].concat(Mc(`subtable`,e.subtables,n)))}))}Lc.prototype=Object.create(Ac.prototype),Lc.prototype.constructor=Lc;var X={Table:Ac,Record:Ac,Coverage:Pc,ScriptList:Fc,FeatureList:Ic,LookupList:Lc,ushortList:jc,tableList:Mc,recordList:Nc};function Rc(e,t){return e.getUint8(t)}function zc(e,t){return e.getUint16(t,!1)}function Bc(e,t){return e.getInt16(t,!1)}function Vc(e,t){return e.getUint32(t,!1)}function Hc(e,t){return e.getInt16(t,!1)+e.getUint16(t+2,!1)/65535}function Uc(e,t){for(var n=``,r=t;r<t+4;r+=1)n+=String.fromCharCode(e.getInt8(r));return n}function Wc(e,t,n){for(var r=0,i=0;i<n;i+=1)r<<=8,r+=e.getUint8(t+i);return r}function Gc(e,t,n){for(var r=[],i=t;i<n;i+=1)r.push(e.getUint8(i));return r}function Kc(e){for(var t=``,n=0;n<e.length;n+=1)t+=String.fromCharCode(e[n]);return t}var qc={byte:1,uShort:2,short:2,uLong:4,fixed:4,longDateTime:8,tag:4};function Z(e,t){this.data=e,this.offset=t,this.relativeOffset=0}Z.prototype.parseByte=function(){var e=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},Z.prototype.parseChar=function(){var e=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},Z.prototype.parseCard8=Z.prototype.parseByte,Z.prototype.parseUShort=function(){var e=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},Z.prototype.parseCard16=Z.prototype.parseUShort,Z.prototype.parseSID=Z.prototype.parseUShort,Z.prototype.parseOffset16=Z.prototype.parseUShort,Z.prototype.parseShort=function(){var e=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},Z.prototype.parseF2Dot14=function(){var e=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,e},Z.prototype.parseULong=function(){var e=Vc(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},Z.prototype.parseOffset32=Z.prototype.parseULong,Z.prototype.parseFixed=function(){var e=Hc(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},Z.prototype.parseString=function(e){var t=this.data,n=this.offset+this.relativeOffset,r=``;this.relativeOffset+=e;for(var i=0;i<e;i++)r+=String.fromCharCode(t.getUint8(n+i));return r},Z.prototype.parseTag=function(){return this.parseString(4)},Z.prototype.parseLongDateTime=function(){var e=Vc(this.data,this.offset+this.relativeOffset+4);return e-=2082844800,this.relativeOffset+=8,e},Z.prototype.parseVersion=function(e){var t=zc(this.data,this.offset+this.relativeOffset),n=zc(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,e===void 0&&(e=4096),t+n/e/10},Z.prototype.skip=function(e,t){t===void 0&&(t=1),this.relativeOffset+=qc[e]*t},Z.prototype.parseULongList=function(e){e===void 0&&(e=this.parseULong());for(var t=Array(e),n=this.data,r=this.offset+this.relativeOffset,i=0;i<e;i++)t[i]=n.getUint32(r),r+=4;return this.relativeOffset+=e*4,t},Z.prototype.parseOffset16List=Z.prototype.parseUShortList=function(e){e===void 0&&(e=this.parseUShort());for(var t=Array(e),n=this.data,r=this.offset+this.relativeOffset,i=0;i<e;i++)t[i]=n.getUint16(r),r+=2;return this.relativeOffset+=e*2,t},Z.prototype.parseShortList=function(e){for(var t=Array(e),n=this.data,r=this.offset+this.relativeOffset,i=0;i<e;i++)t[i]=n.getInt16(r),r+=2;return this.relativeOffset+=e*2,t},Z.prototype.parseByteList=function(e){for(var t=Array(e),n=this.data,r=this.offset+this.relativeOffset,i=0;i<e;i++)t[i]=n.getUint8(r++);return this.relativeOffset+=e,t},Z.prototype.parseList=function(e,t){t||(t=e,e=this.parseUShort());for(var n=Array(e),r=0;r<e;r++)n[r]=t.call(this);return n},Z.prototype.parseList32=function(e,t){t||(t=e,e=this.parseULong());for(var n=Array(e),r=0;r<e;r++)n[r]=t.call(this);return n},Z.prototype.parseRecordList=function(e,t){t||(t=e,e=this.parseUShort());for(var n=Array(e),r=Object.keys(t),i=0;i<e;i++){for(var a={},o=0;o<r.length;o++){var s=r[o];a[s]=t[s].call(this)}n[i]=a}return n},Z.prototype.parseRecordList32=function(e,t){t||(t=e,e=this.parseULong());for(var n=Array(e),r=Object.keys(t),i=0;i<e;i++){for(var a={},o=0;o<r.length;o++){var s=r[o];a[s]=t[s].call(this)}n[i]=a}return n},Z.prototype.parseStruct=function(e){if(typeof e==`function`)return e.call(this);for(var t=Object.keys(e),n={},r=0;r<t.length;r++){var i=t[r];n[i]=e[i].call(this)}return n},Z.prototype.parseValueRecord=function(e){if(e===void 0&&(e=this.parseUShort()),e!==0){var t={};return e&1&&(t.xPlacement=this.parseShort()),e&2&&(t.yPlacement=this.parseShort()),e&4&&(t.xAdvance=this.parseShort()),e&8&&(t.yAdvance=this.parseShort()),e&16&&(t.xPlaDevice=void 0,this.parseShort()),e&32&&(t.yPlaDevice=void 0,this.parseShort()),e&64&&(t.xAdvDevice=void 0,this.parseShort()),e&128&&(t.yAdvDevice=void 0,this.parseShort()),t}},Z.prototype.parseValueRecordList=function(){for(var e=this.parseUShort(),t=this.parseUShort(),n=Array(t),r=0;r<t;r++)n[r]=this.parseValueRecord(e);return n},Z.prototype.parsePointer=function(e){var t=this.parseOffset16();if(t>0)return new Z(this.data,this.offset+t).parseStruct(e)},Z.prototype.parsePointer32=function(e){var t=this.parseOffset32();if(t>0)return new Z(this.data,this.offset+t).parseStruct(e)},Z.prototype.parseListOfLists=function(e){for(var t=this.parseOffset16List(),n=t.length,r=this.relativeOffset,i=Array(n),a=0;a<n;a++){var o=t[a];if(o===0)i[a]=void 0;else if(this.relativeOffset=o,e){for(var s=this.parseOffset16List(),c=Array(s.length),l=0;l<s.length;l++)this.relativeOffset=o+s[l],c[l]=e.call(this);i[a]=c}else i[a]=this.parseUShortList()}return this.relativeOffset=r,i},Z.prototype.parseCoverage=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort(),n=this.parseUShort();if(t===1)return{format:1,glyphs:this.parseUShortList(n)};if(t===2){for(var r=Array(n),i=0;i<n;i++)r[i]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:r}}throw Error(`0x`+e.toString(16)+`: Coverage format must be 1 or 2.`)},Z.prototype.parseClassDef=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()};if(t===2)return{format:2,ranges:this.parseRecordList({start:Z.uShort,end:Z.uShort,classId:Z.uShort})};throw Error(`0x`+e.toString(16)+`: ClassDef format must be 1 or 2.`)},Z.list=function(e,t){return function(){return this.parseList(e,t)}},Z.list32=function(e,t){return function(){return this.parseList32(e,t)}},Z.recordList=function(e,t){return function(){return this.parseRecordList(e,t)}},Z.recordList32=function(e,t){return function(){return this.parseRecordList32(e,t)}},Z.pointer=function(e){return function(){return this.parsePointer(e)}},Z.pointer32=function(e){return function(){return this.parsePointer32(e)}},Z.tag=Z.prototype.parseTag,Z.byte=Z.prototype.parseByte,Z.uShort=Z.offset16=Z.prototype.parseUShort,Z.uShortList=Z.prototype.parseUShortList,Z.uLong=Z.offset32=Z.prototype.parseULong,Z.uLongList=Z.prototype.parseULongList,Z.struct=Z.prototype.parseStruct,Z.coverage=Z.prototype.parseCoverage,Z.classDef=Z.prototype.parseClassDef;var Jc={reserved:Z.uShort,reqFeatureIndex:Z.uShort,featureIndexes:Z.uShortList};Z.prototype.parseScriptList=function(){return this.parsePointer(Z.recordList({tag:Z.tag,script:Z.pointer({defaultLangSys:Z.pointer(Jc),langSysRecords:Z.recordList({tag:Z.tag,langSys:Z.pointer(Jc)})})}))||[]},Z.prototype.parseFeatureList=function(){return this.parsePointer(Z.recordList({tag:Z.tag,feature:Z.pointer({featureParams:Z.offset16,lookupListIndexes:Z.uShortList})}))||[]},Z.prototype.parseLookupList=function(e){return this.parsePointer(Z.list(Z.pointer(function(){var t=this.parseUShort();q.argument(1<=t&&t<=9,`GPOS/GSUB lookup type `+t+` unknown.`);var n=this.parseUShort(),r=n&16;return{lookupType:t,lookupFlag:n,subtables:this.parseList(Z.pointer(e[t])),markFilteringSet:r?this.parseUShort():void 0}})))||[]},Z.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){var e=this.parseUShort(),t=this.parseUShort();return q.argument(e===1&&t<1,`GPOS/GSUB feature variations table unknown.`),this.parseRecordList32({conditionSetOffset:Z.offset32,featureTableSubstitutionOffset:Z.offset32})})||[]};var Q={getByte:Rc,getCard8:Rc,getUShort:zc,getCard16:zc,getShort:Bc,getULong:Vc,getFixed:Hc,getTag:Uc,getOffset:Wc,getBytes:Gc,bytesToString:Kc,Parser:Z};function Yc(e,t){t.parseUShort(),e.length=t.parseULong(),e.language=t.parseULong();var n;e.groupCount=n=t.parseULong(),e.glyphIndexMap={};for(var r=0;r<n;r+=1)for(var i=t.parseULong(),a=t.parseULong(),o=t.parseULong(),s=i;s<=a;s+=1)e.glyphIndexMap[s]=o,o++}function Xc(e,t,n,r,i){e.length=t.parseUShort(),e.language=t.parseUShort();var a;e.segCount=a=t.parseUShort()>>1,t.skip(`uShort`,3),e.glyphIndexMap={};for(var o=new Q.Parser(n,r+i+14),s=new Q.Parser(n,r+i+16+a*2),c=new Q.Parser(n,r+i+16+a*4),l=new Q.Parser(n,r+i+16+a*6),u=r+i+16+a*8,d=0;d<a-1;d+=1)for(var f=void 0,p=o.parseUShort(),m=s.parseUShort(),h=c.parseShort(),g=l.parseUShort(),_=m;_<=p;_+=1)g===0?f=_+h&65535:(u=l.offset+l.relativeOffset-2,u+=g,u+=(_-m)*2,f=Q.getUShort(n,u),f!==0&&(f=f+h&65535)),e.glyphIndexMap[_]=f}function Zc(e,t){var n={};n.version=Q.getUShort(e,t),q.argument(n.version===0,`cmap table version should be 0.`),n.numTables=Q.getUShort(e,t+2);for(var r=-1,i=n.numTables-1;i>=0;--i){var a=Q.getUShort(e,t+4+i*8),o=Q.getUShort(e,t+4+i*8+2);if(a===3&&(o===0||o===1||o===10)||a===0&&(o===0||o===1||o===2||o===3||o===4)){r=Q.getULong(e,t+4+i*8+4);break}}if(r===-1)throw Error(`No valid cmap sub-tables found.`);var s=new Q.Parser(e,t+r);if(n.format=s.parseUShort(),n.format===12)Yc(n,s);else if(n.format===4)Xc(n,s,e,t,r);else throw Error(`Only format 4 and 12 cmap tables are supported (found format `+n.format+`).`);return n}function Qc(e,t,n){e.segments.push({end:t,start:t,delta:-(t-n),offset:0,glyphIndex:n})}function $c(e){e.segments.push({end:65535,start:65535,delta:1,offset:0})}function el(e){for(var t=!0,n=e.length-1;n>0;--n)if(e.get(n).unicode>65535){console.log(`Adding CMAP format 12 (needed!)`),t=!1;break}var r=[{name:`version`,type:`USHORT`,value:0},{name:`numTables`,type:`USHORT`,value:t?1:2},{name:`platformID`,type:`USHORT`,value:3},{name:`encodingID`,type:`USHORT`,value:1},{name:`offset`,type:`ULONG`,value:t?12:20}];t||(r=r.concat([{name:`cmap12PlatformID`,type:`USHORT`,value:3},{name:`cmap12EncodingID`,type:`USHORT`,value:10},{name:`cmap12Offset`,type:`ULONG`,value:0}])),r=r.concat([{name:`format`,type:`USHORT`,value:4},{name:`cmap4Length`,type:`USHORT`,value:0},{name:`language`,type:`USHORT`,value:0},{name:`segCountX2`,type:`USHORT`,value:0},{name:`searchRange`,type:`USHORT`,value:0},{name:`entrySelector`,type:`USHORT`,value:0},{name:`rangeShift`,type:`USHORT`,value:0}]);var i=new X.Table(`cmap`,r);for(i.segments=[],n=0;n<e.length;n+=1){for(var a=e.get(n),o=0;o<a.unicodes.length;o+=1)Qc(i,a.unicodes[o],n);i.segments=i.segments.sort(function(e,t){return e.start-t.start})}$c(i);var s=i.segments.length,c=0,l=[],u=[],d=[],f=[],p=[],m=[];for(n=0;n<s;n+=1){var h=i.segments[n];h.end<=65535&&h.start<=65535?(l=l.concat({name:`end_`+n,type:`USHORT`,value:h.end}),u=u.concat({name:`start_`+n,type:`USHORT`,value:h.start}),d=d.concat({name:`idDelta_`+n,type:`SHORT`,value:h.delta}),f=f.concat({name:`idRangeOffset_`+n,type:`USHORT`,value:h.offset}),h.glyphId!==void 0&&(p=p.concat({name:`glyph_`+n,type:`USHORT`,value:h.glyphId}))):c+=1,!t&&h.glyphIndex!==void 0&&(m=m.concat({name:`cmap12Start_`+n,type:`ULONG`,value:h.start}),m=m.concat({name:`cmap12End_`+n,type:`ULONG`,value:h.end}),m=m.concat({name:`cmap12Glyph_`+n,type:`ULONG`,value:h.glyphIndex}))}if(i.segCountX2=(s-c)*2,i.searchRange=2**Math.floor(Math.log(s-c)/Math.log(2))*2,i.entrySelector=Math.log(i.searchRange/2)/Math.log(2),i.rangeShift=i.segCountX2-i.searchRange,i.fields=i.fields.concat(l),i.fields.push({name:`reservedPad`,type:`USHORT`,value:0}),i.fields=i.fields.concat(u),i.fields=i.fields.concat(d),i.fields=i.fields.concat(f),i.fields=i.fields.concat(p),i.cmap4Length=14+l.length*2+2+u.length*2+d.length*2+f.length*2+p.length*2,!t){var g=16+m.length*4;i.cmap12Offset=20+i.cmap4Length,i.fields=i.fields.concat([{name:`cmap12Format`,type:`USHORT`,value:12},{name:`cmap12Reserved`,type:`USHORT`,value:0},{name:`cmap12Length`,type:`ULONG`,value:g},{name:`cmap12Language`,type:`ULONG`,value:0},{name:`cmap12nGroups`,type:`ULONG`,value:m.length/3}]),i.fields=i.fields.concat(m)}return i}var tl={parse:Zc,make:el},nl=/* @__PURE__ */ `.notdef,space,exclam,quotedbl,numbersign,dollar,percent,ampersand,quoteright,parenleft,parenright,asterisk,plus,comma,hyphen,period,slash,zero,one,two,three,four,five,six,seven,eight,nine,colon,semicolon,less,equal,greater,question,at,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,bracketleft,backslash,bracketright,asciicircum,underscore,quoteleft,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,braceleft,bar,braceright,asciitilde,exclamdown,cent,sterling,fraction,yen,florin,section,currency,quotesingle,quotedblleft,guillemotleft,guilsinglleft,guilsinglright,fi,fl,endash,dagger,daggerdbl,periodcentered,paragraph,bullet,quotesinglbase,quotedblbase,quotedblright,guillemotright,ellipsis,perthousand,questiondown,grave,acute,circumflex,tilde,macron,breve,dotaccent,dieresis,ring,cedilla,hungarumlaut,ogonek,caron,emdash,AE,ordfeminine,Lslash,Oslash,OE,ordmasculine,ae,dotlessi,lslash,oslash,oe,germandbls,onesuperior,logicalnot,mu,trademark,Eth,onehalf,plusminus,Thorn,onequarter,divide,brokenbar,degree,thorn,threequarters,twosuperior,registered,minus,eth,multiply,threesuperior,copyright,Aacute,Acircumflex,Adieresis,Agrave,Aring,Atilde,Ccedilla,Eacute,Ecircumflex,Edieresis,Egrave,Iacute,Icircumflex,Idieresis,Igrave,Ntilde,Oacute,Ocircumflex,Odieresis,Ograve,Otilde,Scaron,Uacute,Ucircumflex,Udieresis,Ugrave,Yacute,Ydieresis,Zcaron,aacute,acircumflex,adieresis,agrave,aring,atilde,ccedilla,eacute,ecircumflex,edieresis,egrave,iacute,icircumflex,idieresis,igrave,ntilde,oacute,ocircumflex,odieresis,ograve,otilde,scaron,uacute,ucircumflex,udieresis,ugrave,yacute,ydieresis,zcaron,exclamsmall,Hungarumlautsmall,dollaroldstyle,dollarsuperior,ampersandsmall,Acutesmall,parenleftsuperior,parenrightsuperior,266 ff,onedotenleader,zerooldstyle,oneoldstyle,twooldstyle,threeoldstyle,fouroldstyle,fiveoldstyle,sixoldstyle,sevenoldstyle,eightoldstyle,nineoldstyle,commasuperior,threequartersemdash,periodsuperior,questionsmall,asuperior,bsuperior,centsuperior,dsuperior,esuperior,isuperior,lsuperior,msuperior,nsuperior,osuperior,rsuperior,ssuperior,tsuperior,ff,ffi,ffl,parenleftinferior,parenrightinferior,Circumflexsmall,hyphensuperior,Gravesmall,Asmall,Bsmall,Csmall,Dsmall,Esmall,Fsmall,Gsmall,Hsmall,Ismall,Jsmall,Ksmall,Lsmall,Msmall,Nsmall,Osmall,Psmall,Qsmall,Rsmall,Ssmall,Tsmall,Usmall,Vsmall,Wsmall,Xsmall,Ysmall,Zsmall,colonmonetary,onefitted,rupiah,Tildesmall,exclamdownsmall,centoldstyle,Lslashsmall,Scaronsmall,Zcaronsmall,Dieresissmall,Brevesmall,Caronsmall,Dotaccentsmall,Macronsmall,figuredash,hypheninferior,Ogoneksmall,Ringsmall,Cedillasmall,questiondownsmall,oneeighth,threeeighths,fiveeighths,seveneighths,onethird,twothirds,zerosuperior,foursuperior,fivesuperior,sixsuperior,sevensuperior,eightsuperior,ninesuperior,zeroinferior,oneinferior,twoinferior,threeinferior,fourinferior,fiveinferior,sixinferior,seveninferior,eightinferior,nineinferior,centinferior,dollarinferior,periodinferior,commainferior,Agravesmall,Aacutesmall,Acircumflexsmall,Atildesmall,Adieresissmall,Aringsmall,AEsmall,Ccedillasmall,Egravesmall,Eacutesmall,Ecircumflexsmall,Edieresissmall,Igravesmall,Iacutesmall,Icircumflexsmall,Idieresissmall,Ethsmall,Ntildesmall,Ogravesmall,Oacutesmall,Ocircumflexsmall,Otildesmall,Odieresissmall,OEsmall,Oslashsmall,Ugravesmall,Uacutesmall,Ucircumflexsmall,Udieresissmall,Yacutesmall,Thornsmall,Ydieresissmall,001.000,001.001,001.002,001.003,Black,Bold,Book,Light,Medium,Regular,Roman,Semibold`.split(`,`),rl=/* @__PURE__ */ `................................space.exclam.quotedbl.numbersign.dollar.percent.ampersand.quoteright.parenleft.parenright.asterisk.plus.comma.hyphen.period.slash.zero.one.two.three.four.five.six.seven.eight.nine.colon.semicolon.less.equal.greater.question.at.A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.bracketleft.backslash.bracketright.asciicircum.underscore.quoteleft.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.braceleft.bar.braceright.asciitilde...................................exclamdown.cent.sterling.fraction.yen.florin.section.currency.quotesingle.quotedblleft.guillemotleft.guilsinglleft.guilsinglright.fi.fl..endash.dagger.daggerdbl.periodcentered..paragraph.bullet.quotesinglbase.quotedblbase.quotedblright.guillemotright.ellipsis.perthousand..questiondown..grave.acute.circumflex.tilde.macron.breve.dotaccent.dieresis..ring.cedilla..hungarumlaut.ogonek.caron.emdash.................AE..ordfeminine.....Lslash.Oslash.OE.ordmasculine......ae....dotlessi...lslash.oslash.oe.germandbls`.split(`.`),il=/* @__PURE__ */ `................................space.exclamsmall.Hungarumlautsmall..dollaroldstyle.dollarsuperior.ampersandsmall.Acutesmall.parenleftsuperior.parenrightsuperior.twodotenleader.onedotenleader.comma.hyphen.period.fraction.zerooldstyle.oneoldstyle.twooldstyle.threeoldstyle.fouroldstyle.fiveoldstyle.sixoldstyle.sevenoldstyle.eightoldstyle.nineoldstyle.colon.semicolon.commasuperior.threequartersemdash.periodsuperior.questionsmall..asuperior.bsuperior.centsuperior.dsuperior.esuperior...isuperior...lsuperior.msuperior.nsuperior.osuperior...rsuperior.ssuperior.tsuperior..ff.fi.fl.ffi.ffl.parenleftinferior..parenrightinferior.Circumflexsmall.hyphensuperior.Gravesmall.Asmall.Bsmall.Csmall.Dsmall.Esmall.Fsmall.Gsmall.Hsmall.Ismall.Jsmall.Ksmall.Lsmall.Msmall.Nsmall.Osmall.Psmall.Qsmall.Rsmall.Ssmall.Tsmall.Usmall.Vsmall.Wsmall.Xsmall.Ysmall.Zsmall.colonmonetary.onefitted.rupiah.Tildesmall...................................exclamdownsmall.centoldstyle.Lslashsmall...Scaronsmall.Zcaronsmall.Dieresissmall.Brevesmall.Caronsmall..Dotaccentsmall...Macronsmall...figuredash.hypheninferior...Ogoneksmall.Ringsmall.Cedillasmall....onequarter.onehalf.threequarters.questiondownsmall.oneeighth.threeeighths.fiveeighths.seveneighths.onethird.twothirds...zerosuperior.onesuperior.twosuperior.threesuperior.foursuperior.fivesuperior.sixsuperior.sevensuperior.eightsuperior.ninesuperior.zeroinferior.oneinferior.twoinferior.threeinferior.fourinferior.fiveinferior.sixinferior.seveninferior.eightinferior.nineinferior.centinferior.dollarinferior.periodinferior.commainferior.Agravesmall.Aacutesmall.Acircumflexsmall.Atildesmall.Adieresissmall.Aringsmall.AEsmall.Ccedillasmall.Egravesmall.Eacutesmall.Ecircumflexsmall.Edieresissmall.Igravesmall.Iacutesmall.Icircumflexsmall.Idieresissmall.Ethsmall.Ntildesmall.Ogravesmall.Oacutesmall.Ocircumflexsmall.Otildesmall.Odieresissmall.OEsmall.Oslashsmall.Ugravesmall.Uacutesmall.Ucircumflexsmall.Udieresissmall.Yacutesmall.Thornsmall.Ydieresissmall`.split(`.`),al=/* @__PURE__ */ `.notdef,.null,nonmarkingreturn,space,exclam,quotedbl,numbersign,dollar,percent,ampersand,quotesingle,parenleft,parenright,asterisk,plus,comma,hyphen,period,slash,zero,one,two,three,four,five,six,seven,eight,nine,colon,semicolon,less,equal,greater,question,at,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,bracketleft,backslash,bracketright,asciicircum,underscore,grave,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,braceleft,bar,braceright,asciitilde,Adieresis,Aring,Ccedilla,Eacute,Ntilde,Odieresis,Udieresis,aacute,agrave,acircumflex,adieresis,atilde,aring,ccedilla,eacute,egrave,ecircumflex,edieresis,iacute,igrave,icircumflex,idieresis,ntilde,oacute,ograve,ocircumflex,odieresis,otilde,uacute,ugrave,ucircumflex,udieresis,dagger,degree,cent,sterling,section,bullet,paragraph,germandbls,registered,copyright,trademark,acute,dieresis,notequal,AE,Oslash,infinity,plusminus,lessequal,greaterequal,yen,mu,partialdiff,summation,product,pi,integral,ordfeminine,ordmasculine,Omega,ae,oslash,questiondown,exclamdown,logicalnot,radical,florin,approxequal,Delta,guillemotleft,guillemotright,ellipsis,nonbreakingspace,Agrave,Atilde,Otilde,OE,oe,endash,emdash,quotedblleft,quotedblright,quoteleft,quoteright,divide,lozenge,ydieresis,Ydieresis,fraction,currency,guilsinglleft,guilsinglright,fi,fl,daggerdbl,periodcentered,quotesinglbase,quotedblbase,perthousand,Acircumflex,Ecircumflex,Aacute,Edieresis,Egrave,Iacute,Icircumflex,Idieresis,Igrave,Oacute,Ocircumflex,apple,Ograve,Uacute,Ucircumflex,Ugrave,dotlessi,circumflex,tilde,macron,breve,dotaccent,ring,cedilla,hungarumlaut,ogonek,caron,Lslash,lslash,Scaron,scaron,Zcaron,zcaron,brokenbar,Eth,eth,Yacute,yacute,Thorn,thorn,minus,multiply,onesuperior,twosuperior,threesuperior,onehalf,onequarter,threequarters,franc,Gbreve,gbreve,Idotaccent,Scedilla,scedilla,Cacute,cacute,Ccaron,ccaron,dcroat`.split(`,`);function ol(e){this.font=e}ol.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),n=this.font.glyphs;if(n){for(var r=0;r<n.length;r+=1)for(var i=n.get(r),a=0;a<i.unicodes.length;a+=1)if(i.unicodes[a]===t)return r}return null};function sl(e){this.cmap=e}sl.prototype.charToGlyphIndex=function(e){return this.cmap.glyphIndexMap[e.codePointAt(0)]||0};function cl(e,t){this.encoding=e,this.charset=t}cl.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),n=this.encoding[t];return this.charset.indexOf(n)};function ll(e){switch(e.version){case 1:this.names=al.slice();break;case 2:this.names=Array(e.numberOfGlyphs);for(var t=0;t<e.numberOfGlyphs;t++)e.glyphNameIndex[t]<al.length?this.names[t]=al[e.glyphNameIndex[t]]:this.names[t]=e.names[e.glyphNameIndex[t]-al.length];break;case 2.5:this.names=Array(e.numberOfGlyphs);for(var n=0;n<e.numberOfGlyphs;n++)this.names[n]=al[n+e.glyphNameIndex[n]];break;case 3:this.names=[];break;default:this.names=[]}}ll.prototype.nameToGlyphIndex=function(e){return this.names.indexOf(e)},ll.prototype.glyphIndexToName=function(e){return this.names[e]};function ul(e){for(var t,n=e.tables.cmap.glyphIndexMap,r=Object.keys(n),i=0;i<r.length;i+=1){var a=r[i],o=n[a];t=e.glyphs.get(o),t.addUnicode(parseInt(a))}for(var s=0;s<e.glyphs.length;s+=1)t=e.glyphs.get(s),e.cffEncoding?e.isCIDFont?t.name=`gid`+s:t.name=e.cffEncoding.charset[s]:e.glyphNames.names&&(t.name=e.glyphNames.glyphIndexToName(s))}function dl(e){e._IndexToUnicodeMap={};for(var t=e.tables.cmap.glyphIndexMap,n=Object.keys(t),r=0;r<n.length;r+=1){var i=n[r],a=t[i];e._IndexToUnicodeMap[a]===void 0?e._IndexToUnicodeMap[a]={unicodes:[parseInt(i)]}:e._IndexToUnicodeMap[a].unicodes.push(parseInt(i))}}function fl(e,t){t.lowMemory?dl(e):ul(e)}function pl(e,t,n,r,i){e.beginPath(),e.moveTo(t,n),e.lineTo(r,i),e.stroke()}var ml={line:pl};function hl(e,t){var n=t||new mc;return{configurable:!0,get:function(){return typeof n==`function`&&(n=n()),n},set:function(e){n=e}}}function gl(e){this.bindConstructorValues(e)}gl.prototype.bindConstructorValues=function(e){this.index=e.index||0,this.name=e.name||null,this.unicode=e.unicode||void 0,this.unicodes=e.unicodes||e.unicode!==void 0?[e.unicode]:[],`xMin`in e&&(this.xMin=e.xMin),`yMin`in e&&(this.yMin=e.yMin),`xMax`in e&&(this.xMax=e.xMax),`yMax`in e&&(this.yMax=e.yMax),`advanceWidth`in e&&(this.advanceWidth=e.advanceWidth),Object.defineProperty(this,"path",hl(this,e.path))},gl.prototype.addUnicode=function(e){this.unicodes.length===0&&(this.unicode=e),this.unicodes.push(e)},gl.prototype.getBoundingBox=function(){return this.path.getBoundingBox()},gl.prototype.getPath=function(e,t,n,r,i){e=e===void 0?0:e,t=t===void 0?0:t,n=n===void 0?72:n;var a,o;r||={};var s=r.xScale,c=r.yScale;if(r.hinting&&i&&i.hinting&&(o=this.path&&i.hinting.exec(this,n)),o)a=i.hinting.getCommands(o),e=Math.round(e),t=Math.round(t),s=c=1;else{a=this.path.commands;var l=1/(this.path.unitsPerEm||1e3)*n;s===void 0&&(s=l),c===void 0&&(c=l)}for(var u=new mc,d=0;d<a.length;d+=1){var f=a[d];f.type===`M`?u.moveTo(e+f.x*s,t+-f.y*c):f.type===`L`?u.lineTo(e+f.x*s,t+-f.y*c):f.type===`Q`?u.quadraticCurveTo(e+f.x1*s,t+-f.y1*c,e+f.x*s,t+-f.y*c):f.type===`C`?u.curveTo(e+f.x1*s,t+-f.y1*c,e+f.x2*s,t+-f.y2*c,e+f.x*s,t+-f.y*c):f.type===`Z`&&u.closePath()}return u},gl.prototype.getContours=function(){if(this.points===void 0)return[];for(var e=[],t=[],n=0;n<this.points.length;n+=1){var r=this.points[n];t.push(r),r.lastPointOfContour&&(e.push(t),t=[])}return q.argument(t.length===0,`There are still points left in the current contour.`),e},gl.prototype.getMetrics=function(){for(var e=this.path.commands,t=[],n=[],r=0;r<e.length;r+=1){var i=e[r];i.type!==`Z`&&(t.push(i.x),n.push(i.y)),(i.type===`Q`||i.type===`C`)&&(t.push(i.x1),n.push(i.y1)),i.type===`C`&&(t.push(i.x2),n.push(i.y2))}var a={xMin:Math.min.apply(null,t),yMin:Math.min.apply(null,n),xMax:Math.max.apply(null,t),yMax:Math.max.apply(null,n),leftSideBearing:this.leftSideBearing};return isFinite(a.xMin)||(a.xMin=0),isFinite(a.xMax)||(a.xMax=this.advanceWidth),isFinite(a.yMin)||(a.yMin=0),isFinite(a.yMax)||(a.yMax=0),a.rightSideBearing=this.advanceWidth-a.leftSideBearing-(a.xMax-a.xMin),a},gl.prototype.draw=function(e,t,n,r,i){this.getPath(t,n,r,i).draw(e)},gl.prototype.drawPoints=function(e,t,n,r){function i(t,n,r,i){e.beginPath();for(var a=0;a<t.length;a+=1)e.moveTo(n+t[a].x*i,r+t[a].y*i),e.arc(n+t[a].x*i,r+t[a].y*i,2,0,Math.PI*2,!1);e.closePath(),e.fill()}t=t===void 0?0:t,n=n===void 0?0:n,r=r===void 0?24:r;for(var a=1/this.path.unitsPerEm*r,o=[],s=[],c=this.path,l=0;l<c.commands.length;l+=1){var u=c.commands[l];u.x!==void 0&&o.push({x:u.x,y:-u.y}),u.x1!==void 0&&s.push({x:u.x1,y:-u.y1}),u.x2!==void 0&&s.push({x:u.x2,y:-u.y2})}e.fillStyle=`blue`,i(o,t,n,a),e.fillStyle=`red`,i(s,t,n,a)},gl.prototype.drawMetrics=function(e,t,n,r){var i;t=t===void 0?0:t,n=n===void 0?0:n,r=r===void 0?24:r,i=1/this.path.unitsPerEm*r,e.lineWidth=1,e.strokeStyle=`black`,ml.line(e,t,-1e4,t,1e4),ml.line(e,-1e4,n,1e4,n);var a=this.xMin||0,o=this.yMin||0,s=this.xMax||0,c=this.yMax||0,l=this.advanceWidth||0;e.strokeStyle=`blue`,ml.line(e,t+a*i,-1e4,t+a*i,1e4),ml.line(e,t+s*i,-1e4,t+s*i,1e4),ml.line(e,-1e4,n+-o*i,1e4,n+-o*i),ml.line(e,-1e4,n+-c*i,1e4,n+-c*i),e.strokeStyle=`green`,ml.line(e,t+l*i,-1e4,t+l*i,1e4)};function _l(e,t,n){Object.defineProperty(e,t,{get:function(){return e.path,e[n]},set:function(t){e[n]=t},enumerable:!0,configurable:!0})}function vl(e,t){if(this.font=e,this.glyphs={},Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];r.path.unitsPerEm=e.unitsPerEm,this.glyphs[n]=r}this.length=t&&t.length||0}vl.prototype.get=function(e){if(this.glyphs[e]===void 0){this.font._push(e),typeof this.glyphs[e]==`function`&&(this.glyphs[e]=this.glyphs[e]());var t=this.glyphs[e],n=this.font._IndexToUnicodeMap[e];if(n)for(var r=0;r<n.unicodes.length;r++)t.addUnicode(n.unicodes[r]);this.font.cffEncoding?t.name=this.font.isCIDFont?`gid`+e:this.font.cffEncoding.charset[e]:this.font.glyphNames.names&&(t.name=this.font.glyphNames.glyphIndexToName(e)),this.glyphs[e].advanceWidth=this.font._hmtxTableData[e].advanceWidth,this.glyphs[e].leftSideBearing=this.font._hmtxTableData[e].leftSideBearing}else typeof this.glyphs[e]==`function`&&(this.glyphs[e]=this.glyphs[e]());return this.glyphs[e]},vl.prototype.push=function(e,t){this.glyphs[e]=t,this.length++};function yl(e,t){return new gl({index:t,font:e})}function bl(e,t,n,r,i,a){return function(){var o=new gl({index:t,font:e});return o.path=function(){n(o,r,i);var t=a(e.glyphs,o);return t.unitsPerEm=e.unitsPerEm,t},_l(o,`xMin`,`_xMin`),_l(o,`xMax`,`_xMax`),_l(o,`yMin`,`_yMin`),_l(o,`yMax`,`_yMax`),o}}function xl(e,t,n,r){return function(){var i=new gl({index:t,font:e});return i.path=function(){var t=n(e,i,r);return t.unitsPerEm=e.unitsPerEm,t},i}}var Sl={GlyphSet:vl,glyphLoader:yl,ttfGlyphLoader:bl,cffGlyphLoader:xl};function Cl(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n+=1)if(!Cl(e[n],t[n]))return!1;return!0}return!1}function wl(e){return e.length<1240?107:e.length<33900?1131:32768}function Tl(e,t,n){var r=[],i=[],a=Q.getCard16(e,t),o,s;if(a!==0){var c=Q.getByte(e,t+2);o=t+(a+1)*c+2;for(var l=t+3,u=0;u<a+1;u+=1)r.push(Q.getOffset(e,l,c)),l+=c;s=o+r[a]}else s=t+2;for(var d=0;d<r.length-1;d+=1){var f=Q.getBytes(e,o+r[d],o+r[d+1]);n&&(f=n(f)),i.push(f)}return{objects:i,startOffset:t,endOffset:s}}function El(e,t){var n=[],r=Q.getCard16(e,t),i,a;if(r!==0){var o=Q.getByte(e,t+2);i=t+(r+1)*o+2;for(var s=t+3,c=0;c<r+1;c+=1)n.push(Q.getOffset(e,s,o)),s+=o;a=i+n[r]}else a=t+2;return{offsets:n,startOffset:t,endOffset:a}}function Dl(e,t,n,r,i){var a=Q.getCard16(n,r),o=0;if(a!==0){var s=Q.getByte(n,r+2);o=r+(a+1)*s+2}var c=Q.getBytes(n,o+t[e],o+t[e+1]);return i&&(c=i(c)),c}function Ol(e){for(var t=``,n=15,r=[`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`,`E`,`E-`,null,`-`];;){var i=e.parseByte(),a=i>>4,o=i&15;if(a===n||(t+=r[a],o===n))break;t+=r[o]}return parseFloat(t)}function kl(e,t){var n,r,i,a;if(t===28)return n=e.parseByte(),r=e.parseByte(),n<<8|r;if(t===29)return n=e.parseByte(),r=e.parseByte(),i=e.parseByte(),a=e.parseByte(),n<<24|r<<16|i<<8|a;if(t===30)return Ol(e);if(t>=32&&t<=246)return t-139;if(t>=247&&t<=250)return n=e.parseByte(),(t-247)*256+n+108;if(t>=251&&t<=254)return n=e.parseByte(),-(t-251)*256-n-108;throw Error(`Invalid b0 `+t)}function Al(e){for(var t={},n=0;n<e.length;n+=1){var r=e[n][0],i=e[n][1],a=void 0;if(a=i.length===1?i[0]:i,t.hasOwnProperty(r)&&!isNaN(t[r]))throw Error(`Object `+t+` already has key `+r);t[r]=a}return t}function jl(e,t,n){t=t===void 0?0:t;var r=new Q.Parser(e,t),i=[],a=[];for(n=n===void 0?e.length:n;r.relativeOffset<n;){var o=r.parseByte();o<=21?(o===12&&(o=1200+r.parseByte()),i.push([o,a]),a=[]):a.push(kl(r,o))}return Al(i)}function Ml(e,t){return t=t<=390?nl[t]:e[t-391],t}function Nl(e,t,n){for(var r={},i,a=0;a<t.length;a+=1){var o=t[a];if(Array.isArray(o.type)){var s=[];s.length=o.type.length;for(var c=0;c<o.type.length;c++)i=e[o.op]===void 0?void 0:e[o.op][c],i===void 0&&(i=o.value!==void 0&&o.value[c]!==void 0?o.value[c]:null),o.type[c]===`SID`&&(i=Ml(n,i)),s[c]=i;r[o.name]=s}else i=e[o.op],i===void 0&&(i=o.value===void 0?null:o.value),o.type===`SID`&&(i=Ml(n,i)),r[o.name]=i}return r}function Pl(e,t){var n={};return n.formatMajor=Q.getCard8(e,t),n.formatMinor=Q.getCard8(e,t+1),n.size=Q.getCard8(e,t+2),n.offsetSize=Q.getCard8(e,t+3),n.startOffset=t,n.endOffset=t+4,n}var Fl=[{name:`version`,op:0,type:`SID`},{name:`notice`,op:1,type:`SID`},{name:`copyright`,op:1200,type:`SID`},{name:`fullName`,op:2,type:`SID`},{name:`familyName`,op:3,type:`SID`},{name:`weight`,op:4,type:`SID`},{name:`isFixedPitch`,op:1201,type:`number`,value:0},{name:`italicAngle`,op:1202,type:`number`,value:0},{name:`underlinePosition`,op:1203,type:`number`,value:-100},{name:`underlineThickness`,op:1204,type:`number`,value:50},{name:`paintType`,op:1205,type:`number`,value:0},{name:`charstringType`,op:1206,type:`number`,value:2},{name:`fontMatrix`,op:1207,type:[`real`,`real`,`real`,`real`,`real`,`real`],value:[.001,0,0,.001,0,0]},{name:`uniqueId`,op:13,type:`number`},{name:`fontBBox`,op:5,type:[`number`,`number`,`number`,`number`],value:[0,0,0,0]},{name:`strokeWidth`,op:1208,type:`number`,value:0},{name:`xuid`,op:14,type:[],value:null},{name:`charset`,op:15,type:`offset`,value:0},{name:`encoding`,op:16,type:`offset`,value:0},{name:`charStrings`,op:17,type:`offset`,value:0},{name:`private`,op:18,type:[`number`,`offset`],value:[0,0]},{name:`ros`,op:1230,type:[`SID`,`SID`,`number`]},{name:`cidFontVersion`,op:1231,type:`number`,value:0},{name:`cidFontRevision`,op:1232,type:`number`,value:0},{name:`cidFontType`,op:1233,type:`number`,value:0},{name:`cidCount`,op:1234,type:`number`,value:8720},{name:`uidBase`,op:1235,type:`number`},{name:`fdArray`,op:1236,type:`offset`},{name:`fdSelect`,op:1237,type:`offset`},{name:`fontName`,op:1238,type:`SID`}],Il=[{name:`subrs`,op:19,type:`offset`,value:0},{name:`defaultWidthX`,op:20,type:`number`,value:0},{name:`nominalWidthX`,op:21,type:`number`,value:0}];function Ll(e,t){return Nl(jl(e,0,e.byteLength),Fl,t)}function Rl(e,t,n,r){return Nl(jl(e,t,n),Il,r)}function zl(e,t,n,r){for(var i=[],a=0;a<n.length;a+=1){var o=Ll(new DataView(new Uint8Array(n[a]).buffer),r);o._subrs=[],o._subrsBias=0,o._defaultWidthX=0,o._nominalWidthX=0;var s=o.private[0],c=o.private[1];if(s!==0&&c!==0){var l=Rl(e,c+t,s,r);o._defaultWidthX=l.defaultWidthX,o._nominalWidthX=l.nominalWidthX,l.subrs!==0&&(o._subrs=Tl(e,c+l.subrs+t).objects,o._subrsBias=wl(o._subrs)),o._privateDict=l}i.push(o)}return i}function Bl(e,t,n,r){var i,a,o=new Q.Parser(e,t);--n;var s=[`.notdef`],c=o.parseCard8();if(c===0)for(var l=0;l<n;l+=1)i=o.parseSID(),s.push(Ml(r,i));else if(c===1)for(;s.length<=n;){i=o.parseSID(),a=o.parseCard8();for(var u=0;u<=a;u+=1)s.push(Ml(r,i)),i+=1}else if(c===2)for(;s.length<=n;){i=o.parseSID(),a=o.parseCard16();for(var d=0;d<=a;d+=1)s.push(Ml(r,i)),i+=1}else throw Error(`Unknown charset format `+c);return s}function Vl(e,t,n){var r,i={},a=new Q.Parser(e,t),o=a.parseCard8();if(o===0)for(var s=a.parseCard8(),c=0;c<s;c+=1)r=a.parseCard8(),i[r]=c;else if(o===1){var l=a.parseCard8();r=1;for(var u=0;u<l;u+=1)for(var d=a.parseCard8(),f=a.parseCard8(),p=d;p<=d+f;p+=1)i[p]=r,r+=1}else throw Error(`Unknown encoding format `+o);return new cl(i,n)}function Hl(e,t,n){var r,i,a,o,s=new mc,c=[],l=0,u=!1,d=!1,f=0,p=0,m,h,g,_;if(e.isCIDFont){var v=e.tables.cff.topDict._fdSelect[t.index],y=e.tables.cff.topDict._fdArray[v];m=y._subrs,h=y._subrsBias,g=y._defaultWidthX,_=y._nominalWidthX}else m=e.tables.cff.topDict._subrs,h=e.tables.cff.topDict._subrsBias,g=e.tables.cff.topDict._defaultWidthX,_=e.tables.cff.topDict._nominalWidthX;var b=g;function x(e,t){d&&s.closePath(),s.moveTo(e,t),d=!0}function S(){c.length%2!=0&&!u&&(b=c.shift()+_),l+=c.length>>1,c.length=0,u=!0}function C(n){for(var g,v,y,w,T,E,D,O,k,A,j,M,N=0;N<n.length;){var P=n[N];switch(N+=1,P){case 1:S();break;case 3:S();break;case 4:c.length>1&&!u&&(b=c.shift()+_,u=!0),p+=c.pop(),x(f,p);break;case 5:for(;c.length>0;)f+=c.shift(),p+=c.shift(),s.lineTo(f,p);break;case 6:for(;c.length>0&&(f+=c.shift(),s.lineTo(f,p),c.length!==0);)p+=c.shift(),s.lineTo(f,p);break;case 7:for(;c.length>0&&(p+=c.shift(),s.lineTo(f,p),c.length!==0);)f+=c.shift(),s.lineTo(f,p);break;case 8:for(;c.length>0;)r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o+c.shift(),s.curveTo(r,i,a,o,f,p);break;case 10:T=c.pop()+h,E=m[T],E&&C(E);break;case 11:return;case 12:switch(P=n[N],N+=1,P){case 35:r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),D=a+c.shift(),O=o+c.shift(),k=D+c.shift(),A=O+c.shift(),j=k+c.shift(),M=A+c.shift(),f=j+c.shift(),p=M+c.shift(),c.shift(),s.curveTo(r,i,a,o,D,O),s.curveTo(k,A,j,M,f,p);break;case 34:r=f+c.shift(),i=p,a=r+c.shift(),o=i+c.shift(),D=a+c.shift(),O=o,k=D+c.shift(),A=o,j=k+c.shift(),M=p,f=j+c.shift(),s.curveTo(r,i,a,o,D,O),s.curveTo(k,A,j,M,f,p);break;case 36:r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),D=a+c.shift(),O=o,k=D+c.shift(),A=o,j=k+c.shift(),M=A+c.shift(),f=j+c.shift(),s.curveTo(r,i,a,o,D,O),s.curveTo(k,A,j,M,f,p);break;case 37:r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),D=a+c.shift(),O=o+c.shift(),k=D+c.shift(),A=O+c.shift(),j=k+c.shift(),M=A+c.shift(),Math.abs(j-f)>Math.abs(M-p)?f=j+c.shift():p=M+c.shift(),s.curveTo(r,i,a,o,D,O),s.curveTo(k,A,j,M,f,p);break;default:console.log(`Glyph `+t.index+`: unknown operator 1200`+P),c.length=0}break;case 14:c.length>0&&!u&&(b=c.shift()+_,u=!0),d&&=(s.closePath(),!1);break;case 18:S();break;case 19:case 20:S(),N+=l+7>>3;break;case 21:c.length>2&&!u&&(b=c.shift()+_,u=!0),p+=c.pop(),f+=c.pop(),x(f,p);break;case 22:c.length>1&&!u&&(b=c.shift()+_,u=!0),f+=c.pop(),x(f,p);break;case 23:S();break;case 24:for(;c.length>2;)r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o+c.shift(),s.curveTo(r,i,a,o,f,p);f+=c.shift(),p+=c.shift(),s.lineTo(f,p);break;case 25:for(;c.length>6;)f+=c.shift(),p+=c.shift(),s.lineTo(f,p);r=f+c.shift(),i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o+c.shift(),s.curveTo(r,i,a,o,f,p);break;case 26:for(c.length%2&&(f+=c.shift());c.length>0;)r=f,i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a,p=o+c.shift(),s.curveTo(r,i,a,o,f,p);break;case 27:for(c.length%2&&(p+=c.shift());c.length>0;)r=f+c.shift(),i=p,a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o,s.curveTo(r,i,a,o,f,p);break;case 28:g=n[N],v=n[N+1],c.push((g<<24|v<<16)>>16),N+=2;break;case 29:T=c.pop()+e.gsubrsBias,E=e.gsubrs[T],E&&C(E);break;case 30:for(;c.length>0&&(r=f,i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o+(c.length===1?c.shift():0),s.curveTo(r,i,a,o,f,p),c.length!==0);)r=f+c.shift(),i=p,a=r+c.shift(),o=i+c.shift(),p=o+c.shift(),f=a+(c.length===1?c.shift():0),s.curveTo(r,i,a,o,f,p);break;case 31:for(;c.length>0&&(r=f+c.shift(),i=p,a=r+c.shift(),o=i+c.shift(),p=o+c.shift(),f=a+(c.length===1?c.shift():0),s.curveTo(r,i,a,o,f,p),c.length!==0);)r=f,i=p+c.shift(),a=r+c.shift(),o=i+c.shift(),f=a+c.shift(),p=o+(c.length===1?c.shift():0),s.curveTo(r,i,a,o,f,p);break;default:P<32?console.log(`Glyph `+t.index+`: unknown operator `+P):P<247?c.push(P-139):P<251?(g=n[N],N+=1,c.push((P-247)*256+g+108)):P<255?(g=n[N],N+=1,c.push(-(P-251)*256-g-108)):(g=n[N],v=n[N+1],y=n[N+2],w=n[N+3],N+=4,c.push((g<<24|v<<16|y<<8|w)/65536))}}}return C(n),t.advanceWidth=b,s}function Ul(e,t,n,r){var i=[],a,o=new Q.Parser(e,t),s=o.parseCard8();if(s===0)for(var c=0;c<n;c++){if(a=o.parseCard8(),a>=r)throw Error(`CFF table CID Font FDSelect has bad FD index value `+a+` (FD count `+r+`)`);i.push(a)}else if(s===3){var l=o.parseCard16(),u=o.parseCard16();if(u!==0)throw Error(`CFF Table CID Font FDSelect format 3 range has bad initial GID `+u);for(var d,f=0;f<l;f++){if(a=o.parseCard8(),d=o.parseCard16(),a>=r)throw Error(`CFF table CID Font FDSelect has bad FD index value `+a+` (FD count `+r+`)`);if(d>n)throw Error(`CFF Table CID Font FDSelect format 3 range has bad GID `+d);for(;u<d;u++)i.push(a);u=d}if(d!==n)throw Error(`CFF Table CID Font FDSelect format 3 range has bad final GID `+d)}else throw Error(`CFF Table CID Font FDSelect table has unsupported format `+s);return i}function Wl(e,t,n,r){n.tables.cff={};var i=Tl(e,Tl(e,Pl(e,t).endOffset,Q.bytesToString).endOffset),a=Tl(e,i.endOffset,Q.bytesToString);n.gsubrs=Tl(e,a.endOffset).objects,n.gsubrsBias=wl(n.gsubrs);var o=zl(e,t,i.objects,a.objects);if(o.length!==1)throw Error(`CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = `+o.length);var s=o[0];if(n.tables.cff.topDict=s,s._privateDict&&(n.defaultWidthX=s._privateDict.defaultWidthX,n.nominalWidthX=s._privateDict.nominalWidthX),s.ros[0]!==void 0&&s.ros[1]!==void 0&&(n.isCIDFont=!0),n.isCIDFont){var c=s.fdArray,l=s.fdSelect;if(c===0||l===0)throw Error(`Font is marked as a CID font, but FDArray and/or FDSelect information is missing`);c+=t;var u=zl(e,t,Tl(e,c).objects,a.objects);s._fdArray=u,l+=t,s._fdSelect=Ul(e,l,n.numGlyphs,u.length)}var d=t+s.private[1],f=Rl(e,d,s.private[0],a.objects);n.defaultWidthX=f.defaultWidthX,n.nominalWidthX=f.nominalWidthX,f.subrs===0?(n.subrs=[],n.subrsBias=0):(n.subrs=Tl(e,d+f.subrs).objects,n.subrsBias=wl(n.subrs));var p;r.lowMemory?(p=El(e,t+s.charStrings),n.nGlyphs=p.offsets.length):(p=Tl(e,t+s.charStrings),n.nGlyphs=p.objects.length);var m=Bl(e,t+s.charset,n.nGlyphs,a.objects);if(n.cffEncoding=s.encoding===0?new cl(rl,m):s.encoding===1?new cl(il,m):Vl(e,t+s.encoding,m),n.encoding=n.encoding||n.cffEncoding,n.glyphs=new Sl.GlyphSet(n),r.lowMemory)n._push=function(r){var i=Dl(r,p.offsets,e,t+s.charStrings);n.glyphs.push(r,Sl.cffGlyphLoader(n,r,Hl,i))};else for(var h=0;h<n.nGlyphs;h+=1){var g=p.objects[h];n.glyphs.push(h,Sl.cffGlyphLoader(n,h,Hl,g))}}function Gl(e,t){var n,r=nl.indexOf(e);return r>=0&&(n=r),r=t.indexOf(e),r>=0?n=r+nl.length:(n=nl.length+t.length,t.push(e)),n}function Kl(){return new X.Record(`Header`,[{name:`major`,type:`Card8`,value:1},{name:`minor`,type:`Card8`,value:0},{name:`hdrSize`,type:`Card8`,value:4},{name:`major`,type:`Card8`,value:1}])}function ql(e){var t=new X.Record(`Name INDEX`,[{name:`names`,type:`INDEX`,value:[]}]);t.names=[];for(var n=0;n<e.length;n+=1)t.names.push({name:`name_`+n,type:`NAME`,value:e[n]});return t}function Jl(e,t,n){for(var r={},i=0;i<e.length;i+=1){var a=e[i],o=t[a.name];o!==void 0&&!Cl(o,a.value)&&(a.type===`SID`&&(o=Gl(o,n)),r[a.op]={name:a.name,type:a.type,value:o})}return r}function Yl(e,t){var n=new X.Record(`Top DICT`,[{name:`dict`,type:`DICT`,value:{}}]);return n.dict=Jl(Fl,e,t),n}function Xl(e){var t=new X.Record(`Top DICT INDEX`,[{name:`topDicts`,type:`INDEX`,value:[]}]);return t.topDicts=[{name:`topDict_0`,type:`TABLE`,value:e}],t}function Zl(e){var t=new X.Record(`String INDEX`,[{name:`strings`,type:`INDEX`,value:[]}]);t.strings=[];for(var n=0;n<e.length;n+=1)t.strings.push({name:`string_`+n,type:`STRING`,value:e[n]});return t}function Ql(){return new X.Record(`Global Subr INDEX`,[{name:`subrs`,type:`INDEX`,value:[]}])}function $l(e,t){for(var n=new X.Record(`Charsets`,[{name:`format`,type:`Card8`,value:0}]),r=0;r<e.length;r+=1){var i=e[r],a=Gl(i,t);n.fields.push({name:`glyph_`+r,type:`SID`,value:a})}return n}function eu(e){var t=[],n=e.path;t.push({name:`width`,type:`NUMBER`,value:e.advanceWidth});for(var r=0,i=0,a=0;a<n.commands.length;a+=1){var o=void 0,s=void 0,c=n.commands[a];if(c.type===`Q`){var l=1/3,u=2/3;c={type:`C`,x:c.x,y:c.y,x1:Math.round(l*r+u*c.x1),y1:Math.round(l*i+u*c.y1),x2:Math.round(l*c.x+u*c.x1),y2:Math.round(l*c.y+u*c.y1)}}if(c.type===`M`)o=Math.round(c.x-r),s=Math.round(c.y-i),t.push({name:`dx`,type:`NUMBER`,value:o}),t.push({name:`dy`,type:`NUMBER`,value:s}),t.push({name:`rmoveto`,type:`OP`,value:21}),r=Math.round(c.x),i=Math.round(c.y);else if(c.type===`L`)o=Math.round(c.x-r),s=Math.round(c.y-i),t.push({name:`dx`,type:`NUMBER`,value:o}),t.push({name:`dy`,type:`NUMBER`,value:s}),t.push({name:`rlineto`,type:`OP`,value:5}),r=Math.round(c.x),i=Math.round(c.y);else if(c.type===`C`){var d=Math.round(c.x1-r),f=Math.round(c.y1-i),p=Math.round(c.x2-c.x1),m=Math.round(c.y2-c.y1);o=Math.round(c.x-c.x2),s=Math.round(c.y-c.y2),t.push({name:`dx1`,type:`NUMBER`,value:d}),t.push({name:`dy1`,type:`NUMBER`,value:f}),t.push({name:`dx2`,type:`NUMBER`,value:p}),t.push({name:`dy2`,type:`NUMBER`,value:m}),t.push({name:`dx`,type:`NUMBER`,value:o}),t.push({name:`dy`,type:`NUMBER`,value:s}),t.push({name:`rrcurveto`,type:`OP`,value:8}),r=Math.round(c.x),i=Math.round(c.y)}}return t.push({name:`endchar`,type:`OP`,value:14}),t}function tu(e){for(var t=new X.Record(`CharStrings INDEX`,[{name:`charStrings`,type:`INDEX`,value:[]}]),n=0;n<e.length;n+=1){var r=e.get(n),i=eu(r);t.charStrings.push({name:r.name,type:`CHARSTRING`,value:i})}return t}function nu(e,t){var n=new X.Record(`Private DICT`,[{name:`dict`,type:`DICT`,value:{}}]);return n.dict=Jl(Il,e,t),n}function ru(e,t){for(var n=new X.Table(`CFF `,[{name:`header`,type:`RECORD`},{name:`nameIndex`,type:`RECORD`},{name:`topDictIndex`,type:`RECORD`},{name:`stringIndex`,type:`RECORD`},{name:`globalSubrIndex`,type:`RECORD`},{name:`charsets`,type:`RECORD`},{name:`charStringsIndex`,type:`RECORD`},{name:`privateDict`,type:`RECORD`}]),r=1/t.unitsPerEm,i={version:t.version,fullName:t.fullName,familyName:t.familyName,weight:t.weightName,fontBBox:t.fontBBox||[0,0,0,0],fontMatrix:[r,0,0,r,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},a={},o=[],s,c=1;c<e.length;c+=1)s=e.get(c),o.push(s.name);var l=[];n.header=Kl(),n.nameIndex=ql([t.postScriptName]);var u=Yl(i,l);return n.topDictIndex=Xl(u),n.globalSubrIndex=Ql(),n.charsets=$l(o,l),n.charStringsIndex=tu(e),n.privateDict=nu(a,l),n.stringIndex=Zl(l),i.charset=n.header.sizeOf()+n.nameIndex.sizeOf()+n.topDictIndex.sizeOf()+n.stringIndex.sizeOf()+n.globalSubrIndex.sizeOf(),i.encoding=0,i.charStrings=i.charset+n.charsets.sizeOf(),i.private[1]=i.charStrings+n.charStringsIndex.sizeOf(),u=Yl(i,l),n.topDictIndex=Xl(u),n}var iu={parse:Wl,make:ru};function au(e,t){var n={},r=new Q.Parser(e,t);return n.version=r.parseVersion(),n.fontRevision=Math.round(r.parseFixed()*1e3)/1e3,n.checkSumAdjustment=r.parseULong(),n.magicNumber=r.parseULong(),q.argument(n.magicNumber===1594834165,`Font header has wrong magic number.`),n.flags=r.parseUShort(),n.unitsPerEm=r.parseUShort(),n.created=r.parseLongDateTime(),n.modified=r.parseLongDateTime(),n.xMin=r.parseShort(),n.yMin=r.parseShort(),n.xMax=r.parseShort(),n.yMax=r.parseShort(),n.macStyle=r.parseUShort(),n.lowestRecPPEM=r.parseUShort(),n.fontDirectionHint=r.parseShort(),n.indexToLocFormat=r.parseShort(),n.glyphDataFormat=r.parseShort(),n}function ou(e){var t=Math.round((/* @__PURE__ */ new Date()).getTime()/1e3)+2082844800,n=t;return e.createdTimestamp&&(n=e.createdTimestamp+2082844800),new X.Table(`head`,[{name:`version`,type:`FIXED`,value:65536},{name:`fontRevision`,type:`FIXED`,value:65536},{name:`checkSumAdjustment`,type:`ULONG`,value:0},{name:`magicNumber`,type:`ULONG`,value:1594834165},{name:`flags`,type:`USHORT`,value:0},{name:`unitsPerEm`,type:`USHORT`,value:1e3},{name:`created`,type:`LONGDATETIME`,value:n},{name:`modified`,type:`LONGDATETIME`,value:t},{name:`xMin`,type:`SHORT`,value:0},{name:`yMin`,type:`SHORT`,value:0},{name:`xMax`,type:`SHORT`,value:0},{name:`yMax`,type:`SHORT`,value:0},{name:`macStyle`,type:`USHORT`,value:0},{name:`lowestRecPPEM`,type:`USHORT`,value:0},{name:`fontDirectionHint`,type:`SHORT`,value:2},{name:`indexToLocFormat`,type:`SHORT`,value:0},{name:`glyphDataFormat`,type:`SHORT`,value:0}],e)}var su={parse:au,make:ou};function cu(e,t){var n={},r=new Q.Parser(e,t);return n.version=r.parseVersion(),n.ascender=r.parseShort(),n.descender=r.parseShort(),n.lineGap=r.parseShort(),n.advanceWidthMax=r.parseUShort(),n.minLeftSideBearing=r.parseShort(),n.minRightSideBearing=r.parseShort(),n.xMaxExtent=r.parseShort(),n.caretSlopeRise=r.parseShort(),n.caretSlopeRun=r.parseShort(),n.caretOffset=r.parseShort(),r.relativeOffset+=8,n.metricDataFormat=r.parseShort(),n.numberOfHMetrics=r.parseUShort(),n}function lu(e){return new X.Table(`hhea`,[{name:`version`,type:`FIXED`,value:65536},{name:`ascender`,type:`FWORD`,value:0},{name:`descender`,type:`FWORD`,value:0},{name:`lineGap`,type:`FWORD`,value:0},{name:`advanceWidthMax`,type:`UFWORD`,value:0},{name:`minLeftSideBearing`,type:`FWORD`,value:0},{name:`minRightSideBearing`,type:`FWORD`,value:0},{name:`xMaxExtent`,type:`FWORD`,value:0},{name:`caretSlopeRise`,type:`SHORT`,value:1},{name:`caretSlopeRun`,type:`SHORT`,value:0},{name:`caretOffset`,type:`SHORT`,value:0},{name:`reserved1`,type:`SHORT`,value:0},{name:`reserved2`,type:`SHORT`,value:0},{name:`reserved3`,type:`SHORT`,value:0},{name:`reserved4`,type:`SHORT`,value:0},{name:`metricDataFormat`,type:`SHORT`,value:0},{name:`numberOfHMetrics`,type:`USHORT`,value:0}],e)}var uu={parse:cu,make:lu};function du(e,t,n,r,i){for(var a,o,s=new Q.Parser(e,t),c=0;c<r;c+=1){c<n&&(a=s.parseUShort(),o=s.parseShort());var l=i.get(c);l.advanceWidth=a,l.leftSideBearing=o}}function fu(e,t,n,r,i){e._hmtxTableData={};for(var a,o,s=new Q.Parser(t,n),c=0;c<i;c+=1)c<r&&(a=s.parseUShort(),o=s.parseShort()),e._hmtxTableData[c]={advanceWidth:a,leftSideBearing:o}}function pu(e,t,n,r,i,a,o){o.lowMemory?fu(e,t,n,r,i):du(t,n,r,i,a)}function mu(e){for(var t=new X.Table(`hmtx`,[]),n=0;n<e.length;n+=1){var r=e.get(n),i=r.advanceWidth||0,a=r.leftSideBearing||0;t.fields.push({name:`advanceWidth_`+n,type:`USHORT`,value:i}),t.fields.push({name:`leftSideBearing_`+n,type:`SHORT`,value:a})}return t}var hu={parse:pu,make:mu};function gu(e){for(var t=new X.Table(`ltag`,[{name:`version`,type:`ULONG`,value:1},{name:`flags`,type:`ULONG`,value:0},{name:`numTags`,type:`ULONG`,value:e.length}]),n=``,r=12+e.length*4,i=0;i<e.length;++i){var a=n.indexOf(e[i]);a<0&&(a=n.length,n+=e[i]),t.fields.push({name:`offset `+i,type:`USHORT`,value:r+a}),t.fields.push({name:`length `+i,type:`USHORT`,value:e[i].length})}return t.fields.push({name:`stringPool`,type:`CHARARRAY`,value:n}),t}function _u(e,t){var n=new Q.Parser(e,t),r=n.parseULong();q.argument(r===1,`Unsupported ltag table version.`),n.skip(`uLong`,1);for(var i=n.parseULong(),a=[],o=0;o<i;o++){for(var s=``,c=t+n.parseUShort(),l=n.parseUShort(),u=c;u<c+l;++u)s+=String.fromCharCode(e.getInt8(u));a.push(s)}return a}var vu={make:gu,parse:_u};function yu(e,t){var n={},r=new Q.Parser(e,t);return n.version=r.parseVersion(),n.numGlyphs=r.parseUShort(),n.version===1&&(n.maxPoints=r.parseUShort(),n.maxContours=r.parseUShort(),n.maxCompositePoints=r.parseUShort(),n.maxCompositeContours=r.parseUShort(),n.maxZones=r.parseUShort(),n.maxTwilightPoints=r.parseUShort(),n.maxStorage=r.parseUShort(),n.maxFunctionDefs=r.parseUShort(),n.maxInstructionDefs=r.parseUShort(),n.maxStackElements=r.parseUShort(),n.maxSizeOfInstructions=r.parseUShort(),n.maxComponentElements=r.parseUShort(),n.maxComponentDepth=r.parseUShort()),n}function bu(e){return new X.Table(`maxp`,[{name:`version`,type:`FIXED`,value:20480},{name:`numGlyphs`,type:`USHORT`,value:e}])}var xu={parse:yu,make:bu},Su=[`copyright`,`fontFamily`,`fontSubfamily`,`uniqueID`,`fullName`,`version`,`postScriptName`,`trademark`,`manufacturer`,`designer`,`description`,`manufacturerURL`,`designerURL`,`license`,`licenseURL`,`reserved`,`preferredFamily`,`preferredSubfamily`,`compatibleFullName`,`sampleText`,`postScriptFindFontName`,`wwsFamily`,`wwsSubfamily`],Cu={0:`en`,1:`fr`,2:`de`,3:`it`,4:`nl`,5:`sv`,6:`es`,7:`da`,8:`pt`,9:`no`,10:`he`,11:`ja`,12:`ar`,13:`fi`,14:`el`,15:`is`,16:`mt`,17:`tr`,18:`hr`,19:`zh-Hant`,20:`ur`,21:`hi`,22:`th`,23:`ko`,24:`lt`,25:`pl`,26:`hu`,27:`es`,28:`lv`,29:`se`,30:`fo`,31:`fa`,32:`ru`,33:`zh`,34:`nl-BE`,35:`ga`,36:`sq`,37:`ro`,38:`cz`,39:`sk`,40:`si`,41:`yi`,42:`sr`,43:`mk`,44:`bg`,45:`uk`,46:`be`,47:`uz`,48:`kk`,49:`az-Cyrl`,50:`az-Arab`,51:`hy`,52:`ka`,53:`mo`,54:`ky`,55:`tg`,56:`tk`,57:`mn-CN`,58:`mn`,59:`ps`,60:`ks`,61:`ku`,62:`sd`,63:`bo`,64:`ne`,65:`sa`,66:`mr`,67:`bn`,68:`as`,69:`gu`,70:`pa`,71:`or`,72:`ml`,73:`kn`,74:`ta`,75:`te`,76:`si`,77:`my`,78:`km`,79:`lo`,80:`vi`,81:`id`,82:`tl`,83:`ms`,84:`ms-Arab`,85:`am`,86:`ti`,87:`om`,88:`so`,89:`sw`,90:`rw`,91:`rn`,92:`ny`,93:`mg`,94:`eo`,128:`cy`,129:`eu`,130:`ca`,131:`la`,132:`qu`,133:`gn`,134:`ay`,135:`tt`,136:`ug`,137:`dz`,138:`jv`,139:`su`,140:`gl`,141:`af`,142:`br`,143:`iu`,144:`gd`,145:`gv`,146:`ga`,147:`to`,148:`el-polyton`,149:`kl`,150:`az`,151:`nn`},wu={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},Tu={1078:`af`,1052:`sq`,1156:`gsw`,1118:`am`,5121:`ar-DZ`,15361:`ar-BH`,3073:`ar`,2049:`ar-IQ`,11265:`ar-JO`,13313:`ar-KW`,12289:`ar-LB`,4097:`ar-LY`,6145:`ary`,8193:`ar-OM`,16385:`ar-QA`,1025:`ar-SA`,10241:`ar-SY`,7169:`aeb`,14337:`ar-AE`,9217:`ar-YE`,1067:`hy`,1101:`as`,2092:`az-Cyrl`,1068:`az`,1133:`ba`,1069:`eu`,1059:`be`,2117:`bn`,1093:`bn-IN`,8218:`bs-Cyrl`,5146:`bs`,1150:`br`,1026:`bg`,1027:`ca`,3076:`zh-HK`,5124:`zh-MO`,2052:`zh`,4100:`zh-SG`,1028:`zh-TW`,1155:`co`,1050:`hr`,4122:`hr-BA`,1029:`cs`,1030:`da`,1164:`prs`,1125:`dv`,2067:`nl-BE`,1043:`nl`,3081:`en-AU`,10249:`en-BZ`,4105:`en-CA`,9225:`en-029`,16393:`en-IN`,6153:`en-IE`,8201:`en-JM`,17417:`en-MY`,5129:`en-NZ`,13321:`en-PH`,18441:`en-SG`,7177:`en-ZA`,11273:`en-TT`,2057:`en-GB`,1033:`en`,12297:`en-ZW`,1061:`et`,1080:`fo`,1124:`fil`,1035:`fi`,2060:`fr-BE`,3084:`fr-CA`,1036:`fr`,5132:`fr-LU`,6156:`fr-MC`,4108:`fr-CH`,1122:`fy`,1110:`gl`,1079:`ka`,3079:`de-AT`,1031:`de`,5127:`de-LI`,4103:`de-LU`,2055:`de-CH`,1032:`el`,1135:`kl`,1095:`gu`,1128:`ha`,1037:`he`,1081:`hi`,1038:`hu`,1039:`is`,1136:`ig`,1057:`id`,1117:`iu`,2141:`iu-Latn`,2108:`ga`,1076:`xh`,1077:`zu`,1040:`it`,2064:`it-CH`,1041:`ja`,1099:`kn`,1087:`kk`,1107:`km`,1158:`quc`,1159:`rw`,1089:`sw`,1111:`kok`,1042:`ko`,1088:`ky`,1108:`lo`,1062:`lv`,1063:`lt`,2094:`dsb`,1134:`lb`,1071:`mk`,2110:`ms-BN`,1086:`ms`,1100:`ml`,1082:`mt`,1153:`mi`,1146:`arn`,1102:`mr`,1148:`moh`,1104:`mn`,2128:`mn-CN`,1121:`ne`,1044:`nb`,2068:`nn`,1154:`oc`,1096:`or`,1123:`ps`,1045:`pl`,1046:`pt`,2070:`pt-PT`,1094:`pa`,1131:`qu-BO`,2155:`qu-EC`,3179:`qu`,1048:`ro`,1047:`rm`,1049:`ru`,9275:`smn`,4155:`smj-NO`,5179:`smj`,3131:`se-FI`,1083:`se`,2107:`se-SE`,8251:`sms`,6203:`sma-NO`,7227:`sms`,1103:`sa`,7194:`sr-Cyrl-BA`,3098:`sr`,6170:`sr-Latn-BA`,2074:`sr-Latn`,1132:`nso`,1074:`tn`,1115:`si`,1051:`sk`,1060:`sl`,11274:`es-AR`,16394:`es-BO`,13322:`es-CL`,9226:`es-CO`,5130:`es-CR`,7178:`es-DO`,12298:`es-EC`,17418:`es-SV`,4106:`es-GT`,18442:`es-HN`,2058:`es-MX`,19466:`es-NI`,6154:`es-PA`,15370:`es-PY`,10250:`es-PE`,20490:`es-PR`,3082:`es`,1034:`es`,21514:`es-US`,14346:`es-UY`,8202:`es-VE`,2077:`sv-FI`,1053:`sv`,1114:`syr`,1064:`tg`,2143:`tzm`,1097:`ta`,1092:`tt`,1098:`te`,1054:`th`,1105:`bo`,1055:`tr`,1090:`tk`,1152:`ug`,1058:`uk`,1070:`hsb`,1056:`ur`,2115:`uz-Cyrl`,1091:`uz`,1066:`vi`,1106:`cy`,1160:`wo`,1157:`sah`,1144:`ii`,1130:`yo`};function Eu(e,t,n){switch(e){case 0:if(t===65535)return`und`;if(n)return n[t];break;case 1:return Cu[t];case 3:return Tu[t]}}var Du=`utf-16`,Ou={0:`macintosh`,1:`x-mac-japanese`,2:`x-mac-chinesetrad`,3:`x-mac-korean`,6:`x-mac-greek`,7:`x-mac-cyrillic`,9:`x-mac-devanagai`,10:`x-mac-gurmukhi`,11:`x-mac-gujarati`,12:`x-mac-oriya`,13:`x-mac-bengali`,14:`x-mac-tamil`,15:`x-mac-telugu`,16:`x-mac-kannada`,17:`x-mac-malayalam`,18:`x-mac-sinhalese`,19:`x-mac-burmese`,20:`x-mac-khmer`,21:`x-mac-thai`,22:`x-mac-lao`,23:`x-mac-georgian`,24:`x-mac-armenian`,25:`x-mac-chinesesimp`,26:`x-mac-tibetan`,27:`x-mac-mongolian`,28:`x-mac-ethiopic`,29:`x-mac-ce`,30:`x-mac-vietnamese`,31:`x-mac-extarabic`},ku={15:`x-mac-icelandic`,17:`x-mac-turkish`,18:`x-mac-croatian`,24:`x-mac-ce`,25:`x-mac-ce`,26:`x-mac-ce`,27:`x-mac-ce`,28:`x-mac-ce`,30:`x-mac-icelandic`,37:`x-mac-romanian`,38:`x-mac-ce`,39:`x-mac-ce`,40:`x-mac-ce`,143:`x-mac-inuit`,146:`x-mac-gaelic`};function Au(e,t,n){switch(e){case 0:return Du;case 1:return ku[n]||Ou[t];case 3:if(t===1||t===10)return Du}}function ju(e,t,n){for(var r={},i=new Q.Parser(e,t),a=i.parseUShort(),o=i.parseUShort(),s=i.offset+i.parseUShort(),c=0;c<o;c++){var l=i.parseUShort(),u=i.parseUShort(),d=i.parseUShort(),f=i.parseUShort(),p=Su[f]||f,m=i.parseUShort(),h=i.parseUShort(),g=Eu(l,d,n),_=Au(l,u,d);if(_!==void 0&&g!==void 0){var v=void 0;if(v=_===Du?yc.UTF16(e,s+h,m):yc.MACSTRING(e,s+h,m,_),v){var y=r[p];y===void 0&&(y=r[p]={}),y[g]=v}}}return a===1&&i.parseUShort(),r}function Mu(e){var t={};for(var n in e)t[e[n]]=parseInt(n);return t}function Nu(e,t,n,r,i,a){return new X.Record(`NameRecord`,[{name:`platformID`,type:`USHORT`,value:e},{name:`encodingID`,type:`USHORT`,value:t},{name:`languageID`,type:`USHORT`,value:n},{name:`nameID`,type:`USHORT`,value:r},{name:`length`,type:`USHORT`,value:i},{name:`offset`,type:`USHORT`,value:a}])}function Pu(e,t){var n=e.length,r=t.length-n+1;loop:for(var i=0;i<r;i++)for(;i<r;i++){for(var a=0;a<n;a++)if(t[i+a]!==e[a])continue loop;return i}return-1}function Fu(e,t){var n=Pu(e,t);if(n<0){n=t.length;for(var r=0,i=e.length;r<i;++r)t.push(e[r])}return n}function Iu(e,t){var n,r=[],i={},a=Mu(Su);for(var o in e){var s=a[o];if(s===void 0&&(s=o),n=parseInt(s),isNaN(n))throw Error(`Name table entry "`+o+`" does not exist, see nameTableNames for complete list.`);i[n]=e[o],r.push(n)}for(var c=Mu(Cu),l=Mu(Tu),u=[],d=[],f=0;f<r.length;f++){n=r[f];var p=i[n];for(var m in p){var h=p[m],g=1,_=c[m],v=wu[_],y=Au(g,v,_),b=J.MACSTRING(h,y);b===void 0&&(g=0,_=t.indexOf(m),_<0&&(_=t.length,t.push(m)),v=4,b=J.UTF16(h));var x=Fu(b,d);u.push(Nu(g,v,_,n,b.length,x));var S=l[m];if(S!==void 0){var C=J.UTF16(h),w=Fu(C,d);u.push(Nu(3,1,S,n,C.length,w))}}}u.sort(function(e,t){return e.platformID-t.platformID||e.encodingID-t.encodingID||e.languageID-t.languageID||e.nameID-t.nameID});for(var T=new X.Table(`name`,[{name:`format`,type:`USHORT`,value:0},{name:`count`,type:`USHORT`,value:u.length},{name:`stringOffset`,type:`USHORT`,value:6+u.length*12}]),E=0;E<u.length;E++)T.fields.push({name:`record_`+E,type:`RECORD`,value:u[E]});return T.fields.push({name:`strings`,type:`LITERAL`,value:d}),T}var Lu={parse:ju,make:Iu},Ru=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];function zu(e){for(var t=0;t<Ru.length;t+=1){var n=Ru[t];if(e>=n.begin&&e<n.end)return t}return-1}function Bu(e,t){var n={},r=new Q.Parser(e,t);n.version=r.parseUShort(),n.xAvgCharWidth=r.parseShort(),n.usWeightClass=r.parseUShort(),n.usWidthClass=r.parseUShort(),n.fsType=r.parseUShort(),n.ySubscriptXSize=r.parseShort(),n.ySubscriptYSize=r.parseShort(),n.ySubscriptXOffset=r.parseShort(),n.ySubscriptYOffset=r.parseShort(),n.ySuperscriptXSize=r.parseShort(),n.ySuperscriptYSize=r.parseShort(),n.ySuperscriptXOffset=r.parseShort(),n.ySuperscriptYOffset=r.parseShort(),n.yStrikeoutSize=r.parseShort(),n.yStrikeoutPosition=r.parseShort(),n.sFamilyClass=r.parseShort(),n.panose=[];for(var i=0;i<10;i++)n.panose[i]=r.parseByte();return n.ulUnicodeRange1=r.parseULong(),n.ulUnicodeRange2=r.parseULong(),n.ulUnicodeRange3=r.parseULong(),n.ulUnicodeRange4=r.parseULong(),n.achVendID=String.fromCharCode(r.parseByte(),r.parseByte(),r.parseByte(),r.parseByte()),n.fsSelection=r.parseUShort(),n.usFirstCharIndex=r.parseUShort(),n.usLastCharIndex=r.parseUShort(),n.sTypoAscender=r.parseShort(),n.sTypoDescender=r.parseShort(),n.sTypoLineGap=r.parseShort(),n.usWinAscent=r.parseUShort(),n.usWinDescent=r.parseUShort(),n.version>=1&&(n.ulCodePageRange1=r.parseULong(),n.ulCodePageRange2=r.parseULong()),n.version>=2&&(n.sxHeight=r.parseShort(),n.sCapHeight=r.parseShort(),n.usDefaultChar=r.parseUShort(),n.usBreakChar=r.parseUShort(),n.usMaxContent=r.parseUShort()),n}function Vu(e){return new X.Table(`OS/2`,[{name:`version`,type:`USHORT`,value:3},{name:`xAvgCharWidth`,type:`SHORT`,value:0},{name:`usWeightClass`,type:`USHORT`,value:0},{name:`usWidthClass`,type:`USHORT`,value:0},{name:`fsType`,type:`USHORT`,value:0},{name:`ySubscriptXSize`,type:`SHORT`,value:650},{name:`ySubscriptYSize`,type:`SHORT`,value:699},{name:`ySubscriptXOffset`,type:`SHORT`,value:0},{name:`ySubscriptYOffset`,type:`SHORT`,value:140},{name:`ySuperscriptXSize`,type:`SHORT`,value:650},{name:`ySuperscriptYSize`,type:`SHORT`,value:699},{name:`ySuperscriptXOffset`,type:`SHORT`,value:0},{name:`ySuperscriptYOffset`,type:`SHORT`,value:479},{name:`yStrikeoutSize`,type:`SHORT`,value:49},{name:`yStrikeoutPosition`,type:`SHORT`,value:258},{name:`sFamilyClass`,type:`SHORT`,value:0},{name:`bFamilyType`,type:`BYTE`,value:0},{name:`bSerifStyle`,type:`BYTE`,value:0},{name:`bWeight`,type:`BYTE`,value:0},{name:`bProportion`,type:`BYTE`,value:0},{name:`bContrast`,type:`BYTE`,value:0},{name:`bStrokeVariation`,type:`BYTE`,value:0},{name:`bArmStyle`,type:`BYTE`,value:0},{name:`bLetterform`,type:`BYTE`,value:0},{name:`bMidline`,type:`BYTE`,value:0},{name:`bXHeight`,type:`BYTE`,value:0},{name:`ulUnicodeRange1`,type:`ULONG`,value:0},{name:`ulUnicodeRange2`,type:`ULONG`,value:0},{name:`ulUnicodeRange3`,type:`ULONG`,value:0},{name:`ulUnicodeRange4`,type:`ULONG`,value:0},{name:`achVendID`,type:`CHARARRAY`,value:`XXXX`},{name:`fsSelection`,type:`USHORT`,value:0},{name:`usFirstCharIndex`,type:`USHORT`,value:0},{name:`usLastCharIndex`,type:`USHORT`,value:0},{name:`sTypoAscender`,type:`SHORT`,value:0},{name:`sTypoDescender`,type:`SHORT`,value:0},{name:`sTypoLineGap`,type:`SHORT`,value:0},{name:`usWinAscent`,type:`USHORT`,value:0},{name:`usWinDescent`,type:`USHORT`,value:0},{name:`ulCodePageRange1`,type:`ULONG`,value:0},{name:`ulCodePageRange2`,type:`ULONG`,value:0},{name:`sxHeight`,type:`SHORT`,value:0},{name:`sCapHeight`,type:`SHORT`,value:0},{name:`usDefaultChar`,type:`USHORT`,value:0},{name:`usBreakChar`,type:`USHORT`,value:0},{name:`usMaxContext`,type:`USHORT`,value:0}],e)}var Hu={parse:Bu,make:Vu,unicodeRanges:Ru,getUnicodeRange:zu};function Uu(e,t){var n={},r=new Q.Parser(e,t);switch(n.version=r.parseVersion(),n.italicAngle=r.parseFixed(),n.underlinePosition=r.parseShort(),n.underlineThickness=r.parseShort(),n.isFixedPitch=r.parseULong(),n.minMemType42=r.parseULong(),n.maxMemType42=r.parseULong(),n.minMemType1=r.parseULong(),n.maxMemType1=r.parseULong(),n.version){case 1:n.names=al.slice();break;case 2:n.numberOfGlyphs=r.parseUShort(),n.glyphNameIndex=Array(n.numberOfGlyphs);for(var i=0;i<n.numberOfGlyphs;i++)n.glyphNameIndex[i]=r.parseUShort();n.names=[];for(var a=0;a<n.numberOfGlyphs;a++)if(n.glyphNameIndex[a]>=al.length){var o=r.parseChar();n.names.push(r.parseString(o))}break;case 2.5:n.numberOfGlyphs=r.parseUShort(),n.offset=Array(n.numberOfGlyphs);for(var s=0;s<n.numberOfGlyphs;s++)n.offset[s]=r.parseChar()}return n}function Wu(){return new X.Table(`post`,[{name:`version`,type:`FIXED`,value:196608},{name:`italicAngle`,type:`FIXED`,value:0},{name:`underlinePosition`,type:`FWORD`,value:0},{name:`underlineThickness`,type:`FWORD`,value:0},{name:`isFixedPitch`,type:`ULONG`,value:0},{name:`minMemType42`,type:`ULONG`,value:0},{name:`maxMemType42`,type:`ULONG`,value:0},{name:`minMemType1`,type:`ULONG`,value:0},{name:`maxMemType1`,type:`ULONG`,value:0}])}var Gu={parse:Uu,make:Wu},Ku=Array(9);Ku[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer(Z.coverage),deltaGlyphId:this.parseUShort()};if(t===2)return{substFormat:2,coverage:this.parsePointer(Z.coverage),substitute:this.parseOffset16List()};q.assert(!1,`0x`+e.toString(16)+`: lookup type 1 format must be 1 or 2.`)},Ku[2]=function(){var e=this.parseUShort();return q.argument(e===1,`GSUB Multiple Substitution Subtable identifier-format must be 1`),{substFormat:e,coverage:this.parsePointer(Z.coverage),sequences:this.parseListOfLists()}},Ku[3]=function(){var e=this.parseUShort();return q.argument(e===1,`GSUB Alternate Substitution Subtable identifier-format must be 1`),{substFormat:e,coverage:this.parsePointer(Z.coverage),alternateSets:this.parseListOfLists()}},Ku[4]=function(){var e=this.parseUShort();return q.argument(e===1,`GSUB ligature table identifier-format must be 1`),{substFormat:e,coverage:this.parsePointer(Z.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var qu={sequenceIndex:Z.uShort,lookupListIndex:Z.uShort};Ku[5]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:t,coverage:this.parsePointer(Z.coverage),ruleSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{input:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,qu)}})};if(t===2)return{substFormat:t,coverage:this.parsePointer(Z.coverage),classDef:this.parsePointer(Z.classDef),classSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{classes:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,qu)}})};if(t===3){var n=this.parseUShort(),r=this.parseUShort();return{substFormat:t,coverages:this.parseList(n,Z.pointer(Z.coverage)),lookupRecords:this.parseRecordList(r,qu)}}q.assert(!1,`0x`+e.toString(16)+`: lookup type 5 format must be 1, 2 or 3.`)},Ku[6]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer(Z.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(qu)}})};if(t===2)return{substFormat:2,coverage:this.parsePointer(Z.coverage),backtrackClassDef:this.parsePointer(Z.classDef),inputClassDef:this.parsePointer(Z.classDef),lookaheadClassDef:this.parsePointer(Z.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(qu)}})};if(t===3)return{substFormat:3,backtrackCoverage:this.parseList(Z.pointer(Z.coverage)),inputCoverage:this.parseList(Z.pointer(Z.coverage)),lookaheadCoverage:this.parseList(Z.pointer(Z.coverage)),lookupRecords:this.parseRecordList(qu)};q.assert(!1,`0x`+e.toString(16)+`: lookup type 6 format must be 1, 2 or 3.`)},Ku[7]=function(){var e=this.parseUShort();q.argument(e===1,`GSUB Extension Substitution subtable identifier-format must be 1`);var t=this.parseUShort(),n=new Z(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:t,extension:Ku[t].call(n)}},Ku[8]=function(){var e=this.parseUShort();return q.argument(e===1,`GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1`),{substFormat:e,coverage:this.parsePointer(Z.coverage),backtrackCoverage:this.parseList(Z.pointer(Z.coverage)),lookaheadCoverage:this.parseList(Z.pointer(Z.coverage)),substitutes:this.parseUShortList()}};function Ju(e,t){t||=0;var n=new Z(e,t),r=n.parseVersion(1);return q.argument(r===1||r===1.1,`Unsupported GSUB table version.`),r===1?{version:r,scripts:n.parseScriptList(),features:n.parseFeatureList(),lookups:n.parseLookupList(Ku)}:{version:r,scripts:n.parseScriptList(),features:n.parseFeatureList(),lookups:n.parseLookupList(Ku),variations:n.parseFeatureVariationsList()}}var Yu=Array(9);Yu[1]=function(e){return e.substFormat===1?new X.Table(`substitutionTable`,[{name:`substFormat`,type:`USHORT`,value:1},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)},{name:`deltaGlyphID`,type:`USHORT`,value:e.deltaGlyphId}]):new X.Table(`substitutionTable`,[{name:`substFormat`,type:`USHORT`,value:2},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)}].concat(X.ushortList(`substitute`,e.substitute)))},Yu[2]=function(e){return q.assert(e.substFormat===1,`Lookup type 2 substFormat must be 1.`),new X.Table(`substitutionTable`,[{name:`substFormat`,type:`USHORT`,value:1},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)}].concat(X.tableList(`seqSet`,e.sequences,function(e){return new X.Table(`sequenceSetTable`,X.ushortList(`sequence`,e))})))},Yu[3]=function(e){return q.assert(e.substFormat===1,`Lookup type 3 substFormat must be 1.`),new X.Table(`substitutionTable`,[{name:`substFormat`,type:`USHORT`,value:1},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)}].concat(X.tableList(`altSet`,e.alternateSets,function(e){return new X.Table(`alternateSetTable`,X.ushortList(`alternate`,e))})))},Yu[4]=function(e){return q.assert(e.substFormat===1,`Lookup type 4 substFormat must be 1.`),new X.Table(`substitutionTable`,[{name:`substFormat`,type:`USHORT`,value:1},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)}].concat(X.tableList(`ligSet`,e.ligatureSets,function(e){return new X.Table(`ligatureSetTable`,X.tableList(`ligature`,e,function(e){return new X.Table(`ligatureTable`,[{name:`ligGlyph`,type:`USHORT`,value:e.ligGlyph}].concat(X.ushortList(`component`,e.components,e.components.length+1)))}))})))},Yu[6]=function(e){if(e.substFormat===1)return new X.Table(`chainContextTable`,[{name:`substFormat`,type:`USHORT`,value:e.substFormat},{name:`coverage`,type:`TABLE`,value:new X.Coverage(e.coverage)}].concat(X.tableList(`chainRuleSet`,e.chainRuleSets,function(e){return new X.Table(`chainRuleSetTable`,X.tableList(`chainRule`,e,function(e){var t=X.ushortList(`backtrackGlyph`,e.backtrack,e.backtrack.length).concat(X.ushortList(`inputGlyph`,e.input,e.input.length+1)).concat(X.ushortList(`lookaheadGlyph`,e.lookahead,e.lookahead.length)).concat(X.ushortList(`substitution`,[],e.lookupRecords.length));return e.lookupRecords.forEach(function(e,n){t=t.concat({name:`sequenceIndex`+n,type:`USHORT`,value:e.sequenceIndex}).concat({name:`lookupListIndex`+n,type:`USHORT`,value:e.lookupListIndex})}),new X.Table(`chainRuleTable`,t)}))})));if(e.substFormat===2)q.assert(!1,`lookup type 6 format 2 is not yet supported.`);else if(e.substFormat===3){var t=[{name:`substFormat`,type:`USHORT`,value:e.substFormat}];return t.push({name:`backtrackGlyphCount`,type:`USHORT`,value:e.backtrackCoverage.length}),e.backtrackCoverage.forEach(function(e,n){t.push({name:`backtrackCoverage`+n,type:`TABLE`,value:new X.Coverage(e)})}),t.push({name:`inputGlyphCount`,type:`USHORT`,value:e.inputCoverage.length}),e.inputCoverage.forEach(function(e,n){t.push({name:`inputCoverage`+n,type:`TABLE`,value:new X.Coverage(e)})}),t.push({name:`lookaheadGlyphCount`,type:`USHORT`,value:e.lookaheadCoverage.length}),e.lookaheadCoverage.forEach(function(e,n){t.push({name:`lookaheadCoverage`+n,type:`TABLE`,value:new X.Coverage(e)})}),t.push({name:`substitutionCount`,type:`USHORT`,value:e.lookupRecords.length}),e.lookupRecords.forEach(function(e,n){t=t.concat({name:`sequenceIndex`+n,type:`USHORT`,value:e.sequenceIndex}).concat({name:`lookupListIndex`+n,type:`USHORT`,value:e.lookupListIndex})}),new X.Table(`chainContextTable`,t)}q.assert(!1,`lookup type 6 format must be 1, 2 or 3.`)};function Xu(e){return new X.Table(`GSUB`,[{name:`version`,type:`ULONG`,value:65536},{name:`scripts`,type:`TABLE`,value:new X.ScriptList(e.scripts)},{name:`features`,type:`TABLE`,value:new X.FeatureList(e.features)},{name:`lookups`,type:`TABLE`,value:new X.LookupList(e.lookups,Yu)}])}var Zu={parse:Ju,make:Xu};function Qu(e,t){var n=new Q.Parser(e,t),r=n.parseULong();q.argument(r===1,`Unsupported META table version.`),n.parseULong(),n.parseULong();for(var i=n.parseULong(),a={},o=0;o<i;o++){var s=n.parseTag(),c=n.parseULong(),l=n.parseULong();a[s]=yc.UTF8(e,t+c,l)}return a}function $u(e){var t=Object.keys(e).length,n=``,r=16+t*12,i=new X.Table(`meta`,[{name:`version`,type:`ULONG`,value:1},{name:`flags`,type:`ULONG`,value:0},{name:`offset`,type:`ULONG`,value:r},{name:`numTags`,type:`ULONG`,value:t}]);for(var a in e){var o=n.length;n+=e[a],i.fields.push({name:`tag `+a,type:`TAG`,value:a}),i.fields.push({name:`offset `+a,type:`ULONG`,value:r+o}),i.fields.push({name:`length `+a,type:`ULONG`,value:e[a].length})}return i.fields.push({name:`stringPool`,type:`CHARARRAY`,value:n}),i}var ed={parse:Qu,make:$u};function td(e,t){var n=new Z(e,t),r=n.parseUShort();q.argument(r===0,`Only COLRv0 supported.`);var i=n.parseUShort(),a=n.parseOffset32(),o=n.parseOffset32(),s=n.parseUShort();n.relativeOffset=a;var c=n.parseRecordList(i,{glyphID:Z.uShort,firstLayerIndex:Z.uShort,numLayers:Z.uShort});return n.relativeOffset=o,{version:r,baseGlyphRecords:c,layerRecords:n.parseRecordList(s,{glyphID:Z.uShort,paletteIndex:Z.uShort})}}function nd(e){var t=e.version;t===void 0&&(t=0);var n=e.baseGlyphRecords;n===void 0&&(n=[]);var r=e.layerRecords;r===void 0&&(r=[]),q.argument(t===0,`Only COLRv0 supported.`);var i=14,a=i+n.length*6;return new X.Table(`COLR`,[{name:`version`,type:`USHORT`,value:t},{name:`numBaseGlyphRecords`,type:`USHORT`,value:n.length},{name:`baseGlyphRecordsOffset`,type:`ULONG`,value:i},{name:`layerRecordsOffset`,type:`ULONG`,value:a},{name:`numLayerRecords`,type:`USHORT`,value:r.length}].concat(n.map(function(e,t){return[{name:`glyphID_`+t,type:`USHORT`,value:e.glyphID},{name:`firstLayerIndex_`+t,type:`USHORT`,value:e.firstLayerIndex},{name:`numLayers_`+t,type:`USHORT`,value:e.numLayers}]}).flat(),r.map(function(e,t){return[{name:`LayerGlyphID_`+t,type:`USHORT`,value:e.glyphID},{name:`paletteIndex_`+t,type:`USHORT`,value:e.paletteIndex}]}).flat()))}var rd={parse:td,make:nd};function id(e,t){var n=new Z(e,t),r=n.parseShort(),i=n.parseShort(),a=n.parseShort(),o=n.parseShort(),s=n.parseOffset32(),c=n.parseUShortList(a);return n.relativeOffset=s,{version:r,numPaletteEntries:i,colorRecords:n.parseULongList(o),colorRecordIndices:c}}function ad(e){var t=e.version;t===void 0&&(t=0);var n=e.numPaletteEntries;n===void 0&&(n=0);var r=e.colorRecords;r===void 0&&(r=[]);var i=e.colorRecordIndices;return i===void 0&&(i=[0]),q.argument(t===0,`Only CPALv0 are supported.`),q.argument(r.length,`No colorRecords given.`),q.argument(i.length,`No colorRecordIndices given.`),q.argument(!n&&i.length==1,`Can't infer numPaletteEntries on multiple colorRecordIndices`),new X.Table(`CPAL`,[{name:`version`,type:`USHORT`,value:t},{name:`numPaletteEntries`,type:`USHORT`,value:n||r.length},{name:`numPalettes`,type:`USHORT`,value:i.length},{name:`numColorRecords`,type:`USHORT`,value:r.length},{name:`colorRecordsArrayOffset`,type:`ULONG`,value:12+2*i.length}].concat(i.map(function(e,t){return{name:`colorRecordIndices_`+t,type:`USHORT`,value:e}}),r.map(function(e,t){return{name:`colorRecords_`+t,type:`ULONG`,value:e}})))}var od={parse:id,make:ad};function sd(e){return Math.log(e)/Math.log(2)|0}function cd(e){for(;e.length%4!=0;)e.push(0);for(var t=0,n=0;n<e.length;n+=4)t+=(e[n]<<24)+(e[n+1]<<16)+(e[n+2]<<8)+e[n+3];return t%=2**32,t}function ld(e,t,n,r){return new X.Record(`Table Record`,[{name:`tag`,type:`TAG`,value:e===void 0?``:e},{name:`checkSum`,type:`ULONG`,value:t===void 0?0:t},{name:`offset`,type:`ULONG`,value:n===void 0?0:n},{name:`length`,type:`ULONG`,value:r===void 0?0:r}])}function ud(e){var t=new X.Table(`sfnt`,[{name:`version`,type:`TAG`,value:`OTTO`},{name:`numTables`,type:`USHORT`,value:0},{name:`searchRange`,type:`USHORT`,value:0},{name:`entrySelector`,type:`USHORT`,value:0},{name:`rangeShift`,type:`USHORT`,value:0}]);t.tables=e,t.numTables=e.length;var n=2**sd(t.numTables);t.searchRange=16*n,t.entrySelector=sd(n),t.rangeShift=t.numTables*16-t.searchRange;for(var r=[],i=[],a=t.sizeOf()+ld().sizeOf()*t.numTables;a%4!=0;)a+=1,i.push({name:`padding`,type:`BYTE`,value:0});for(var o=0;o<e.length;o+=1){var s=e[o];q.argument(s.tableName.length===4,`Table name`+s.tableName+` is invalid.`);var c=s.sizeOf(),l=ld(s.tableName,cd(s.encode()),a,c);for(r.push({name:l.tag+` Table Record`,type:`RECORD`,value:l}),i.push({name:s.tableName+` table`,type:`RECORD`,value:s}),a+=c,q.argument(!isNaN(a),`Something went wrong calculating the offset.`);a%4!=0;)a+=1,i.push({name:`padding`,type:`BYTE`,value:0})}return r.sort(function(e,t){return e.value.tag>t.value.tag?1:-1}),t.fields=t.fields.concat(r),t.fields=t.fields.concat(i),t}function dd(e,t,n){for(var r=0;r<t.length;r+=1){var i=e.charToGlyphIndex(t[r]);if(i>0)return e.glyphs.get(i).getMetrics()}return n}function fd(e){for(var t=0,n=0;n<e.length;n+=1)t+=e[n];return t/e.length}function pd(e){for(var t=[],n=[],r=[],i=[],a=[],o=[],s=[],c,l=0,u=0,d=0,f=0,p=0,m=0;m<e.glyphs.length;m+=1){var h=e.glyphs.get(m),g=h.unicode|0;if(isNaN(h.advanceWidth))throw Error(`Glyph `+h.name+` (`+m+`): advanceWidth is not a number.`);(c>g||c===void 0)&&g>0&&(c=g),l<g&&(l=g);var _=Hu.getUnicodeRange(g);if(_<32)u|=1<<_;else if(_<64)d|=1<<_-32;else if(_<96)f|=1<<_-64;else if(_<123)p|=1<<_-96;else throw Error(`Unicode ranges bits > 123 are reserved for internal usage`);if(h.name!==`.notdef`){var v=h.getMetrics();t.push(v.xMin),n.push(v.yMin),r.push(v.xMax),i.push(v.yMax),o.push(v.leftSideBearing),s.push(v.rightSideBearing),a.push(h.advanceWidth)}}var y={xMin:Math.min.apply(null,t),yMin:Math.min.apply(null,n),xMax:Math.max.apply(null,r),yMax:Math.max.apply(null,i),advanceWidthMax:Math.max.apply(null,a),advanceWidthAvg:fd(a),minLeftSideBearing:Math.min.apply(null,o),maxLeftSideBearing:Math.max.apply(null,o),minRightSideBearing:Math.min.apply(null,s)};y.ascender=e.ascender,y.descender=e.descender;var b=su.make({flags:3,unitsPerEm:e.unitsPerEm,xMin:y.xMin,yMin:y.yMin,xMax:y.xMax,yMax:y.yMax,lowestRecPPEM:3,createdTimestamp:e.createdTimestamp}),x=uu.make({ascender:y.ascender,descender:y.descender,advanceWidthMax:y.advanceWidthMax,minLeftSideBearing:y.minLeftSideBearing,minRightSideBearing:y.minRightSideBearing,xMaxExtent:y.maxLeftSideBearing+(y.xMax-y.xMin),numberOfHMetrics:e.glyphs.length}),S=xu.make(e.glyphs.length),C=Hu.make(Object.assign({xAvgCharWidth:Math.round(y.advanceWidthAvg),usFirstCharIndex:c,usLastCharIndex:l,ulUnicodeRange1:u,ulUnicodeRange2:d,ulUnicodeRange3:f,ulUnicodeRange4:p,sTypoAscender:y.ascender,sTypoDescender:y.descender,sTypoLineGap:0,usWinAscent:y.yMax,usWinDescent:Math.abs(y.yMin),ulCodePageRange1:1,sxHeight:dd(e,`xyvw`,{yMax:Math.round(y.ascender/2)}).yMax,sCapHeight:dd(e,`HIKLEFJMNTZBDPRAGOQSUVWXY`,y).yMax,usDefaultChar:e.hasChar(` `)?32:0,usBreakChar:e.hasChar(` `)?32:0},e.tables.os2)),w=hu.make(e.glyphs),T=tl.make(e.glyphs),E=e.getEnglishName(`fontFamily`),D=e.getEnglishName(`fontSubfamily`),O=E+` `+D,k=e.getEnglishName(`postScriptName`);k||=E.replace(/\s/g,``)+`-`+D;var A={};for(var j in e.names)A[j]=e.names[j];A.uniqueID||={en:e.getEnglishName(`manufacturer`)+`:`+O},A.postScriptName||={en:k},A.preferredFamily||=e.names.fontFamily,A.preferredSubfamily||=e.names.fontSubfamily;var M=[],N=Lu.make(A,M),P=M.length>0?vu.make(M):void 0,F=Gu.make(),ee=iu.make(e.glyphs,{version:e.getEnglishName(`version`),fullName:O,familyName:E,weightName:D,postScriptName:k,unitsPerEm:e.unitsPerEm,fontBBox:[0,y.yMin,y.ascender,y.advanceWidthMax]}),I=e.metas&&Object.keys(e.metas).length>0?ed.make(e.metas):void 0,te=[b,x,S,C,N,T,F,ee,w];P&&te.push(P),e.tables.gsub&&te.push(Zu.make(e.tables.gsub)),e.tables.cpal&&te.push(od.make(e.tables.cpal)),e.tables.colr&&te.push(rd.make(e.tables.colr)),I&&te.push(I);for(var ne=ud(te),re=cd(ne.encode()),ie=ne.fields,L=!1,R=0;R<ie.length;R+=1)if(ie[R].name===`head table`){ie[R].value.checkSumAdjustment=2981146554-re,L=!0;break}if(!L)throw Error(`Could not find head table with checkSum to adjust.`);return ne}var md={make:ud,fontToTable:pd,computeCheckSum:cd};function hd(e,t){for(var n=0,r=e.length-1;n<=r;){var i=n+r>>>1,a=e[i].tag;if(a===t)return i;a<t?n=i+1:r=i-1}return-n-1}function gd(e,t){for(var n=0,r=e.length-1;n<=r;){var i=n+r>>>1,a=e[i];if(a===t)return i;a<t?n=i+1:r=i-1}return-n-1}function _d(e,t){for(var n,r=0,i=e.length-1;r<=i;){var a=r+i>>>1;n=e[a];var o=n.start;if(o===t)return n;o<t?r=a+1:i=a-1}if(r>0)return n=e[r-1],t>n.end?0:n}function vd(e,t){this.font=e,this.tableName=t}vd.prototype={searchTag:hd,binSearch:gd,getTable:function(e){var t=this.font.tables[this.tableName];return!t&&e&&(t=this.font.tables[this.tableName]=this.createDefaultTable()),t},getScriptNames:function(){var e=this.getTable();return e?e.scripts.map(function(e){return e.tag}):[]},getDefaultScriptName:function(){var e=this.getTable();if(e){for(var t=!1,n=0;n<e.scripts.length;n++){var r=e.scripts[n].tag;if(r===`DFLT`)return r;r===`latn`&&(t=!0)}if(t)return`latn`}},getScriptTable:function(e,t){var n=this.getTable(t);if(n){e||=`DFLT`;var r=n.scripts,i=hd(n.scripts,e);if(i>=0)return r[i].script;if(t){var a={tag:e,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return r.splice(-1-i,0,a),a.script}}},getLangSysTable:function(e,t,n){var r=this.getScriptTable(e,n);if(r){if(!t||t===`dflt`||t===`DFLT`)return r.defaultLangSys;var i=hd(r.langSysRecords,t);if(i>=0)return r.langSysRecords[i].langSys;if(n){var a={tag:t,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return r.langSysRecords.splice(-1-i,0,a),a.langSys}}},getFeatureTable:function(e,t,n,r){var i=this.getLangSysTable(e,t,r);if(i){for(var a,o=i.featureIndexes,s=this.font.tables[this.tableName].features,c=0;c<o.length;c++)if(a=s[o[c]],a.tag===n)return a.feature;if(r){var l=s.length;return q.assert(l===0||n>=s[l-1].tag,`Features must be added in alphabetical order.`),a={tag:n,feature:{params:0,lookupListIndexes:[]}},s.push(a),o.push(l),a.feature}}},getLookupTables:function(e,t,n,r,i){var a=this.getFeatureTable(e,t,n,i),o=[];if(a){for(var s,c=a.lookupListIndexes,l=this.font.tables[this.tableName].lookups,u=0;u<c.length;u++)s=l[c[u]],s.lookupType===r&&o.push(s);if(o.length===0&&i){s={lookupType:r,lookupFlag:0,subtables:[],markFilteringSet:void 0};var d=l.length;return l.push(s),c.push(d),[s]}}return o},getGlyphClass:function(e,t){switch(e.format){case 1:return e.startGlyph<=t&&t<e.startGlyph+e.classes.length?e.classes[t-e.startGlyph]:0;case 2:var n=_d(e.ranges,t);return n?n.classId:0}},getCoverageIndex:function(e,t){switch(e.format){case 1:var n=gd(e.glyphs,t);return n>=0?n:-1;case 2:var r=_d(e.ranges,t);return r?r.index+t-r.start:-1}},expandCoverage:function(e){if(e.format===1)return e.glyphs;for(var t=[],n=e.ranges,r=0;r<n.length;r++)for(var i=n[r],a=i.start,o=i.end,s=a;s<=o;s++)t.push(s);return t}};function yd(e){vd.call(this,e,`gpos`)}yd.prototype=vd.prototype,yd.prototype.init=function(){var e=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(e)},yd.prototype.getKerningValue=function(e,t,n){for(var r=0;r<e.length;r++)for(var i=e[r].subtables,a=0;a<i.length;a++){var o=i[a],s=this.getCoverageIndex(o.coverage,t);if(!(s<0))switch(o.posFormat){case 1:for(var c=o.pairSets[s],l=0;l<c.length;l++){var u=c[l];if(u.secondGlyph===n)return u.value1&&u.value1.xAdvance||0}break;case 2:var d=this.getGlyphClass(o.classDef1,t),f=this.getGlyphClass(o.classDef2,n),p=o.classRecords[d][f];return p.value1&&p.value1.xAdvance||0}}return 0},yd.prototype.getKerningTables=function(e,t){if(this.font.tables.gpos)return this.getLookupTables(e,t,`kern`,2)};function bd(e){vd.call(this,e,`gsub`)}function xd(e,t){var n=e.length;if(n!==t.length)return!1;for(var r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}function Sd(e,t,n){for(var r=e.subtables,i=0;i<r.length;i++){var a=r[i];if(a.substFormat===t)return a}if(n)return r.push(n),n}bd.prototype=vd.prototype,bd.prototype.createDefaultTable=function(){return{version:1,scripts:[{tag:`DFLT`,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}},bd.prototype.getSingle=function(e,t,n){for(var r=[],i=this.getLookupTables(t,n,e,1),a=0;a<i.length;a++)for(var o=i[a].subtables,s=0;s<o.length;s++){var c=o[s],l=this.expandCoverage(c.coverage),u=void 0;if(c.substFormat===1){var d=c.deltaGlyphId;for(u=0;u<l.length;u++){var f=l[u];r.push({sub:f,by:f+d})}}else{var p=c.substitute;for(u=0;u<l.length;u++)r.push({sub:l[u],by:p[u]})}}return r},bd.prototype.getMultiple=function(e,t,n){for(var r=[],i=this.getLookupTables(t,n,e,2),a=0;a<i.length;a++)for(var o=i[a].subtables,s=0;s<o.length;s++){var c=o[s],l=this.expandCoverage(c.coverage),u=void 0;for(u=0;u<l.length;u++){var d=l[u],f=c.sequences[u];r.push({sub:d,by:f})}}return r},bd.prototype.getAlternates=function(e,t,n){for(var r=[],i=this.getLookupTables(t,n,e,3),a=0;a<i.length;a++)for(var o=i[a].subtables,s=0;s<o.length;s++)for(var c=o[s],l=this.expandCoverage(c.coverage),u=c.alternateSets,d=0;d<l.length;d++)r.push({sub:l[d],by:u[d]});return r},bd.prototype.getLigatures=function(e,t,n){for(var r=[],i=this.getLookupTables(t,n,e,4),a=0;a<i.length;a++)for(var o=i[a].subtables,s=0;s<o.length;s++)for(var c=o[s],l=this.expandCoverage(c.coverage),u=c.ligatureSets,d=0;d<l.length;d++)for(var f=l[d],p=u[d],m=0;m<p.length;m++){var h=p[m];r.push({sub:[f].concat(h.components),by:h.ligGlyph})}return r},bd.prototype.addSingle=function(e,t,n,r){var i=this.getLookupTables(n,r,e,1,!0)[0],a=Sd(i,2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});q.assert(a.coverage.format===1,`Single: unable to modify coverage table format `+a.coverage.format);var o=t.sub,s=this.binSearch(a.coverage.glyphs,o);s<0&&(s=-1-s,a.coverage.glyphs.splice(s,0,o),a.substitute.splice(s,0,0)),a.substitute[s]=t.by},bd.prototype.addMultiple=function(e,t,n,r){q.assert(t.by instanceof Array&&t.by.length>1,`Multiple: "by" must be an array of two or more ids`);var i=this.getLookupTables(n,r,e,2,!0)[0],a=Sd(i,1,{substFormat:1,coverage:{format:1,glyphs:[]},sequences:[]});q.assert(a.coverage.format===1,`Multiple: unable to modify coverage table format `+a.coverage.format);var o=t.sub,s=this.binSearch(a.coverage.glyphs,o);s<0&&(s=-1-s,a.coverage.glyphs.splice(s,0,o),a.sequences.splice(s,0,0)),a.sequences[s]=t.by},bd.prototype.addAlternate=function(e,t,n,r){var i=this.getLookupTables(n,r,e,3,!0)[0],a=Sd(i,1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});q.assert(a.coverage.format===1,`Alternate: unable to modify coverage table format `+a.coverage.format);var o=t.sub,s=this.binSearch(a.coverage.glyphs,o);s<0&&(s=-1-s,a.coverage.glyphs.splice(s,0,o),a.alternateSets.splice(s,0,0)),a.alternateSets[s]=t.by},bd.prototype.addLigature=function(e,t,n,r){var i=this.getLookupTables(n,r,e,4,!0)[0],a=i.subtables[0];a||(a={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},i.subtables[0]=a),q.assert(a.coverage.format===1,`Ligature: unable to modify coverage table format `+a.coverage.format);var o=t.sub[0],s=t.sub.slice(1),c={ligGlyph:t.by,components:s},l=this.binSearch(a.coverage.glyphs,o);if(l>=0){for(var u=a.ligatureSets[l],d=0;d<u.length;d++)if(xd(u[d].components,s))return;u.push(c)}else l=-1-l,a.coverage.glyphs.splice(l,0,o),a.ligatureSets.splice(l,0,[c])},bd.prototype.getFeature=function(e,t,n){if(/ss\d\d/.test(e))return this.getSingle(e,t,n);switch(e){case`aalt`:case`salt`:return this.getSingle(e,t,n).concat(this.getAlternates(e,t,n));case`dlig`:case`liga`:case`rlig`:return this.getLigatures(e,t,n);case`ccmp`:return this.getMultiple(e,t,n).concat(this.getLigatures(e,t,n));case`stch`:return this.getMultiple(e,t,n)}},bd.prototype.add=function(e,t,n,r){if(/ss\d\d/.test(e))return this.addSingle(e,t,n,r);switch(e){case`aalt`:case`salt`:return typeof t.by==`number`?this.addSingle(e,t,n,r):this.addAlternate(e,t,n,r);case`dlig`:case`liga`:case`rlig`:return this.addLigature(e,t,n,r);case`ccmp`:return t.by instanceof Array?this.addMultiple(e,t,n,r):this.addLigature(e,t,n,r)}};function Cd(e,t){if(!e)throw t}function wd(e,t,n,r,i){var a;return(t&r)>0?(a=e.parseByte(),(t&i)===0&&(a=-a),a=n+a):a=(t&i)>0?n:n+e.parseShort(),a}function Td(e,t,n){var r=new Q.Parser(t,n);e.numberOfContours=r.parseShort(),e._xMin=r.parseShort(),e._yMin=r.parseShort(),e._xMax=r.parseShort(),e._yMax=r.parseShort();var i,a;if(e.numberOfContours>0){for(var o=e.endPointIndices=[],s=0;s<e.numberOfContours;s+=1)o.push(r.parseUShort());e.instructionLength=r.parseUShort(),e.instructions=[];for(var c=0;c<e.instructionLength;c+=1)e.instructions.push(r.parseByte());var l=o[o.length-1]+1;i=[];for(var u=0;u<l;u+=1)if(a=r.parseByte(),i.push(a),(a&8)>0)for(var d=r.parseByte(),f=0;f<d;f+=1)i.push(a),u+=1;if(q.argument(i.length===l,`Bad flags.`),o.length>0){var p=[],m;if(l>0){for(var h=0;h<l;h+=1)a=i[h],m={},m.onCurve=!!(a&1),m.lastPointOfContour=o.indexOf(h)>=0,p.push(m);for(var g=0,_=0;_<l;_+=1)a=i[_],m=p[_],m.x=wd(r,a,g,2,16),g=m.x;for(var v=0,y=0;y<l;y+=1)a=i[y],m=p[y],m.y=wd(r,a,v,4,32),v=m.y}e.points=p}else e.points=[]}else if(e.numberOfContours===0)e.points=[];else{e.isComposite=!0,e.points=[],e.components=[];for(var b=!0;b;){i=r.parseUShort();var x={glyphIndex:r.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(i&1)>0?(i&2)>0?(x.dx=r.parseShort(),x.dy=r.parseShort()):x.matchedPoints=[r.parseUShort(),r.parseUShort()]:(i&2)>0?(x.dx=r.parseChar(),x.dy=r.parseChar()):x.matchedPoints=[r.parseByte(),r.parseByte()],(i&8)>0?x.xScale=x.yScale=r.parseF2Dot14():(i&64)>0?(x.xScale=r.parseF2Dot14(),x.yScale=r.parseF2Dot14()):(i&128)>0&&(x.xScale=r.parseF2Dot14(),x.scale01=r.parseF2Dot14(),x.scale10=r.parseF2Dot14(),x.yScale=r.parseF2Dot14()),e.components.push(x),b=!!(i&32)}if(i&256){e.instructionLength=r.parseUShort(),e.instructions=[];for(var S=0;S<e.instructionLength;S+=1)e.instructions.push(r.parseByte())}}}function Ed(e,t){for(var n=[],r=0;r<e.length;r+=1){var i=e[r],a={x:t.xScale*i.x+t.scale01*i.y+t.dx,y:t.scale10*i.x+t.yScale*i.y+t.dy,onCurve:i.onCurve,lastPointOfContour:i.lastPointOfContour};n.push(a)}return n}function Dd(e){for(var t=[],n=[],r=0;r<e.length;r+=1){var i=e[r];n.push(i),i.lastPointOfContour&&(t.push(n),n=[])}return q.argument(n.length===0,`There are still points left in the current contour.`),t}function Od(e){var t=new mc;if(!e)return t;for(var n=Dd(e),r=0;r<n.length;++r){var i=n[r],a=null,o=i[i.length-1],s=i[0];if(o.onCurve)t.moveTo(o.x,o.y);else if(s.onCurve)t.moveTo(s.x,s.y);else{var c={x:(o.x+s.x)*.5,y:(o.y+s.y)*.5};t.moveTo(c.x,c.y)}for(var l=0;l<i.length;++l)if(a=o,o=s,s=i[(l+1)%i.length],o.onCurve)t.lineTo(o.x,o.y);else{var u=s;a.onCurve||((o.x+a.x)*.5,(o.y+a.y)*.5),s.onCurve||(u={x:(o.x+s.x)*.5,y:(o.y+s.y)*.5}),t.quadraticCurveTo(o.x,o.y,u.x,u.y)}t.closePath()}return t}function kd(e,t){if(t.isComposite)for(var n=0;n<t.components.length;n+=1){var r=t.components[n],i=e.get(r.glyphIndex);if(i.getPath(),i.points){var a=void 0;if(r.matchedPoints===void 0)a=Ed(i.points,r);else{if(r.matchedPoints[0]>t.points.length-1||r.matchedPoints[1]>i.points.length-1)throw Error(`Matched points out of range in `+t.name);var o=t.points[r.matchedPoints[0]],s=i.points[r.matchedPoints[1]],c={xScale:r.xScale,scale01:r.scale01,scale10:r.scale10,yScale:r.yScale,dx:0,dy:0};s=Ed([s],c)[0],c.dx=o.x-s.x,c.dy=o.y-s.y,a=Ed(i.points,c)}t.points=t.points.concat(a)}}return Od(t.points)}function Ad(e,t,n,r){for(var i=new Sl.GlyphSet(r),a=0;a<n.length-1;a+=1){var o=n[a];o===n[a+1]?i.push(a,Sl.glyphLoader(r,a)):i.push(a,Sl.ttfGlyphLoader(r,a,Td,e,t+o,kd))}return i}function jd(e,t,n,r){var i=new Sl.GlyphSet(r);return r._push=function(a){var o=n[a];o===n[a+1]?i.push(a,Sl.glyphLoader(r,a)):i.push(a,Sl.ttfGlyphLoader(r,a,Td,e,t+o,kd))},i}function Md(e,t,n,r,i){return i.lowMemory?jd(e,t,n,r):Ad(e,t,n,r)}var Nd={getPath:Od,parse:Md},Pd,Fd,Id,Ld;function Rd(e){this.font=e,this.getCommands=function(e){return Nd.getPath(e).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function zd(e){return e}function Bd(e){return Math.sign(e)*Math.round(Math.abs(e))}function Vd(e){return Math.sign(e)*Math.round(Math.abs(e*2))/2}function Hd(e){return Math.sign(e)*(Math.round(Math.abs(e)+.5)-.5)}function Ud(e){return Math.sign(e)*Math.ceil(Math.abs(e))}function Wd(e){return Math.sign(e)*Math.floor(Math.abs(e))}var Gd=function(e){var t=this.srPeriod,n=this.srPhase,r=this.srThreshold,i=1;return e<0&&(e=-e,i=-1),e+=r-n,e=Math.trunc(e/t)*t,e+=n,e<0?n*i:e*i},Kd={x:1,y:0,axis:`x`,distance:function(e,t,n,r){return(n?e.xo:e.x)-(r?t.xo:t.x)},interpolate:function(e,t,n,r){var i,a,o,s,c,l,u;if(!r||r===this){if(i=e.xo-t.xo,a=e.xo-n.xo,c=t.x-t.xo,l=n.x-n.xo,o=Math.abs(i),s=Math.abs(a),u=o+s,u===0){e.x=e.xo+(c+l)/2;return}e.x=e.xo+(c*s+l*o)/u}else i=r.distance(e,t,!0,!0),a=r.distance(e,n,!0,!0),c=r.distance(t,t,!1,!0),l=r.distance(n,n,!1,!0),o=Math.abs(i),s=Math.abs(a),u=o+s,u===0?Kd.setRelative(e,e,(c+l)/2,r,!0):Kd.setRelative(e,e,(c*s+l*o)/u,r,!0)},normalSlope:-1/0,setRelative:function(e,t,n,r,i){if(!r||r===this)e.x=(i?t.xo:t.x)+n;else{var a=i?t.xo:t.x,o=i?t.yo:t.y,s=a+n*r.x,c=o+n*r.y;e.x=s+(e.y-c)/r.normalSlope}},slope:0,touch:function(e){e.xTouched=!0},touched:function(e){return e.xTouched},untouch:function(e){e.xTouched=!1}},qd={x:0,y:1,axis:`y`,distance:function(e,t,n,r){return(n?e.yo:e.y)-(r?t.yo:t.y)},interpolate:function(e,t,n,r){var i,a,o,s,c,l,u;if(!r||r===this){if(i=e.yo-t.yo,a=e.yo-n.yo,c=t.y-t.yo,l=n.y-n.yo,o=Math.abs(i),s=Math.abs(a),u=o+s,u===0){e.y=e.yo+(c+l)/2;return}e.y=e.yo+(c*s+l*o)/u}else i=r.distance(e,t,!0,!0),a=r.distance(e,n,!0,!0),c=r.distance(t,t,!1,!0),l=r.distance(n,n,!1,!0),o=Math.abs(i),s=Math.abs(a),u=o+s,u===0?qd.setRelative(e,e,(c+l)/2,r,!0):qd.setRelative(e,e,(c*s+l*o)/u,r,!0)},normalSlope:0,setRelative:function(e,t,n,r,i){if(!r||r===this)e.y=(i?t.yo:t.y)+n;else{var a=i?t.xo:t.x,o=i?t.yo:t.y,s=a+n*r.x;e.y=o+n*r.y+r.normalSlope*(e.x-s)}},slope:1/0,touch:function(e){e.yTouched=!0},touched:function(e){return e.yTouched},untouch:function(e){e.yTouched=!1}};Object.freeze(Kd),Object.freeze(qd);function Jd(e,t){this.x=e,this.y=t,this.axis=void 0,this.slope=t/e,this.normalSlope=-e/t,Object.freeze(this)}Jd.prototype.distance=function(e,t,n,r){return this.x*Kd.distance(e,t,n,r)+this.y*qd.distance(e,t,n,r)},Jd.prototype.interpolate=function(e,t,n,r){var i,a,o=r.distance(e,t,!0,!0),s=r.distance(e,n,!0,!0),c,l,u;i=r.distance(t,t,!1,!0),a=r.distance(n,n,!1,!0),c=Math.abs(o),l=Math.abs(s),u=c+l,u===0?this.setRelative(e,e,(i+a)/2,r,!0):this.setRelative(e,e,(i*l+a*c)/u,r,!0)},Jd.prototype.setRelative=function(e,t,n,r,i){r||=this;var a=i?t.xo:t.x,o=i?t.yo:t.y,s=a+n*r.x,c=o+n*r.y,l=r.normalSlope,u=this.slope,d=e.x,f=e.y;e.x=(u*d-l*s+c-f)/(u-l),e.y=u*(e.x-d)+f},Jd.prototype.touch=function(e){e.xTouched=!0,e.yTouched=!0};function Yd(e,t){var n=Math.sqrt(e*e+t*t);return e/=n,t/=n,e===1&&t===0?Kd:e===0&&t===1?qd:new Jd(e,t)}function Xd(e,t,n,r){this.x=this.xo=Math.round(e*64)/64,this.y=this.yo=Math.round(t*64)/64,this.lastPointOfContour=n,this.onCurve=r,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}Xd.prototype.nextTouched=function(e){for(var t=this.nextPointOnContour;!e.touched(t)&&t!==this;)t=t.nextPointOnContour;return t},Xd.prototype.prevTouched=function(e){for(var t=this.prevPointOnContour;!e.touched(t)&&t!==this;)t=t.prevPointOnContour;return t};var Zd=Object.freeze(new Xd(0,0)),Qd={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function $d(e,t){switch(this.env=e,this.stack=[],this.prog=t,e){case`glyf`:this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case`prep`:this.fv=this.pv=this.dpv=Kd,this.round=Bd}}Rd.prototype.exec=function(e,t){if(typeof t!=`number`)throw Error(`Point size is not a number!`);if(!(this._errorState>2)){var n=this.font,r=this._prepState;if(!r||r.ppem!==t){var i=this._fpgmState;if(!i){$d.prototype=Qd,i=this._fpgmState=new $d(`fpgm`,n.tables.fpgm),i.funcs=[],i.font=n,exports.DEBUG&&(console.log(`---EXEC FPGM---`),i.step=-1);try{Fd(i)}catch(e){console.log(`Hinting error in FPGM:`+e),this._errorState=3;return}}$d.prototype=i,r=this._prepState=new $d(`prep`,n.tables.prep),r.ppem=t;var a=n.tables.cvt;if(a)for(var o=r.cvt=Array(a.length),s=t/n.unitsPerEm,c=0;c<a.length;c++)o[c]=a[c]*s;else r.cvt=[];exports.DEBUG&&(console.log(`---EXEC PREP---`),r.step=-1);try{Fd(r)}catch(e){this._errorState<2&&console.log(`Hinting error in PREP:`+e),this._errorState=2}}if(!(this._errorState>1))try{return Id(e,r)}catch(e){this._errorState<1&&(console.log(`Hinting error:`+e),console.log(`Note: further hinting errors are silenced`)),this._errorState=1;return}}},Id=function(e,t){var n=t.ppem/t.font.unitsPerEm,r=n,i=e.components,a,o,s;if($d.prototype=t,!i)s=new $d(`glyf`,e.instructions),exports.DEBUG&&(console.log(`---EXEC GLYPH---`),s.step=-1),Ld(e,s,n,r),o=s.gZone;else{var c=t.font;o=[],a=[];for(var l=0;l<i.length;l++){var u=i[l],d=c.glyphs.get(u.glyphIndex);s=new $d(`glyf`,d.instructions),exports.DEBUG&&(console.log(`---EXEC COMP `+l+`---`),s.step=-1),Ld(d,s,n,r);for(var f=Math.round(u.dx*n),p=Math.round(u.dy*r),m=s.gZone,h=s.contours,g=0;g<m.length;g++){var _=m[g];_.xTouched=_.yTouched=!1,_.xo=_.x+=f,_.yo=_.y+=p}var v=o.length;o.push.apply(o,m);for(var y=0;y<h.length;y++)a.push(h[y]+v)}e.instructions&&!s.inhibitGridFit&&(s=new $d(`glyf`,e.instructions),s.gZone=s.z0=s.z1=s.z2=o,s.contours=a,o.push(new Xd(0,0),new Xd(Math.round(e.advanceWidth*n),0)),exports.DEBUG&&(console.log(`---EXEC COMPOSITE---`),s.step=-1),Fd(s),o.length-=2)}return o},Ld=function(e,t,n,r){for(var i=e.points||[],a=i.length,o=t.gZone=t.z0=t.z1=t.z2=[],s=t.contours=[],c,l=0;l<a;l++)c=i[l],o[l]=new Xd(c.x*n,c.y*r,c.lastPointOfContour,c.onCurve);for(var u,d,f=0;f<a;f++)c=o[f],u||(u=c,s.push(f)),c.lastPointOfContour?(c.nextPointOnContour=u,u.prevPointOnContour=c,u=void 0):(d=o[f+1],c.nextPointOnContour=d,d.prevPointOnContour=c);if(!t.inhibitGridFit){if(exports.DEBUG){console.log(`PROCESSING GLYPH`,t.stack);for(var p=0;p<a;p++)console.log(p,o[p].x,o[p].y)}if(o.push(new Xd(0,0),new Xd(Math.round(e.advanceWidth*n),0)),Fd(t),o.length-=2,exports.DEBUG){console.log(`FINISHED GLYPH`,t.stack);for(var m=0;m<a;m++)console.log(m,o[m].x,o[m].y)}}},Fd=function(e){var t=e.prog;if(t){var n=t.length,r;for(e.ip=0;e.ip<n;e.ip++){if(exports.DEBUG&&e.step++,r=Pd[t[e.ip]],!r)throw Error(`unknown instruction: 0x`+Number(t[e.ip]).toString(16));r(e)}}};function ef(e){for(var t=e.tZone=Array(e.gZone.length),n=0;n<t.length;n++)t[n]=new Xd(0,0)}function tf(e,t){var n=e.prog,r=e.ip,i=1,a;do if(a=n[++r],a===88)i++;else if(a===89)i--;else if(a===64)r+=n[r+1]+1;else if(a===65)r+=2*n[r+1]+1;else if(a>=176&&a<=183)r+=a-176+1;else if(a>=184&&a<=191)r+=(a-184+1)*2;else if(t&&i===1&&a===27)break;while(i>0);e.ip=r}function nf(e,t){exports.DEBUG&&console.log(t.step,`SVTCA[`+e.axis+`]`),t.fv=t.pv=t.dpv=e}function rf(e,t){exports.DEBUG&&console.log(t.step,`SPVTCA[`+e.axis+`]`),t.pv=t.dpv=e}function af(e,t){exports.DEBUG&&console.log(t.step,`SFVTCA[`+e.axis+`]`),t.fv=e}function of(e,t){var n=t.stack,r=n.pop(),i=n.pop(),a=t.z2[r],o=t.z1[i];exports.DEBUG&&console.log(`SPVTL[`+e+`]`,r,i);var s,c;e?(s=a.y-o.y,c=o.x-a.x):(s=o.x-a.x,c=o.y-a.y),t.pv=t.dpv=Yd(s,c)}function sf(e,t){var n=t.stack,r=n.pop(),i=n.pop(),a=t.z2[r],o=t.z1[i];exports.DEBUG&&console.log(`SFVTL[`+e+`]`,r,i);var s,c;e?(s=a.y-o.y,c=o.x-a.x):(s=o.x-a.x,c=o.y-a.y),t.fv=Yd(s,c)}function cf(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`SPVFS[]`,n,r),e.pv=e.dpv=Yd(r,n)}function lf(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`SPVFS[]`,n,r),e.fv=Yd(r,n)}function uf(e){var t=e.stack,n=e.pv;exports.DEBUG&&console.log(e.step,`GPV[]`),t.push(n.x*16384),t.push(n.y*16384)}function df(e){var t=e.stack,n=e.fv;exports.DEBUG&&console.log(e.step,`GFV[]`),t.push(n.x*16384),t.push(n.y*16384)}function ff(e){e.fv=e.pv,exports.DEBUG&&console.log(e.step,`SFVTPV[]`)}function pf(e){var t=e.stack,n=t.pop(),r=t.pop(),i=t.pop(),a=t.pop(),o=t.pop(),s=e.z0,c=e.z1,l=s[n],u=s[r],d=c[i],f=c[a],p=e.z2[o];exports.DEBUG&&console.log(`ISECT[], `,n,r,i,a,o);var m=l.x,h=l.y,g=u.x,_=u.y,v=d.x,y=d.y,b=f.x,x=f.y,S=(m-g)*(y-x)-(h-_)*(v-b),C=m*_-h*g,w=v*x-y*b;p.x=(C*(v-b)-w*(m-g))/S,p.y=(C*(y-x)-w*(h-_))/S}function mf(e){e.rp0=e.stack.pop(),exports.DEBUG&&console.log(e.step,`SRP0[]`,e.rp0)}function hf(e){e.rp1=e.stack.pop(),exports.DEBUG&&console.log(e.step,`SRP1[]`,e.rp1)}function gf(e){e.rp2=e.stack.pop(),exports.DEBUG&&console.log(e.step,`SRP2[]`,e.rp2)}function _f(e){var t=e.stack.pop();switch(exports.DEBUG&&console.log(e.step,`SZP0[]`,t),e.zp0=t,t){case 0:e.tZone||ef(e),e.z0=e.tZone;break;case 1:e.z0=e.gZone;break;default:throw Error(`Invalid zone pointer`)}}function vf(e){var t=e.stack.pop();switch(exports.DEBUG&&console.log(e.step,`SZP1[]`,t),e.zp1=t,t){case 0:e.tZone||ef(e),e.z1=e.tZone;break;case 1:e.z1=e.gZone;break;default:throw Error(`Invalid zone pointer`)}}function yf(e){var t=e.stack.pop();switch(exports.DEBUG&&console.log(e.step,`SZP2[]`,t),e.zp2=t,t){case 0:e.tZone||ef(e),e.z2=e.tZone;break;case 1:e.z2=e.gZone;break;default:throw Error(`Invalid zone pointer`)}}function bf(e){var t=e.stack.pop();switch(exports.DEBUG&&console.log(e.step,`SZPS[]`,t),e.zp0=e.zp1=e.zp2=t,t){case 0:e.tZone||ef(e),e.z0=e.z1=e.z2=e.tZone;break;case 1:e.z0=e.z1=e.z2=e.gZone;break;default:throw Error(`Invalid zone pointer`)}}function xf(e){e.loop=e.stack.pop(),exports.DEBUG&&console.log(e.step,`SLOOP[]`,e.loop)}function Sf(e){exports.DEBUG&&console.log(e.step,`RTG[]`),e.round=Bd}function Cf(e){exports.DEBUG&&console.log(e.step,`RTHG[]`),e.round=Hd}function wf(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SMD[]`,t),e.minDis=t/64}function Tf(e){exports.DEBUG&&console.log(e.step,`ELSE[]`),tf(e,!1)}function Ef(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`JMPR[]`,t),e.ip+=t-1}function Df(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SCVTCI[]`,t),e.cvCutIn=t/64}function Of(e){var t=e.stack;exports.DEBUG&&console.log(e.step,`DUP[]`),t.push(t[t.length-1])}function kf(e){exports.DEBUG&&console.log(e.step,`POP[]`),e.stack.pop()}function Af(e){exports.DEBUG&&console.log(e.step,`CLEAR[]`),e.stack.length=0}function jf(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`SWAP[]`),t.push(n),t.push(r)}function Mf(e){var t=e.stack;exports.DEBUG&&console.log(e.step,`DEPTH[]`),t.push(t.length)}function Nf(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`LOOPCALL[]`,n,r);var i=e.ip,a=e.prog;e.prog=e.funcs[n];for(var o=0;o<r;o++)Fd(e),exports.DEBUG&&console.log(++e.step,o+1<r?`next loopcall`:`done loopcall`,o);e.ip=i,e.prog=a}function Pf(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`CALL[]`,t);var n=e.ip,r=e.prog;e.prog=e.funcs[t],Fd(e),e.ip=n,e.prog=r,exports.DEBUG&&console.log(++e.step,`returning from`,t)}function Ff(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`CINDEX[]`,n),t.push(t[t.length-n])}function If(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`MINDEX[]`,n),t.push(t.splice(t.length-n,1)[0])}function Lf(e){if(e.env!==`fpgm`)throw Error(`FDEF not allowed here`);var t=e.stack,n=e.prog,r=e.ip,i=t.pop(),a=r;for(exports.DEBUG&&console.log(e.step,`FDEF[]`,i);n[++r]!==45;);e.ip=r,e.funcs[i]=n.slice(a+1,r)}function Rf(e,t){var n=t.stack.pop(),r=t.z0[n],i=t.fv,a=t.pv;exports.DEBUG&&console.log(t.step,`MDAP[`+e+`]`,n);var o=a.distance(r,Zd);e&&(o=t.round(o)),i.setRelative(r,Zd,o,a),i.touch(r),t.rp0=t.rp1=n}function zf(e,t){var n=t.z2,r=n.length-2,i,a,o;exports.DEBUG&&console.log(t.step,`IUP[`+e.axis+`]`);for(var s=0;s<r;s++)i=n[s],!e.touched(i)&&(a=i.prevTouched(e),a!==i&&(o=i.nextTouched(e),a===o&&e.setRelative(i,i,e.distance(a,a,!1,!0),e,!0),e.interpolate(i,a,o,e)))}function Bf(e,t){for(var n=t.stack,r=e?t.rp1:t.rp2,i=(e?t.z0:t.z1)[r],a=t.fv,o=t.pv,s=t.loop,c=t.z2;s--;){var l=n.pop(),u=c[l],d=o.distance(i,i,!1,!0);a.setRelative(u,u,d,o),a.touch(u),exports.DEBUG&&console.log(t.step,(t.loop>1?`loop `+(t.loop-s)+`: `:``)+`SHP[`+(e?`rp1`:`rp2`)+`]`,l)}t.loop=1}function Vf(e,t){var n=t.stack,r=e?t.rp1:t.rp2,i=(e?t.z0:t.z1)[r],a=t.fv,o=t.pv,s=n.pop(),c=t.z2[t.contours[s]],l=c;exports.DEBUG&&console.log(t.step,`SHC[`+e+`]`,s);var u=o.distance(i,i,!1,!0);do l!==i&&a.setRelative(l,l,u,o),l=l.nextPointOnContour;while(l!==c)}function Hf(e,t){var n=t.stack,r=e?t.rp1:t.rp2,i=(e?t.z0:t.z1)[r],a=t.fv,o=t.pv,s=n.pop();exports.DEBUG&&console.log(t.step,`SHZ[`+e+`]`,s);var c;switch(s){case 0:c=t.tZone;break;case 1:c=t.gZone;break;default:throw Error(`Invalid zone`)}for(var l,u=o.distance(i,i,!1,!0),d=c.length-2,f=0;f<d;f++)l=c[f],a.setRelative(l,l,u,o)}function Uf(e){for(var t=e.stack,n=e.loop,r=e.fv,i=t.pop()/64,a=e.z2;n--;){var o=t.pop(),s=a[o];exports.DEBUG&&console.log(e.step,(e.loop>1?`loop `+(e.loop-n)+`: `:``)+`SHPIX[]`,o,i),r.setRelative(s,s,i),r.touch(s)}e.loop=1}function Wf(e){for(var t=e.stack,n=e.rp1,r=e.rp2,i=e.loop,a=e.z0[n],o=e.z1[r],s=e.fv,c=e.dpv,l=e.z2;i--;){var u=t.pop(),d=l[u];exports.DEBUG&&console.log(e.step,(e.loop>1?`loop `+(e.loop-i)+`: `:``)+`IP[]`,u,n,`<->`,r),s.interpolate(d,a,o,c),s.touch(d)}e.loop=1}function Gf(e,t){var n=t.stack,r=n.pop()/64,i=n.pop(),a=t.z1[i],o=t.z0[t.rp0],s=t.fv,c=t.pv;s.setRelative(a,o,r,c),s.touch(a),exports.DEBUG&&console.log(t.step,`MSIRP[`+e+`]`,r,i),t.rp1=t.rp0,t.rp2=i,e&&(t.rp0=i)}function Kf(e){for(var t=e.stack,n=e.rp0,r=e.z0[n],i=e.loop,a=e.fv,o=e.pv,s=e.z1;i--;){var c=t.pop(),l=s[c];exports.DEBUG&&console.log(e.step,(e.loop>1?`loop `+(e.loop-i)+`: `:``)+`ALIGNRP[]`,c),a.setRelative(l,r,0,o),a.touch(l)}e.loop=1}function qf(e){exports.DEBUG&&console.log(e.step,`RTDG[]`),e.round=Vd}function Jf(e,t){var n=t.stack,r=n.pop(),i=n.pop(),a=t.z0[i],o=t.fv,s=t.pv,c=t.cvt[r];exports.DEBUG&&console.log(t.step,`MIAP[`+e+`]`,r,`(`,c,`)`,i);var l=s.distance(a,Zd);e&&(Math.abs(l-c)<t.cvCutIn&&(l=c),l=t.round(l)),o.setRelative(a,Zd,l,s),t.zp0===0&&(a.xo=a.x,a.yo=a.y),o.touch(a),t.rp0=t.rp1=i}function Yf(e){var t=e.prog,n=e.ip,r=e.stack,i=t[++n];exports.DEBUG&&console.log(e.step,`NPUSHB[]`,i);for(var a=0;a<i;a++)r.push(t[++n]);e.ip=n}function Xf(e){var t=e.ip,n=e.prog,r=e.stack,i=n[++t];exports.DEBUG&&console.log(e.step,`NPUSHW[]`,i);for(var a=0;a<i;a++){var o=n[++t]<<8|n[++t];o&32768&&(o=-((o^65535)+1)),r.push(o)}e.ip=t}function Zf(e){var t=e.stack,n=e.store;n||=e.store=[];var r=t.pop(),i=t.pop();exports.DEBUG&&console.log(e.step,`WS`,r,i),n[i]=r}function Qf(e){var t=e.stack,n=e.store,r=t.pop();exports.DEBUG&&console.log(e.step,`RS`,r);var i=n&&n[r]||0;t.push(i)}function $f(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`WCVTP`,n,r),e.cvt[r]=n/64}function ep(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`RCVT`,n),t.push(e.cvt[n]*64)}function tp(e,t){var n=t.stack,r=n.pop(),i=t.z2[r];exports.DEBUG&&console.log(t.step,`GC[`+e+`]`,r),n.push(t.dpv.distance(i,Zd,e,!1)*64)}function np(e,t){var n=t.stack,r=n.pop(),i=n.pop(),a=t.z1[r],o=t.z0[i],s=t.dpv.distance(o,a,e,e);exports.DEBUG&&console.log(t.step,`MD[`+e+`]`,r,i,`->`,s),t.stack.push(Math.round(s*64))}function rp(e){exports.DEBUG&&console.log(e.step,`MPPEM[]`),e.stack.push(e.ppem)}function ip(e){exports.DEBUG&&console.log(e.step,`FLIPON[]`),e.autoFlip=!0}function ap(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`LT[]`,n,r),t.push(+(r<n))}function op(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`LTEQ[]`,n,r),t.push(+(r<=n))}function sp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`GT[]`,n,r),t.push(+(r>n))}function cp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`GTEQ[]`,n,r),t.push(+(r>=n))}function lp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`EQ[]`,n,r),t.push(+(n===r))}function up(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`NEQ[]`,n,r),t.push(n===r?0:1)}function dp(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`ODD[]`,n),t.push(Math.trunc(n)%2?1:0)}function fp(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`EVEN[]`,n),t.push(Math.trunc(n)%2?0:1)}function pp(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`IF[]`,t),t||(tf(e,!0),exports.DEBUG&&console.log(e.step,`EIF[]`))}function mp(e){exports.DEBUG&&console.log(e.step,`EIF[]`)}function hp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`AND[]`,n,r),t.push(n&&r?1:0)}function gp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`OR[]`,n,r),t.push(n||r?1:0)}function _p(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`NOT[]`,n),t.push(+!n)}function vp(e,t){var n=t.stack,r=n.pop(),i=t.fv,a=t.pv,o=t.ppem,s=t.deltaBase+(e-1)*16,c=t.deltaShift,l=t.z0;exports.DEBUG&&console.log(t.step,`DELTAP[`+e+`]`,r,n);for(var u=0;u<r;u++){var d=n.pop(),f=n.pop();if(s+((f&240)>>4)===o){var p=(f&15)-8;p>=0&&p++,exports.DEBUG&&console.log(t.step,`DELTAPFIX`,d,`by`,p*c);var m=l[d];i.setRelative(m,m,p*c,a)}}}function yp(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SDB[]`,t),e.deltaBase=t}function bp(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SDS[]`,t),e.deltaShift=.5**t}function xp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`ADD[]`,n,r),t.push(r+n)}function Sp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`SUB[]`,n,r),t.push(r-n)}function Cp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`DIV[]`,n,r),t.push(r*64/n)}function wp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`MUL[]`,n,r),t.push(r*n/64)}function Tp(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`ABS[]`,n),t.push(Math.abs(n))}function Ep(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`NEG[]`,n),t.push(-n)}function Dp(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`FLOOR[]`,n),t.push(Math.floor(n/64)*64)}function Op(e){var t=e.stack,n=t.pop();exports.DEBUG&&console.log(e.step,`CEILING[]`,n),t.push(Math.ceil(n/64)*64)}function kp(e,t){var n=t.stack,r=n.pop();exports.DEBUG&&console.log(t.step,`ROUND[]`),n.push(t.round(r/64)*64)}function Ap(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`WCVTF[]`,n,r),e.cvt[r]=n*e.ppem/e.font.unitsPerEm}function jp(e,t){var n=t.stack,r=n.pop(),i=t.ppem,a=t.deltaBase+(e-1)*16,o=t.deltaShift;exports.DEBUG&&console.log(t.step,`DELTAC[`+e+`]`,r,n);for(var s=0;s<r;s++){var c=n.pop(),l=n.pop();if(a+((l&240)>>4)===i){var u=(l&15)-8;u>=0&&u++;var d=u*o;exports.DEBUG&&console.log(t.step,`DELTACFIX`,c,`by`,d),t.cvt[c]+=d}}}function Mp(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SROUND[]`,t),e.round=Gd;var n;switch(t&192){case 0:n=.5;break;case 64:n=1;break;case 128:n=2;break;default:throw Error(`invalid SROUND value`)}switch(e.srPeriod=n,t&48){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*n;break;case 32:e.srPhase=.5*n;break;case 48:e.srPhase=.75*n;break;default:throw Error(`invalid SROUND value`)}t&=15,e.srThreshold=t===0?0:(t/8-.5)*n}function Np(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`S45ROUND[]`,t),e.round=Gd;var n;switch(t&192){case 0:n=Math.sqrt(2)/2;break;case 64:n=Math.sqrt(2);break;case 128:n=2*Math.sqrt(2);break;default:throw Error(`invalid S45ROUND value`)}switch(e.srPeriod=n,t&48){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*n;break;case 32:e.srPhase=.5*n;break;case 48:e.srPhase=.75*n;break;default:throw Error(`invalid S45ROUND value`)}t&=15,e.srThreshold=t===0?0:(t/8-.5)*n}function Pp(e){exports.DEBUG&&console.log(e.step,`ROFF[]`),e.round=zd}function Fp(e){exports.DEBUG&&console.log(e.step,`RUTG[]`),e.round=Ud}function Ip(e){exports.DEBUG&&console.log(e.step,`RDTG[]`),e.round=Wd}function Lp(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SCANCTRL[]`,t)}function Rp(e,t){var n=t.stack,r=n.pop(),i=n.pop(),a=t.z2[r],o=t.z1[i];exports.DEBUG&&console.log(t.step,`SDPVTL[`+e+`]`,r,i);var s,c;e?(s=a.y-o.y,c=o.x-a.x):(s=o.x-a.x,c=o.y-a.y),t.dpv=Yd(s,c)}function zp(e){var t=e.stack,n=t.pop(),r=0;exports.DEBUG&&console.log(e.step,`GETINFO[]`,n),n&1&&(r=35),n&32&&(r|=4096),t.push(r)}function Bp(e){var t=e.stack,n=t.pop(),r=t.pop(),i=t.pop();exports.DEBUG&&console.log(e.step,`ROLL[]`),t.push(r),t.push(n),t.push(i)}function Vp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`MAX[]`,n,r),t.push(Math.max(r,n))}function Hp(e){var t=e.stack,n=t.pop(),r=t.pop();exports.DEBUG&&console.log(e.step,`MIN[]`,n,r),t.push(Math.min(r,n))}function Up(e){var t=e.stack.pop();exports.DEBUG&&console.log(e.step,`SCANTYPE[]`,t)}function Wp(e){var t=e.stack.pop(),n=e.stack.pop();switch(exports.DEBUG&&console.log(e.step,`INSTCTRL[]`,t,n),t){case 1:e.inhibitGridFit=!!n;return;case 2:e.ignoreCvt=!!n;return;default:throw Error(`invalid INSTCTRL[] selector`)}}function Gp(e,t){var n=t.stack,r=t.prog,i=t.ip;exports.DEBUG&&console.log(t.step,`PUSHB[`+e+`]`);for(var a=0;a<e;a++)n.push(r[++i]);t.ip=i}function Kp(e,t){var n=t.ip,r=t.prog,i=t.stack;exports.DEBUG&&console.log(t.ip,`PUSHW[`+e+`]`);for(var a=0;a<e;a++){var o=r[++n]<<8|r[++n];o&32768&&(o=-((o^65535)+1)),i.push(o)}t.ip=n}function $(e,t,n,r,i,a){var o=a.stack,s=e&&o.pop(),c=o.pop(),l=a.rp0,u=a.z0[l],d=a.z1[c],f=a.minDis,p=a.fv,m=a.dpv,h,g=h=m.distance(d,u,!0,!0),_=g>=0?1:-1,v;g=Math.abs(g),e&&(v=a.cvt[s],r&&Math.abs(g-v)<a.cvCutIn&&(g=v)),n&&g<f&&(g=f),r&&(g=a.round(g)),p.setRelative(d,u,_*g,m),p.touch(d),exports.DEBUG&&console.log(a.step,(e?`MIRP[`:`MDRP[`)+(t?`M`:`m`)+(n?`>`:`_`)+(r?`R`:`_`)+(i===0?`Gr`:i===1?`Bl`:i===2?`Wh`:``)+`]`,e?s+`(`+a.cvt[s]+`,`+v+`)`:``,c,`(d =`,h,`->`,_*g,`)`),a.rp1=a.rp0,a.rp2=c,t&&(a.rp0=c)}Pd=[nf.bind(void 0,qd),nf.bind(void 0,Kd),rf.bind(void 0,qd),rf.bind(void 0,Kd),af.bind(void 0,qd),af.bind(void 0,Kd),of.bind(void 0,0),of.bind(void 0,1),sf.bind(void 0,0),sf.bind(void 0,1),cf,lf,uf,df,ff,pf,mf,hf,gf,_f,vf,yf,bf,xf,Sf,Cf,wf,Tf,Ef,Df,void 0,void 0,Of,kf,Af,jf,Mf,Ff,If,void 0,void 0,void 0,Nf,Pf,Lf,void 0,Rf.bind(void 0,0),Rf.bind(void 0,1),zf.bind(void 0,qd),zf.bind(void 0,Kd),Bf.bind(void 0,0),Bf.bind(void 0,1),Vf.bind(void 0,0),Vf.bind(void 0,1),Hf.bind(void 0,0),Hf.bind(void 0,1),Uf,Wf,Gf.bind(void 0,0),Gf.bind(void 0,1),Kf,qf,Jf.bind(void 0,0),Jf.bind(void 0,1),Yf,Xf,Zf,Qf,$f,ep,tp.bind(void 0,0),tp.bind(void 0,1),void 0,np.bind(void 0,0),np.bind(void 0,1),rp,void 0,ip,void 0,void 0,ap,op,sp,cp,lp,up,dp,fp,pp,mp,hp,gp,_p,vp.bind(void 0,1),yp,bp,xp,Sp,Cp,wp,Tp,Ep,Dp,Op,kp.bind(void 0,0),kp.bind(void 0,1),kp.bind(void 0,2),kp.bind(void 0,3),void 0,void 0,void 0,void 0,Ap,vp.bind(void 0,2),vp.bind(void 0,3),jp.bind(void 0,1),jp.bind(void 0,2),jp.bind(void 0,3),Mp,Np,void 0,void 0,Pp,void 0,Fp,Ip,kf,kf,void 0,void 0,void 0,void 0,void 0,Lp,Rp.bind(void 0,0),Rp.bind(void 0,1),zp,void 0,Bp,Vp,Hp,Up,Wp,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,Gp.bind(void 0,1),Gp.bind(void 0,2),Gp.bind(void 0,3),Gp.bind(void 0,4),Gp.bind(void 0,5),Gp.bind(void 0,6),Gp.bind(void 0,7),Gp.bind(void 0,8),Kp.bind(void 0,1),Kp.bind(void 0,2),Kp.bind(void 0,3),Kp.bind(void 0,4),Kp.bind(void 0,5),Kp.bind(void 0,6),Kp.bind(void 0,7),Kp.bind(void 0,8),$.bind(void 0,0,0,0,0,0),$.bind(void 0,0,0,0,0,1),$.bind(void 0,0,0,0,0,2),$.bind(void 0,0,0,0,0,3),$.bind(void 0,0,0,0,1,0),$.bind(void 0,0,0,0,1,1),$.bind(void 0,0,0,0,1,2),$.bind(void 0,0,0,0,1,3),$.bind(void 0,0,0,1,0,0),$.bind(void 0,0,0,1,0,1),$.bind(void 0,0,0,1,0,2),$.bind(void 0,0,0,1,0,3),$.bind(void 0,0,0,1,1,0),$.bind(void 0,0,0,1,1,1),$.bind(void 0,0,0,1,1,2),$.bind(void 0,0,0,1,1,3),$.bind(void 0,0,1,0,0,0),$.bind(void 0,0,1,0,0,1),$.bind(void 0,0,1,0,0,2),$.bind(void 0,0,1,0,0,3),$.bind(void 0,0,1,0,1,0),$.bind(void 0,0,1,0,1,1),$.bind(void 0,0,1,0,1,2),$.bind(void 0,0,1,0,1,3),$.bind(void 0,0,1,1,0,0),$.bind(void 0,0,1,1,0,1),$.bind(void 0,0,1,1,0,2),$.bind(void 0,0,1,1,0,3),$.bind(void 0,0,1,1,1,0),$.bind(void 0,0,1,1,1,1),$.bind(void 0,0,1,1,1,2),$.bind(void 0,0,1,1,1,3),$.bind(void 0,1,0,0,0,0),$.bind(void 0,1,0,0,0,1),$.bind(void 0,1,0,0,0,2),$.bind(void 0,1,0,0,0,3),$.bind(void 0,1,0,0,1,0),$.bind(void 0,1,0,0,1,1),$.bind(void 0,1,0,0,1,2),$.bind(void 0,1,0,0,1,3),$.bind(void 0,1,0,1,0,0),$.bind(void 0,1,0,1,0,1),$.bind(void 0,1,0,1,0,2),$.bind(void 0,1,0,1,0,3),$.bind(void 0,1,0,1,1,0),$.bind(void 0,1,0,1,1,1),$.bind(void 0,1,0,1,1,2),$.bind(void 0,1,0,1,1,3),$.bind(void 0,1,1,0,0,0),$.bind(void 0,1,1,0,0,1),$.bind(void 0,1,1,0,0,2),$.bind(void 0,1,1,0,0,3),$.bind(void 0,1,1,0,1,0),$.bind(void 0,1,1,0,1,1),$.bind(void 0,1,1,0,1,2),$.bind(void 0,1,1,0,1,3),$.bind(void 0,1,1,1,0,0),$.bind(void 0,1,1,1,0,1),$.bind(void 0,1,1,1,0,2),$.bind(void 0,1,1,1,0,3),$.bind(void 0,1,1,1,1,0),$.bind(void 0,1,1,1,1,1),$.bind(void 0,1,1,1,1,2),$.bind(void 0,1,1,1,1,3)];function qp(e){this.char=e,this.state={},this.activeState=null}function Jp(e,t,n){this.contextName=n,this.startIndex=e,this.endOffset=t}function Yp(e,t,n){this.contextName=e,this.openRange=null,this.ranges=[],this.checkStart=t,this.checkEnd=n}function Xp(e,t){this.context=e,this.index=t,this.length=e.length,this.current=e[t],this.backtrack=e.slice(0,t),this.lookahead=e.slice(t+1)}function Zp(e){this.eventId=e,this.subscribers=[]}function Qp(e){var t=this,n=[`start`,`end`,`next`,`newToken`,`contextStart`,`contextEnd`,`insertToken`,`removeToken`,`removeRange`,`replaceToken`,`replaceRange`,`composeRUD`,`updateContextsRanges`];n.forEach(function(e){Object.defineProperty(t.events,e,{value:new Zp(e)})}),e&&n.forEach(function(n){var r=e[n];typeof r==`function`&&t.events[n].subscribe(r)}),[`insertToken`,`removeToken`,`removeRange`,`replaceToken`,`replaceRange`,`composeRUD`].forEach(function(e){t.events[e].subscribe(t.updateContextsRanges)})}function $p(e){this.tokens=[],this.registeredContexts={},this.contextCheckers=[],this.events={},this.registeredModifiers=[],Qp.call(this,e)}qp.prototype.setState=function(e,t){return this.state[e]=t,this.activeState={key:e,value:this.state[e]},this.activeState},qp.prototype.getState=function(e){return this.state[e]||null},$p.prototype.inboundIndex=function(e){return e>=0&&e<this.tokens.length},$p.prototype.composeRUD=function(e){var t=this,n=!0,r=e.map(function(e){return t[e[0]].apply(t,e.slice(1).concat(n))}),i=function(e){return typeof e==`object`&&e.hasOwnProperty(`FAIL`)};if(r.every(i))return{FAIL:`composeRUD: one or more operations hasn't completed successfully`,report:r.filter(i)};this.dispatch(`composeRUD`,[r.filter(function(e){return!i(e)})])},$p.prototype.replaceRange=function(e,t,n,r){t=t===null?this.tokens.length:t;var i=n.every(function(e){return e instanceof qp});if(!isNaN(e)&&this.inboundIndex(e)&&i){var a=this.tokens.splice.apply(this.tokens,[e,t].concat(n));return r||this.dispatch(`replaceToken`,[e,t,n]),[a,n]}return{FAIL:`replaceRange: invalid tokens or startIndex.`}},$p.prototype.replaceToken=function(e,t,n){if(!isNaN(e)&&this.inboundIndex(e)&&t instanceof qp){var r=this.tokens.splice(e,1,t);return n||this.dispatch(`replaceToken`,[e,t]),[r[0],t]}return{FAIL:`replaceToken: invalid token or index.`}},$p.prototype.removeRange=function(e,t,n){t=isNaN(t)?this.tokens.length:t;var r=this.tokens.splice(e,t);return n||this.dispatch(`removeRange`,[r,e,t]),r},$p.prototype.removeToken=function(e,t){if(!isNaN(e)&&this.inboundIndex(e)){var n=this.tokens.splice(e,1);return t||this.dispatch(`removeToken`,[n,e]),n}return{FAIL:`removeToken: invalid token index.`}},$p.prototype.insertToken=function(e,t,n){return e.every(function(e){return e instanceof qp})?(this.tokens.splice.apply(this.tokens,[t,0].concat(e)),n||this.dispatch(`insertToken`,[e,t]),e):{FAIL:`insertToken: invalid token(s).`}},$p.prototype.registerModifier=function(e,t,n){this.events.newToken.subscribe(function(r,i){var a=[r,i],o=t===null||t.apply(this,a)===!0,s=[r,i];if(o){var c=n.apply(this,s);r.setState(e,c)}}),this.registeredModifiers.push(e)},Zp.prototype.subscribe=function(e){return typeof e==`function`?this.subscribers.push(e)-1:{FAIL:`invalid '`+this.eventId+`' event handler`}},Zp.prototype.unsubscribe=function(e){this.subscribers.splice(e,1)},Xp.prototype.setCurrentIndex=function(e){this.index=e,this.current=this.context[e],this.backtrack=this.context.slice(0,e),this.lookahead=this.context.slice(e+1)},Xp.prototype.get=function(e){switch(!0){case e===0:return this.current;case e<0&&Math.abs(e)<=this.backtrack.length:return this.backtrack.slice(e)[0];case e>0&&e<=this.lookahead.length:return this.lookahead[e-1];default:return null}},$p.prototype.rangeToText=function(e){if(e instanceof Jp)return this.getRangeTokens(e).map(function(e){return e.char}).join(``)},$p.prototype.getText=function(){return this.tokens.map(function(e){return e.char}).join(``)},$p.prototype.getContext=function(e){return this.registeredContexts[e]||null},$p.prototype.on=function(e,t){var n=this.events[e];return n?n.subscribe(t):null},$p.prototype.dispatch=function(e,t){var n=this,r=this.events[e];r instanceof Zp&&r.subscribers.forEach(function(e){e.apply(n,t||[])})},$p.prototype.registerContextChecker=function(e,t,n){if(this.getContext(e))return{FAIL:`context name '`+e+`' is already registered.`};if(typeof t!=`function`)return{FAIL:`missing context start check.`};if(typeof n!=`function`)return{FAIL:`missing context end check.`};var r=new Yp(e,t,n);return this.registeredContexts[e]=r,this.contextCheckers.push(r),r},$p.prototype.getRangeTokens=function(e){var t=e.startIndex+e.endOffset;return[].concat(this.tokens.slice(e.startIndex,t))},$p.prototype.getContextRanges=function(e){var t=this.getContext(e);return t?t.ranges:{FAIL:`context checker '`+e+`' is not registered.`}},$p.prototype.resetContextsRanges=function(){var e=this.registeredContexts;for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];n.ranges=[]}},$p.prototype.updateContextsRanges=function(){this.resetContextsRanges();for(var e=this.tokens.map(function(e){return e.char}),t=0;t<e.length;t++){var n=new Xp(e,t);this.runContextCheck(n)}this.dispatch(`updateContextsRanges`,[this.registeredContexts])},$p.prototype.setEndOffset=function(e,t){var n=this.getContext(t).openRange.startIndex,r=new Jp(n,e,t),i=this.getContext(t).ranges;return r.rangeId=t+`.`+i.length,i.push(r),this.getContext(t).openRange=null,r},$p.prototype.runContextCheck=function(e){var t=this,n=e.index;this.contextCheckers.forEach(function(r){var i=r.contextName,a=t.getContext(i).openRange;if(!a&&r.checkStart(e)&&(a=new Jp(n,null,i),t.getContext(i).openRange=a,t.dispatch(`contextStart`,[i,n])),a&&r.checkEnd(e)){var o=n-a.startIndex+1,s=t.setEndOffset(o,i);t.dispatch(`contextEnd`,[i,s])}})},$p.prototype.tokenize=function(e){this.tokens=[],this.resetContextsRanges();var t=Array.from(e);this.dispatch(`start`);for(var n=0;n<t.length;n++){var r=t[n],i=new Xp(t,n);this.dispatch(`next`,[i]),this.runContextCheck(i);var a=new qp(r);this.tokens.push(a),this.dispatch(`newToken`,[a,i])}return this.dispatch(`end`,[this.tokens]),this.tokens};function em(e){return/[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(e)}function tm(e){return/[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(e)}function nm(e){return/[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(e)}function rm(e){return/[A-z]/.test(e)}function im(e){return/\s/.test(e)}function am(e){this.font=e,this.features={}}function om(e){this.id=e.id,this.tag=e.tag,this.substitution=e.substitution}function sm(e,t){if(!e)return-1;switch(t.format){case 1:return t.glyphs.indexOf(e);case 2:for(var n=t.ranges,r=0;r<n.length;r++){var i=n[r];if(e>=i.start&&e<=i.end){var a=e-i.start;return i.index+a}}break;default:return-1}return-1}function cm(e,t){return sm(e,t.coverage)===-1?null:e+t.deltaGlyphId}function lm(e,t){var n=sm(e,t.coverage);return n===-1?null:t.substitute[n]}function um(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r],a=t.current;a=Array.isArray(a)?a[0]:a;var o=sm(a,i);o!==-1&&n.push(o)}return n.length===e.length?n:-1}function dm(e,t){var n=t.inputCoverage.length+t.lookaheadCoverage.length+t.backtrackCoverage.length;if(e.context.length<n)return[];var r=um(t.inputCoverage,e);if(r===-1)return[];var i=t.inputCoverage.length-1;if(e.lookahead.length<t.lookaheadCoverage.length)return[];for(var a=e.lookahead.slice(i);a.length&&nm(a[0].char);)a.shift();var o=new Xp(a,0),s=um(t.lookaheadCoverage,o),c=[].concat(e.backtrack);for(c.reverse();c.length&&nm(c[0].char);)c.shift();if(c.length<t.backtrackCoverage.length)return[];var l=new Xp(c,0),u=um(t.backtrackCoverage,l),d=r.length===t.inputCoverage.length&&s.length===t.lookaheadCoverage.length&&u.length===t.backtrackCoverage.length,f=[];if(d)for(var p=0;p<t.lookupRecords.length;p++)for(var m=t.lookupRecords[p].lookupListIndex,h=this.getLookupByIndex(m),g=0;g<h.subtables.length;g++){var _=h.subtables[g],v=this.getLookupMethod(h,_);if(this.getSubstitutionType(h,_)===`12`)for(var y=0;y<r.length;y++){var b=v(e.get(y));b&&f.push(b)}}return f}function fm(e,t){var n=e.current,r=sm(n,t.coverage);if(r===-1)return null;for(var i,a=t.ligatureSets[r],o=0;o<a.length;o++){i=a[o];for(var s=0;s<i.components.length&&e.lookahead[s]===i.components[s];s++)if(s===i.components.length-1)return i}return null}function pm(e,t){var n=sm(e,t.coverage);return n===-1?null:t.sequences[n]}am.prototype.getDefaultScriptFeaturesIndexes=function(){for(var e=this.font.tables.gsub.scripts,t=0;t<e.length;t++){var n=e[t];if(n.tag===`DFLT`)return n.script.defaultLangSys.featureIndexes}return[]},am.prototype.getScriptFeaturesIndexes=function(e){if(!this.font.tables.gsub)return[];if(!e)return this.getDefaultScriptFeaturesIndexes();for(var t=this.font.tables.gsub.scripts,n=0;n<t.length;n++){var r=t[n];if(r.tag===e&&r.script.defaultLangSys)return r.script.defaultLangSys.featureIndexes;var i=r.langSysRecords;if(i)for(var a=0;a<i.length;a++){var o=i[a];if(o.tag===e)return o.langSys.featureIndexes}}return this.getDefaultScriptFeaturesIndexes()},am.prototype.mapTagsToFeatures=function(e,t){for(var n={},r=0;r<e.length;r++){var i=e[r].tag;n[i]=e[r].feature}this.features[t].tags=n},am.prototype.getScriptFeatures=function(e){var t=this.features[e];if(this.features.hasOwnProperty(e))return t;var n=this.getScriptFeaturesIndexes(e);if(!n)return null;var r=this.font.tables.gsub;return t=n.map(function(e){return r.features[e]}),this.features[e]=t,this.mapTagsToFeatures(t,e),t},am.prototype.getSubstitutionType=function(e,t){return e.lookupType.toString()+t.substFormat.toString()},am.prototype.getLookupMethod=function(e,t){var n=this;switch(this.getSubstitutionType(e,t)){case`11`:return function(e){return cm.apply(n,[e,t])};case`12`:return function(e){return lm.apply(n,[e,t])};case`63`:return function(e){return dm.apply(n,[e,t])};case`41`:return function(e){return fm.apply(n,[e,t])};case`21`:return function(e){return pm.apply(n,[e,t])};default:throw Error(`lookupType: `+e.lookupType+` - substFormat: `+t.substFormat+` is not yet supported`)}},am.prototype.lookupFeature=function(e){var t=e.contextParams,n=t.index,r=this.getFeature({tag:e.tag,script:e.script});if(!r)return/* @__PURE__ */ Error(`font '`+this.font.names.fullName.en+`' doesn't support feature '`+e.tag+`' for script '`+e.script+`'.`);for(var i=this.getFeatureLookups(r),a=[].concat(t.context),o=0;o<i.length;o++)for(var s=i[o],c=this.getLookupSubtables(s),l=0;l<c.length;l++){var u=c[l],d=this.getSubstitutionType(s,u),f=this.getLookupMethod(s,u),p=void 0;switch(d){case`11`:p=f(t.current),p&&a.splice(n,1,new om({id:11,tag:e.tag,substitution:p}));break;case`12`:p=f(t.current),p&&a.splice(n,1,new om({id:12,tag:e.tag,substitution:p}));break;case`63`:p=f(t),Array.isArray(p)&&p.length&&a.splice(n,1,new om({id:63,tag:e.tag,substitution:p}));break;case`41`:p=f(t),p&&a.splice(n,1,new om({id:41,tag:e.tag,substitution:p}));break;case`21`:p=f(t.current),p&&a.splice(n,1,new om({id:21,tag:e.tag,substitution:p}))}t=new Xp(a,n),(!Array.isArray(p)||p.length)&&(p=null)}return a.length?a:null},am.prototype.supports=function(e){if(!e.script)return!1;this.getScriptFeatures(e.script);var t=this.features.hasOwnProperty(e.script);if(!e.tag)return t;var n=this.features[e.script].some(function(t){return t.tag===e.tag});return t&&n},am.prototype.getLookupSubtables=function(e){return e.subtables||null},am.prototype.getLookupByIndex=function(e){return this.font.tables.gsub.lookups[e]||null},am.prototype.getFeatureLookups=function(e){return e.lookupListIndexes.map(this.getLookupByIndex.bind(this))},am.prototype.getFeature=function(e){if(!this.font)return{FAIL:`No font was found`};this.features.hasOwnProperty(e.script)||this.getScriptFeatures(e.script);var t=this.features[e.script];return t?t.tags[e.tag]?this.features[e.script].tags[e.tag]:null:{FAIL:`No feature for script `+e.script}};function mm(e){var t=e.current,n=e.get(-1);return n===null&&em(t)||!em(n)&&em(t)}function hm(e){var t=e.get(1);return t===null||!em(t)}var gm={startCheck:mm,endCheck:hm};function _m(e){var t=e.current,n=e.get(-1);return(em(t)||nm(t))&&!em(n)}function vm(e){var t=e.get(1);switch(!0){case t===null:return!0;case!em(t)&&!nm(t):var n=im(t);if(!n)return!0;if(n){var r=!1;if(r=e.lookahead.some(function(e){return em(e)||nm(e)}),!r)return!0}break;default:return!1}}var ym={startCheck:_m,endCheck:vm};function bm(e,t,n){t[n].setState(e.tag,e.substitution)}function xm(e,t,n){t[n].setState(e.tag,e.substitution)}function Sm(e,t,n){e.substitution.forEach(function(r,i){t[n+i].setState(e.tag,r)})}function Cm(e,t,n){var r=t[n];r.setState(e.tag,e.substitution.ligGlyph);for(var i=e.substitution.components.length,a=0;a<i;a++)r=t[n+a+1],r.setState(`deleted`,!0)}var wm={11:bm,12:xm,63:Sm,41:Cm};function Tm(e,t,n){e instanceof om&&wm[e.id]&&wm[e.id](e,t,n)}function Em(e){for(var t=[].concat(e.backtrack),n=t.length-1;n>=0;n--){var r=t[n],i=tm(r),a=nm(r);if(!i&&!a)return!0;if(i)return!1}return!1}function Dm(e){if(tm(e.current))return!1;for(var t=0;t<e.lookahead.length;t++){var n=e.lookahead[t];if(!nm(n))return!0}return!1}function Om(e){var t=this,n=`arab`,r=this.featuresTags[n],i=this.tokenizer.getRangeTokens(e);if(i.length!==1){var a=new Xp(i.map(function(e){return e.getState(`glyphIndex`)}),0),o=new Xp(i.map(function(e){return e.char}),0);i.forEach(function(e,s){if(!nm(e.char)){a.setCurrentIndex(s),o.setCurrentIndex(s);var c=0;Em(o)&&(c|=1),Dm(o)&&(c|=2);var l;switch(c){case 1:l=`fina`;break;case 2:l=`init`;break;case 3:l=`medi`}if(r.indexOf(l)!==-1){var u=t.query.lookupFeature({tag:l,script:n,contextParams:a});if(u instanceof Error)return console.info(u.message);u.forEach(function(e,t){e instanceof om&&(Tm(e,i,t),a.context[t]=e.substitution)})}}})}}function km(e,t){return new Xp(e.map(function(e){return e.activeState.value}),t||0)}function Am(e){var t=this,n=`arab`,r=this.tokenizer.getRangeTokens(e),i=km(r);i.context.forEach(function(e,a){i.setCurrentIndex(a);var o=t.query.lookupFeature({tag:`rlig`,script:n,contextParams:i});o.length&&(o.forEach(function(e){return Tm(e,r,a)}),i=km(r))})}function jm(e){var t=e.current,n=e.get(-1);return n===null&&rm(t)||!rm(n)&&rm(t)}function Mm(e){var t=e.get(1);return t===null||!rm(t)}var Nm={startCheck:jm,endCheck:Mm};function Pm(e,t){return new Xp(e.map(function(e){return e.activeState.value}),t||0)}function Fm(e){var t=this,n=`latn`,r=this.tokenizer.getRangeTokens(e),i=Pm(r);i.context.forEach(function(e,a){i.setCurrentIndex(a);var o=t.query.lookupFeature({tag:`liga`,script:n,contextParams:i});o.length&&(o.forEach(function(e){return Tm(e,r,a)}),i=Pm(r))})}function Im(e){this.baseDir=e||`ltr`,this.tokenizer=new $p,this.featuresTags={}}Im.prototype.setText=function(e){this.text=e},Im.prototype.contextChecks={latinWordCheck:Nm,arabicWordCheck:gm,arabicSentenceCheck:ym};function Lm(e){var t=this.contextChecks[e+`Check`];return this.tokenizer.registerContextChecker(e,t.startCheck,t.endCheck)}function Rm(){return Lm.call(this,`latinWord`),Lm.call(this,`arabicWord`),Lm.call(this,`arabicSentence`),this.tokenizer.tokenize(this.text)}function zm(){var e=this;this.tokenizer.getContextRanges(`arabicSentence`).forEach(function(t){var n=e.tokenizer.getRangeTokens(t);e.tokenizer.replaceRange(t.startIndex,t.endOffset,n.reverse())})}Im.prototype.registerFeatures=function(e,t){var n=this,r=t.filter(function(t){return n.query.supports({script:e,tag:t})});this.featuresTags.hasOwnProperty(e)?this.featuresTags[e]=this.featuresTags[e].concat(r):this.featuresTags[e]=r},Im.prototype.applyFeatures=function(e,t){if(!e)throw Error(`No valid font was provided to apply features`);this.query||=new am(e);for(var n=0;n<t.length;n++){var r=t[n];this.query.supports({script:r.script})&&this.registerFeatures(r.script,r.tags)}},Im.prototype.registerModifier=function(e,t,n){this.tokenizer.registerModifier(e,t,n)};function Bm(){if(this.tokenizer.registeredModifiers.indexOf(`glyphIndex`)===-1)throw Error(`glyphIndex modifier is required to apply arabic presentation features.`)}function Vm(){var e=this;this.featuresTags.hasOwnProperty(`arab`)&&(Bm.call(this),this.tokenizer.getContextRanges(`arabicWord`).forEach(function(t){Om.call(e,t)}))}function Hm(){var e=this,t=`arab`;this.featuresTags.hasOwnProperty(t)&&this.featuresTags[t].indexOf(`rlig`)!==-1&&(Bm.call(this),this.tokenizer.getContextRanges(`arabicWord`).forEach(function(t){Am.call(e,t)}))}function Um(){var e=this,t=`latn`;this.featuresTags.hasOwnProperty(t)&&this.featuresTags[t].indexOf(`liga`)!==-1&&(Bm.call(this),this.tokenizer.getContextRanges(`latinWord`).forEach(function(t){Fm.call(e,t)}))}Im.prototype.checkContextReady=function(e){return!!this.tokenizer.getContext(e)},Im.prototype.applyFeaturesToContexts=function(){this.checkContextReady(`arabicWord`)&&(Vm.call(this),Hm.call(this)),this.checkContextReady(`latinWord`)&&Um.call(this),this.checkContextReady(`arabicSentence`)&&zm.call(this)},Im.prototype.processText=function(e){this.text&&this.text===e||(this.setText(e),Rm.call(this),this.applyFeaturesToContexts())},Im.prototype.getBidiText=function(e){return this.processText(e),this.tokenizer.getText()},Im.prototype.getTextGlyphs=function(e){this.processText(e);for(var t=[],n=0;n<this.tokenizer.tokens.length;n++){var r=this.tokenizer.tokens[n];if(!r.state.deleted){var i=r.activeState.value;t.push(Array.isArray(i)?i[0]:i)}}return t};function Wm(e){e||={},e.tables=e.tables||{},e.empty||(Cd(e.familyName,`When creating a new Font object, familyName is required.`),Cd(e.styleName,`When creating a new Font object, styleName is required.`),Cd(e.unitsPerEm,`When creating a new Font object, unitsPerEm is required.`),Cd(e.ascender,`When creating a new Font object, ascender is required.`),Cd(e.descender<=0,`When creating a new Font object, negative descender value is required.`),this.names={fontFamily:{en:e.familyName||` `},fontSubfamily:{en:e.styleName||` `},fullName:{en:e.fullName||e.familyName+` `+e.styleName},postScriptName:{en:e.postScriptName||(e.familyName+e.styleName).replace(/\s/g,``)},designer:{en:e.designer||` `},designerURL:{en:e.designerURL||` `},manufacturer:{en:e.manufacturer||` `},manufacturerURL:{en:e.manufacturerURL||` `},license:{en:e.license||` `},licenseURL:{en:e.licenseURL||` `},version:{en:e.version||`Version 0.1`},description:{en:e.description||` `},copyright:{en:e.copyright||` `},trademark:{en:e.trademark||` `}},this.unitsPerEm=e.unitsPerEm||1e3,this.ascender=e.ascender,this.descender=e.descender,this.createdTimestamp=e.createdTimestamp,this.tables=Object.assign(e.tables,{os2:Object.assign({usWeightClass:e.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:e.widthClass||this.usWidthClasses.MEDIUM,fsSelection:e.fsSelection||this.fsSelectionValues.REGULAR},e.tables.os2)})),this.supported=!0,this.glyphs=new Sl.GlyphSet(this,e.glyphs||[]),this.encoding=new ol(this),this.position=new yd(this),this.substitution=new bd(this),this.tables=this.tables||{},this._push=null,this._hmtxTableData={},Object.defineProperty(this,"hinting",{get:function(){if(this._hinting)return this._hinting;if(this.outlinesFormat===`truetype`)return this._hinting=new Rd(this)}})}Wm.prototype.hasChar=function(e){return this.encoding.charToGlyphIndex(e)!==null},Wm.prototype.charToGlyphIndex=function(e){return this.encoding.charToGlyphIndex(e)},Wm.prototype.charToGlyph=function(e){var t=this.charToGlyphIndex(e),n=this.glyphs.get(t);return n||=this.glyphs.get(0),n},Wm.prototype.updateFeatures=function(e){return this.defaultRenderOptions.features.map(function(t){return t.script===`latn`?{script:`latn`,tags:t.tags.filter(function(t){return e[t]})}:t})},Wm.prototype.stringToGlyphs=function(e,t){var n=this,r=new Im;r.registerModifier(`glyphIndex`,null,function(e){return n.charToGlyphIndex(e.char)});var i=t?this.updateFeatures(t.features):this.defaultRenderOptions.features;r.applyFeatures(this,i);for(var a=r.getTextGlyphs(e),o=a.length,s=Array(o),c=this.glyphs.get(0),l=0;l<o;l+=1)s[l]=this.glyphs.get(a[l])||c;return s},Wm.prototype.nameToGlyphIndex=function(e){return this.glyphNames.nameToGlyphIndex(e)},Wm.prototype.nameToGlyph=function(e){var t=this.nameToGlyphIndex(e),n=this.glyphs.get(t);return n||=this.glyphs.get(0),n},Wm.prototype.glyphIndexToName=function(e){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(e):``},Wm.prototype.getKerningValue=function(e,t){e=e.index||e,t=t.index||t;var n=this.position.defaultKerningTables;return n?this.position.getKerningValue(n,e,t):this.kerningPairs[e+`,`+t]||0},Wm.prototype.defaultRenderOptions={kerning:!0,features:[{script:`arab`,tags:[`init`,`medi`,`fina`,`rlig`]},{script:`latn`,tags:[`liga`,`rlig`]}]},Wm.prototype.forEachGlyph=function(e,t,n,r,i,a){t=t===void 0?0:t,n=n===void 0?0:n,r=r===void 0?72:r,i=Object.assign({},this.defaultRenderOptions,i);var o=1/this.unitsPerEm*r,s=this.stringToGlyphs(e,i),c;if(i.kerning){var l=i.script||this.position.getDefaultScriptName();c=this.position.getKerningTables(l,i.language)}for(var u=0;u<s.length;u+=1){var d=s[u];if(a.call(this,d,t,n,r,i),d.advanceWidth&&(t+=d.advanceWidth*o),i.kerning&&u<s.length-1){var f=c?this.position.getKerningValue(c,d.index,s[u+1].index):this.getKerningValue(d,s[u+1]);t+=f*o}i.letterSpacing?t+=i.letterSpacing*r:i.tracking&&(t+=i.tracking/1e3*r)}return t},Wm.prototype.getPath=function(e,t,n,r,i){var a=new mc;return this.forEachGlyph(e,t,n,r,i,function(e,t,n,r){var o=e.getPath(t,n,r,i,this);a.extend(o)}),a},Wm.prototype.getPaths=function(e,t,n,r,i){var a=[];return this.forEachGlyph(e,t,n,r,i,function(e,t,n,r){var o=e.getPath(t,n,r,i,this);a.push(o)}),a},Wm.prototype.getAdvanceWidth=function(e,t,n){return this.forEachGlyph(e,0,0,t,n,function(){})},Wm.prototype.draw=function(e,t,n,r,i,a){this.getPath(t,n,r,i,a).draw(e)},Wm.prototype.drawPoints=function(e,t,n,r,i,a){this.forEachGlyph(t,n,r,i,a,function(t,n,r,i){t.drawPoints(e,n,r,i)})},Wm.prototype.drawMetrics=function(e,t,n,r,i,a){this.forEachGlyph(t,n,r,i,a,function(t,n,r,i){t.drawMetrics(e,n,r,i)})},Wm.prototype.getEnglishName=function(e){var t=this.names[e];if(t)return t.en},Wm.prototype.validate=function(){var e=this;function t(t){var n=e.getEnglishName(t);n&&n.trim().length}t(`fontFamily`),t(`weightName`),t(`manufacturer`),t(`copyright`),t(`version`),this.unitsPerEm},Wm.prototype.toTables=function(){return md.fontToTable(this)},Wm.prototype.toBuffer=function(){return console.warn(`Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.`),this.toArrayBuffer()},Wm.prototype.toArrayBuffer=function(){for(var e=this.toTables().encode(),t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0;r<e.length;r++)n[r]=e[r];return t},Wm.prototype.download=function(e){var t=this.getEnglishName(`fontFamily`),n=this.getEnglishName(`fontSubfamily`);e||=t.replace(/\s/g,``)+`-`+n+`.otf`;var r=this.toArrayBuffer();if(window.URL=window.URL||window.webkitURL,window.URL){var i=new DataView(r),a=new Blob([i],{type:`font/opentype`}),o=document.createElement(`a`);o.href=window.URL.createObjectURL(a),o.download=e;var s=document.createEvent(`MouseEvents`);s.initEvent(`click`,!0,!1),o.dispatchEvent(s)}else console.warn(`Font file could not be downloaded. Try using a different browser.`)},Wm.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512},Wm.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9},Wm.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};function Gm(e,t){var n=JSON.stringify(e),r=256;for(var i in t){var a=parseInt(i);if(!(!a||a<256)){if(JSON.stringify(t[i])===n)return a;r<=a&&(r=a+1)}}return t[r]=e,r}function Km(e,t,n){var r=Gm(t.name,n);return[{name:`tag_`+e,type:`TAG`,value:t.tag},{name:`minValue_`+e,type:`FIXED`,value:t.minValue<<16},{name:`defaultValue_`+e,type:`FIXED`,value:t.defaultValue<<16},{name:`maxValue_`+e,type:`FIXED`,value:t.maxValue<<16},{name:`flags_`+e,type:`USHORT`,value:0},{name:`nameID_`+e,type:`USHORT`,value:r}]}function qm(e,t,n){var r={},i=new Q.Parser(e,t);return r.tag=i.parseTag(),r.minValue=i.parseFixed(),r.defaultValue=i.parseFixed(),r.maxValue=i.parseFixed(),i.skip(`uShort`,1),r.name=n[i.parseUShort()]||{},r}function Jm(e,t,n,r){for(var i=Gm(t.name,r),a=[{name:`nameID_`+e,type:`USHORT`,value:i},{name:`flags_`+e,type:`USHORT`,value:0}],o=0;o<n.length;++o){var s=n[o].tag;a.push({name:`axis_`+e+` `+s,type:`FIXED`,value:t.coordinates[s]<<16})}return a}function Ym(e,t,n,r){var i={},a=new Q.Parser(e,t);i.name=r[a.parseUShort()]||{},a.skip(`uShort`,1),i.coordinates={};for(var o=0;o<n.length;++o)i.coordinates[n[o].tag]=a.parseFixed();return i}function Xm(e,t){var n=new X.Table(`fvar`,[{name:`version`,type:`ULONG`,value:65536},{name:`offsetToData`,type:`USHORT`,value:0},{name:`countSizePairs`,type:`USHORT`,value:2},{name:`axisCount`,type:`USHORT`,value:e.axes.length},{name:`axisSize`,type:`USHORT`,value:20},{name:`instanceCount`,type:`USHORT`,value:e.instances.length},{name:`instanceSize`,type:`USHORT`,value:4+e.axes.length*4}]);n.offsetToData=n.sizeOf();for(var r=0;r<e.axes.length;r++)n.fields=n.fields.concat(Km(r,e.axes[r],t));for(var i=0;i<e.instances.length;i++)n.fields=n.fields.concat(Jm(i,e.instances[i],e.axes,t));return n}function Zm(e,t,n){var r=new Q.Parser(e,t),i=r.parseULong();q.argument(i===65536,`Unsupported fvar table version.`);var a=r.parseOffset16();r.skip(`uShort`,1);for(var o=r.parseUShort(),s=r.parseUShort(),c=r.parseUShort(),l=r.parseUShort(),u=[],d=0;d<o;d++)u.push(qm(e,t+a+d*s,n));for(var f=[],p=t+a+o*s,m=0;m<c;m++)f.push(Ym(e,p+m*l,u,n));return{axes:u,instances:f}}var Qm={make:Xm,parse:Zm},$m=function(){return{coverage:this.parsePointer(Z.coverage),attachPoints:this.parseList(Z.pointer(Z.uShortList))}},eh=function(){var e=this.parseUShort();if(q.argument(e===1||e===2||e===3,`Unsupported CaretValue table version.`),e===1)return{coordinate:this.parseShort()};if(e===2)return{pointindex:this.parseShort()};if(e===3)return{coordinate:this.parseShort()}},th=function(){return this.parseList(Z.pointer(eh))},nh=function(){return{coverage:this.parsePointer(Z.coverage),ligGlyphs:this.parseList(Z.pointer(th))}},rh=function(){return this.parseUShort(),this.parseList(Z.pointer(Z.coverage))};function ih(e,t){t||=0;var n=new Z(e,t),r=n.parseVersion(1);q.argument(r===1||r===1.2||r===1.3,`Unsupported GDEF table version.`);var i={version:r,classDef:n.parsePointer(Z.classDef),attachList:n.parsePointer($m),ligCaretList:n.parsePointer(nh),markAttachClassDef:n.parsePointer(Z.classDef)};return r>=1.2&&(i.markGlyphSets=n.parsePointer(rh)),i}var ah={parse:ih},oh=Array(10);oh[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{posFormat:1,coverage:this.parsePointer(Z.coverage),value:this.parseValueRecord()};if(t===2)return{posFormat:2,coverage:this.parsePointer(Z.coverage),values:this.parseValueRecordList()};q.assert(!1,`0x`+e.toString(16)+`: GPOS lookup type 1 format must be 1 or 2.`)},oh[2]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();q.assert(t===1||t===2,`0x`+e.toString(16)+`: GPOS lookup type 2 format must be 1 or 2.`);var n=this.parsePointer(Z.coverage),r=this.parseUShort(),i=this.parseUShort();if(t===1)return{posFormat:t,coverage:n,valueFormat1:r,valueFormat2:i,pairSets:this.parseList(Z.pointer(Z.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(r),value2:this.parseValueRecord(i)}})))};if(t===2){var a=this.parsePointer(Z.classDef),o=this.parsePointer(Z.classDef),s=this.parseUShort(),c=this.parseUShort();return{posFormat:t,coverage:n,valueFormat1:r,valueFormat2:i,classDef1:a,classDef2:o,class1Count:s,class2Count:c,classRecords:this.parseList(s,Z.list(c,function(){return{value1:this.parseValueRecord(r),value2:this.parseValueRecord(i)}}))}}},oh[3]=function(){return{error:`GPOS Lookup 3 not supported`}},oh[4]=function(){return{error:`GPOS Lookup 4 not supported`}},oh[5]=function(){return{error:`GPOS Lookup 5 not supported`}},oh[6]=function(){return{error:`GPOS Lookup 6 not supported`}},oh[7]=function(){return{error:`GPOS Lookup 7 not supported`}},oh[8]=function(){return{error:`GPOS Lookup 8 not supported`}},oh[9]=function(){return{error:`GPOS Lookup 9 not supported`}};function sh(e,t){t||=0;var n=new Z(e,t),r=n.parseVersion(1);return q.argument(r===1||r===1.1,`Unsupported GPOS table version `+r),r===1?{version:r,scripts:n.parseScriptList(),features:n.parseFeatureList(),lookups:n.parseLookupList(oh)}:{version:r,scripts:n.parseScriptList(),features:n.parseFeatureList(),lookups:n.parseLookupList(oh),variations:n.parseFeatureVariationsList()}}var ch=Array(10);function lh(e){return new X.Table(`GPOS`,[{name:`version`,type:`ULONG`,value:65536},{name:`scripts`,type:`TABLE`,value:new X.ScriptList(e.scripts)},{name:`features`,type:`TABLE`,value:new X.FeatureList(e.features)},{name:`lookups`,type:`TABLE`,value:new X.LookupList(e.lookups,ch)}])}var uh={parse:sh,make:lh};function dh(e){var t={};e.skip(`uShort`);var n=e.parseUShort();q.argument(n===0,`Unsupported kern sub-table version.`),e.skip(`uShort`,2);var r=e.parseUShort();e.skip(`uShort`,3);for(var i=0;i<r;i+=1){var a=e.parseUShort(),o=e.parseUShort(),s=e.parseShort();t[a+`,`+o]=s}return t}function fh(e){var t={};e.skip(`uShort`),e.parseULong()>1&&console.warn(`Only the first kern subtable is supported.`),e.skip(`uLong`);var n=e.parseUShort()&255;if(e.skip(`uShort`),n===0){var r=e.parseUShort();e.skip(`uShort`,3);for(var i=0;i<r;i+=1){var a=e.parseUShort(),o=e.parseUShort(),s=e.parseShort();t[a+`,`+o]=s}}return t}function ph(e,t){var n=new Q.Parser(e,t),r=n.parseUShort();if(r===0)return dh(n);if(r===1)return fh(n);throw Error(`Unsupported kern table version (`+r+`).`)}var mh={parse:ph};function hh(e,t,n,r){for(var i=new Q.Parser(e,t),a=r?i.parseUShort:i.parseULong,o=[],s=0;s<n+1;s+=1){var c=a.call(i);r&&(c*=2),o.push(c)}return o}var gh={parse:hh};function _h(e,t){var n=new XMLHttpRequest;n.open(`get`,e,!0),n.responseType=`arraybuffer`,n.onload=function(){return n.response?t(null,n.response):t(`Font could not be loaded: `+n.statusText)},n.onerror=function(){t(`Font could not be loaded`)},n.send()}function vh(e,t){for(var n=[],r=12,i=0;i<t;i+=1){var a=Q.getTag(e,r),o=Q.getULong(e,r+4),s=Q.getULong(e,r+8),c=Q.getULong(e,r+12);n.push({tag:a,checksum:o,offset:s,length:c,compression:!1}),r+=16}return n}function yh(e,t){for(var n=[],r=44,i=0;i<t;i+=1){var a=Q.getTag(e,r),o=Q.getULong(e,r+4),s=Q.getULong(e,r+8),c=Q.getULong(e,r+12),l=void 0;l=s<c&&`WOFF`,n.push({tag:a,offset:o,compression:l,compressedLength:s,length:c}),r+=20}return n}function bh(e,t){if(t.compression===`WOFF`){var n=new Uint8Array(e.buffer,t.offset+2,t.compressedLength-2),r=new Uint8Array(t.length);if(dc(n,r),r.byteLength!==t.length)throw Error(`Decompression error: `+t.tag+` decompressed length doesn't match recorded length`);return{data:new DataView(r.buffer,0),offset:0}}return{data:e,offset:t.offset}}function xh(e,t){t??={};var n,r,i=new Wm({empty:!0}),a=new DataView(e,0),o,s=[],c=Q.getTag(a,0);if(c===`\0\0\0`||c===`true`||c===`typ1`)i.outlinesFormat=`truetype`,o=Q.getUShort(a,4),s=vh(a,o);else if(c===`OTTO`)i.outlinesFormat=`cff`,o=Q.getUShort(a,4),s=vh(a,o);else if(c===`wOFF`){var l=Q.getTag(a,4);if(l===`\0\0\0`)i.outlinesFormat=`truetype`;else if(l===`OTTO`)i.outlinesFormat=`cff`;else throw Error(`Unsupported OpenType flavor `+c);o=Q.getUShort(a,12),s=yh(a,o)}else throw Error(`Unsupported OpenType signature `+c);for(var u,d,f,p,m,h,g,_,v,y,b,x,S=0;S<o;S+=1){var C=s[S],w=void 0;switch(C.tag){case`cmap`:w=bh(a,C),i.tables.cmap=tl.parse(w.data,w.offset),i.encoding=new sl(i.tables.cmap);break;case`cvt `:w=bh(a,C),x=new Q.Parser(w.data,w.offset),i.tables.cvt=x.parseShortList(C.length/2);break;case`fvar`:d=C;break;case`fpgm`:w=bh(a,C),x=new Q.Parser(w.data,w.offset),i.tables.fpgm=x.parseByteList(C.length);break;case`head`:w=bh(a,C),i.tables.head=su.parse(w.data,w.offset),i.unitsPerEm=i.tables.head.unitsPerEm,n=i.tables.head.indexToLocFormat;break;case`hhea`:w=bh(a,C),i.tables.hhea=uu.parse(w.data,w.offset),i.ascender=i.tables.hhea.ascender,i.descender=i.tables.hhea.descender,i.numberOfHMetrics=i.tables.hhea.numberOfHMetrics;break;case`hmtx`:g=C;break;case`ltag`:w=bh(a,C),r=vu.parse(w.data,w.offset);break;case`COLR`:w=bh(a,C),i.tables.colr=rd.parse(w.data,w.offset);break;case`CPAL`:w=bh(a,C),i.tables.cpal=od.parse(w.data,w.offset);break;case`maxp`:w=bh(a,C),i.tables.maxp=xu.parse(w.data,w.offset),i.numGlyphs=i.tables.maxp.numGlyphs;break;case`name`:y=C;break;case`OS/2`:w=bh(a,C),i.tables.os2=Hu.parse(w.data,w.offset);break;case`post`:w=bh(a,C),i.tables.post=Gu.parse(w.data,w.offset),i.glyphNames=new ll(i.tables.post);break;case`prep`:w=bh(a,C),x=new Q.Parser(w.data,w.offset),i.tables.prep=x.parseByteList(C.length);break;case`glyf`:f=C;break;case`loca`:v=C;break;case`CFF `:u=C;break;case`kern`:_=C;break;case`GDEF`:p=C;break;case`GPOS`:m=C;break;case`GSUB`:h=C;break;case`meta`:b=C}}var T=bh(a,y);if(i.tables.name=Lu.parse(T.data,T.offset,r),i.names=i.tables.name,f&&v){var E=n===0,D=bh(a,v),O=gh.parse(D.data,D.offset,i.numGlyphs,E),k=bh(a,f);i.glyphs=Nd.parse(k.data,k.offset,O,i,t)}else if(u){var A=bh(a,u);iu.parse(A.data,A.offset,i,t)}else throw Error(`Font doesn't contain TrueType or CFF outlines.`);var j=bh(a,g);if(hu.parse(i,j.data,j.offset,i.numberOfHMetrics,i.numGlyphs,i.glyphs,t),fl(i,t),_){var M=bh(a,_);i.kerningPairs=mh.parse(M.data,M.offset)}else i.kerningPairs={};if(p){var N=bh(a,p);i.tables.gdef=ah.parse(N.data,N.offset)}if(m){var P=bh(a,m);i.tables.gpos=uh.parse(P.data,P.offset),i.position.init()}if(h){var F=bh(a,h);i.tables.gsub=Zu.parse(F.data,F.offset)}if(d){var ee=bh(a,d);i.tables.fvar=Qm.parse(ee.data,ee.offset,i.names)}if(b){var I=bh(a,b);i.tables.meta=ed.parse(I.data,I.offset),i.metas=i.tables.meta}return i}function Sh(e,t,n){return n??={},new Promise(function(r,i){_h(e,function(e,a){if(e){if(t)return t(e);i(e)}var o;try{o=xh(a,n)}catch(e){if(t)return t(e,null);i(e)}if(t)return t(null,o);r(o)})})}var Ch=/*#__PURE__*/ Object.freeze({__proto__:null,Font:Wm,Glyph:gl,Path:mc,BoundingBox:pc,_parse:Q,parse:xh,load:Sh}),wh=class extends Ds{constructor(e){super(e),this.reversed=!1}load(e,t,n,r){let i=this,a=new As(this.manager);a.setPath(this.path),a.setResponseType(`arraybuffer`),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(n){try{t(i.parse(n))}catch(t){r?r(t):console.error(t),i.manager.itemError(e)}},n,r)}parse(e){function t(e,t){let r=Math.round,i={},a=1e5/((e.unitsPerEm||2048)*72),o=e.encoding.cmap.glyphIndexMap,s=Object.keys(o);for(let c=0;c<s.length;c++){let l=s[c],u=e.glyphs.glyphs[o[l]];if(l!==void 0){let e={ha:r(u.advanceWidth*a),x_min:r(u.xMin*a),x_max:r(u.xMax*a),o:``};t&&(u.path.commands=n(u.path.commands)),u.path.commands.forEach(function(t){t.type.toLowerCase()===`c`&&(t.type=`b`),e.o+=t.type.toLowerCase()+` `,t.x!==void 0&&t.y!==void 0&&(e.o+=r(t.x*a)+` `+r(t.y*a)+` `),t.x1!==void 0&&t.y1!==void 0&&(e.o+=r(t.x1*a)+` `+r(t.y1*a)+` `),t.x2!==void 0&&t.y2!==void 0&&(e.o+=r(t.x2*a)+` `+r(t.y2*a)+` `)}),i[String.fromCodePoint(u.unicode)]=e}}return{glyphs:i,familyName:e.getEnglishName(`fullName`),ascender:r(e.ascender*a),descender:r(e.descender*a),underlinePosition:e.tables.post.underlinePosition,underlineThickness:e.tables.post.underlineThickness,boundingBox:{xMin:e.tables.head.xMin,xMax:e.tables.head.xMax,yMin:e.tables.head.yMin,yMax:e.tables.head.yMax},resolution:1e3,original_font_information:e.tables.name}}function n(e){let t=[],n;e.forEach(function(e){e.type.toLowerCase()===`m`?(n=[e],t.push(n)):e.type.toLowerCase()!==`z`&&n.push(e)});let r=[];return t.forEach(function(e){let t={type:`m`,x:e[e.length-1].x,y:e[e.length-1].y};r.push(t);for(let t=e.length-1;t>0;t--){let n=e[t],i={type:n.type};n.x2!==void 0&&n.y2!==void 0?(i.x1=n.x2,i.y1=n.y2,i.x2=n.x1,i.y2=n.y1):n.x1!==void 0&&n.y1!==void 0&&(i.x1=n.x1,i.y1=n.y1),i.x=e[t-1].x,i.y=e[t-1].y,r.push(i)}}),r}return t(Ch.parse(e),this.reversed)}};let Th=globalThis,Eh=/* @__PURE__ */ new Map,Dh=/* @__PURE__ */ new Map,Oh=0,kh=e=>e.position.byteLength+e.normal.byteLength+e.uv.byteLength;async function Ah(e){let t=Eh.get(e);return t||(t=Promise.all((e?[`/assets/be-vietnam-pro-latin-700-normal-C2EtzaOi.woff`,`/assets/be-vietnam-pro-latin-ext-700-normal-4Hjo2OtD.woff`,`/assets/be-vietnam-pro-vietnamese-700-normal-By_5yT39.woff`]:[`/assets/be-vietnam-pro-latin-400-normal-bXgqVju9.woff`,`/assets/be-vietnam-pro-latin-ext-400-normal-DYBYyMQr.woff`,`/assets/be-vietnam-pro-vietnamese-400-normal-BuGn0gnm.woff`]).map(async e=>{let t=await fetch(e);if(!t.ok)throw Error(`Chưa tải được phông chữ 3D.`);return new wh().parse(await t.arrayBuffer())})).then(e=>new Ls().parse({...e[0],glyphs:Object.assign({},...e.map(e=>e.glyphs))})),Eh.set(e,t),t.catch(()=>Eh.delete(e))),t}Th.onmessage=e=>{let{id:t,text:n,bold:r}=e.data;(async()=>{let e=JSON.stringify([n,r]),i=Dh.get(e);if(i)Dh.delete(e),Dh.set(e,i);else{let t=new cs((await Ah(r)).generateShapes(n,1),{depth:1,bevelEnabled:!1,curveSegments:4,steps:1});t.computeBoundingBox();let a=t.boundingBox?.getCenter(new W)||new W;t.translate(-a.x,-a.y,0),i={position:new Float32Array(t.getAttribute(`position`).array),normal:new Float32Array(t.getAttribute(`normal`).array),uv:new Float32Array(t.getAttribute(`uv`).array)},t.dispose();let o=kh(i);for(;Oh+o>16777216&&Dh.size;){let e=Dh.keys().next().value;if(e===void 0)break;let t=Dh.get(e);t&&(Oh-=kh(t)),Dh.delete(e)}o<=16777216&&(Dh.set(e,i),Oh+=o)}let a={position:i.position.slice(),normal:i.normal.slice(),uv:i.uv.slice()};Th.postMessage({id:t,...a},[a.position.buffer,a.normal.buffer,a.uv.buffer])})().catch(e=>Th.postMessage({id:t,error:e instanceof Error?e.message:`Không dựng được chữ 3D.`}))}})();