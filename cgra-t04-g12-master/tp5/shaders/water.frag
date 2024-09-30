#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

    vec2 offset2 = vec2(timeFactor, timeFactor);

    vec4 color = texture2D(uSampler, vTextureCoord + offset2);

    gl_FragColor = color;
}