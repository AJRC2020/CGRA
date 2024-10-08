attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;
float height;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    vec4 color = texture2D(uSampler2, vTextureCoord);

    vec3 offset = vec3(0.0, 0.0, 0.0);

    height = color.r * 0.1;

    offset = height * vec3(0.0, 0.0, 1.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
