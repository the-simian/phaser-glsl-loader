'use strict'

var webpack = require('webpack'),
  path = require('path'),
  chai = require('chai'),
  fs = require('fs'),
  expect = chai.expect,
  phaserGlslLoader = require('../index.js'),
  fixtures = path.join(__dirname, 'fixtures');


describe('Given a phaser-glsl-loader', function () {
  describe('When I provide a valid filepath', function () {
    it('Should convert the glsl file into a format consumable by phaser', function () {

      var testFile = path.join(fixtures, 'testshader.frag');
      var rawStuff = fs.readFileSync(testFile, "utf-8");

      var expectedResult = 'module.exports=["#ifdef GL_ES","precision mediump float;","#endif","uniform float time;","uniform vec2 mouse;","uniform vec2 resolution;","void main( void ) {","float treshhold = 200.;","vec2 position = gl_FragCoord.xy - mouse.xy * resolution.xy;","float rad = sqrt(position.x * position.x + position.y * position.y) ;","float amp = (treshhold-rad)/treshhold;","if(amp<0.0){ amp=0.0;}","float gray = (sin(rad/ 10. - time * 3.)+0.5)*amp;","gl_FragColor = vec4(gray,gray,gray, 1.0 );","}"];'

      expect(phaserGlslLoader.call({}, rawStuff))
        .to
        .be
        .equal(expectedResult);
    });
  });
});
