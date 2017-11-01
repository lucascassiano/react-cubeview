 uniform float percent;

        uniform sampler2D texture1;
        uniform sampler2D texture2;

        varying vec2 vUv;

        void main() {
            gl_FragColor = texture2D( texture1, vUv);
            vec4 tex2 = texture2D( texture2, vUv );
            if(tex2.a - percent < 0.0) {
                gl_FragColor.a = 0.0;
                //or without transparent = true use
                //discard; 
            }

        }