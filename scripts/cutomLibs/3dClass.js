class Element3d{
    constructor(width, height, type="",obj='',beautify='', ratio = null){
        //window height and width
        this.width = width
        this.height = height

        //path of the png/mlt and obj file
        this.obj = obj
        this.beautify = beautify
        //type of the texture
        this.type = type

        //scale of this object
        this.ratio = ratio

        this.setup()
        this.setLight()
        this.objectloading()
        this.loop()
    }

    setup(){
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, this.width/this.height)// a voir genre vraiment 
        this.camera.position.z = -3

        this.renderer = new THREE.WebGLRenderer({ alpha: true })
        this.renderer.setSize( this.width,this.height )
        this.renderer.setClearColor(0xffffff, 0)
        document.body.appendChild( this.renderer.domElement)


        //ORBIT CONTROL SETUP   
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.enableZoom = true
    }
    setLight(){
        let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(255, 100%, 100%)'), 1.0)
        keyLight.position.set(1, 0, 1)

        let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(255, 100%, 100%)'), 1.0)
        fillLight.position.set(1.5, 1, 0.5)

        let ambientLight = new THREE.AmbientLight(0xffffff)

        let backLight = new THREE.DirectionalLight(0x000000, 1.0)
        backLight.position.set(100, 0, -100).normalize()

        this.scene.add(keyLight)
        this.scene.add(fillLight)
        this.scene.add(ambientLight)
        this.scene.add(backLight)
    }

    objectloading(){
        //texture manager
        switch(this.type){
            case "mtl":
                console.log("MTL")
                    this.mtlLoad()
                break

            case "png":
                console.log("PNG")
                const objLoader =  new THREE.OBJLoader()

                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.scene.add(object)
                    this.pngLoad(object)
                })
                break

            default:
                console.log("NONE")
                const objLoaderN =  new THREE.OBJLoader()

                objLoaderN.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.scene.add(object)
                })
        }


    }
    //png texture loader
    pngLoad(object){
        let textureLoader = new THREE.TextureLoader()

        textureLoader.load(this.beautify, function(texture){
            const material = new THREE.MeshStandardMaterial({ map: texture })
            for(const _child of object.children){
                _child.material = material
                
            }
        })
    }

    //mlt texture loader NE MARCHE PAS POUR L'INSTANT
    mtlLoad(){
        let mtlTextureLoader = new THREE.MTLLoader() 

        mtlTextureLoader.load(this.beautify, (texture)=>{
            texture.preload()
            const objLoader =  new THREE.OBJLoader()
            
            objLoader.setMaterials(texture)
            objLoader.load(this.obj, (object)=>{
                this.scene.add(object)

            })


        })
    }
    
    //request animation frame function
    loop(){
        let animate= ()=>{
            requestAnimationFrame(animate)
            // controls.update()
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
    
}