#ifdef GL_ES
precision highp float;
#endif

varying vec3 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float ratio;
uniform float red;
uniform float green;
uniform float blue;

void main() {
	if (coords.z > ratio)
	gl_FragColor =  vec4(red, green, blue, 1.0);

	else
	gl_FragColor = texture2D(uSampler, vTextureCoord);
}