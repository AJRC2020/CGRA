#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D texture;
uniform sampler2D map;
float height;
float powX2;
float powZ2;

varying vec2 vTextureCoord;
varying vec3 position;

void main() {
    vTextureCoord = aTextureCoord;

    vec4 color = texture2D(map, vTextureCoord);

    vec3 offset = vec3(0.0, 0.0, 0.0);

    height = 2.0 * (color.r - 0.5);

    offset = -height * vec3(0.0, 1.0, 0.0);

    position = aVertexPosition + offset + vec3(0, 0.7, 0);

    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}
