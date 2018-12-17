class Element3d{
    constructor(width, height, type="",obj='',texture='', ratio = null, DOM){
        //where you put the canvas 
        this.dom= DOM 

        //window height and width
        this.width = width
        this.height = height

        //path of the png/mlt and obj file
        this.obj = obj
        this.texture = texture
        //type of the texture
        this.type = type

        //scale of this object
        this.ratio = ratio

        this.meshs = []

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
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setClearColor(0xffffff, 0)
        this.dom.appendChild( this.renderer.domElement)


        //ORBIT CONTROL SETUP   
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.enableZoom = false
    }
    setLight(){
        let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)// voir ou changer, la lumière a discuter
        keyLight.position.set(1, 1, 1)

        let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)// voir ou changer, la lumière a discuter
        fillLight.position.set(1.5, 1, 0.5)

        let ambientLight = new THREE.AmbientLight(0xffffff)

        let backLight = new THREE.DirectionalLight(0x000000, 1.0)
        backLight.position.set(100, 0, -100).normalize()
        
        //back lights
        let backLightRight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)// voir ou changer, la lumière a discuter
        backLightRight.position.set(-1,-1,-1)
        
        let backLightLeft = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)// voir ou changer, la lumière a discuter
        backLightLeft.position.set(-1.5,-1,-1.5)

        // lights add to scene
        this.scene.add(keyLight)
        this.scene.add(fillLight)
        this.scene.add(ambientLight)
        this.scene.add(backLight)
        this.scene.add(backLightLeft)
        this.scene.add(backLightRight)
    }

    objectloading(){
        const objLoader =  new THREE.OBJLoader()

        //texture manager
        switch(this.type){
            case "mtl":
                console.log("MTL")
                    this.mtlLoad()
                break

            case "png":
                console.log("PNG")

                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.scene.add(object)
                    this.pngLoad(object)
                    
                })
                break
            
            case "material":
                console.log("MATERIAL")

                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    for(const _child of object.children)
                    {
                        _child.material = this.texture
                    }
                    this.scene.add(object)
                    
                })
                break

            default:
                console.log("NONE")
                
                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.scene.add(object)
                })
        }


    }
    //png texture loader
    pngLoad(object){
        let textureLoader = new THREE.TextureLoader()

        textureLoader.load(this.texture, function(texture){
            const material = new THREE.MeshStandardMaterial({ map: texture })
            for(const _child of object.children){
                _child.material = material
                
            }
        })
    }

    //mlt texture loader NE MARCHE PAS POUR L'INSTANT
    mtlLoad(){
        let mtlTextureLoader = new THREE.MTLLoader() 

        mtlTextureLoader.load(this.texture, (texture)=>{
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
    
    resize(){


        this.width = window.innerWidth
        this.height = window.innerHeight


        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize( window.innerWidth, window.innerHeight)

    
        
    }
    
}