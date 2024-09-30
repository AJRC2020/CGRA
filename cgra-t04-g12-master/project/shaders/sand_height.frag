#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 position;

uniform sampler2D texture;
uniform sampler2D map;

void main() {
    vec4 color = texture2D(texture, vTextureCoord);
    vec4 color_map = texture2D(map, vTextureCoord);

    color = vec4 (color.r * color_map.r, color.g * color_map.g, color.b * color_map.b, 1.0);

    gl_FragColor = color;
}