/* Element3d class: prototype of the constructor:
    - width -> width of the model canvas
    - height -> height of the model canvas
    - percent -> percentage of the window take by the 3d canvas
    - type -> string with the type of the texture :
        - "mtl" -> for mtl texture 
        - "png" -> for png texture
        - "material" -> for custom THREE.js texture
        - "" -> object without texture
    - obj -> string with the path of the .obj model file
    - texture -> texture of the .obj file, could be :
        - a string containing the path of an ".png" file
        - a string containing the path of an  ".mtl" file
        - a new THREE.js Mesh Material
    - ratio -> float number with the scale of the model
    - DOM -> DOM element where the canvas will be create
    - rotateAngle -> angle in degree of the object rotation
    - camPos -> an object with x / y / z of the camera position
    - objPos -> postion of the object in x / y / z axes
*/

class Element3d{
    constructor(width, height,percent, type="",obj="",texture, ratio = null, DOM, rotateAngle ,camPos={x:0,y:0,z:-3}, objPos={x:0,y:0,z:0}){
        //where you put the canvas 
        this.dom= DOM 

        //window height, width and percentage
        this.width = width
        this.height = height
        this.percent = percent

        //path of the png/mlt and obj file
        this.obj = obj
        this.texture = texture
        //type of the texture
        this.type = type

        //scale and angle rotation of this object
        this.ratio = ratio
        this.angle = rotateAngle

        //position of the camera
        this.camPos = {
            x: camPos.x !=undefined ? camPos.x : 0,
            y: camPos.y !=undefined ? camPos.y : 0,
            z: camPos.z !=undefined ? camPos.z : -3
        }
        //position of the object
        this.objPos = {
            x: objPos.x !=undefined ? objPos.x : 0,
            y: objPos.y !=undefined ? objPos.y : 0,
            z: objPos.z !=undefined ? objPos.z : 0
        }

        this.meshs = []

        //methods call
        this.setup()
        this.setLight()
        this.objectloading()
        this.loop()
        this.cursorEvent()
    }

    setup(){
        this.scene = new THREE.Scene()

        //camera management
        this.camera = new THREE.PerspectiveCamera( 75, this.width/this.height)
        this.camera.position.x = this.camPos.x
        this.camera.position.y = this.camPos.y
        this.camera.position.z = this.camPos.z

        //rendering management
        this.renderer = new THREE.WebGLRenderer({ alpha: true })
        this.renderer.setSize( this.width,this.height )
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setClearColor(0xffffff, 0)
        this.dom.appendChild( this.renderer.domElement)


        //orbit control setup 
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.6
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableKeys = false
    }
    //lights methods
    setLight(){
        let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)
        keyLight.position.set(1, 1, 1)

        let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)
        fillLight.position.set(1.5, 1, 0.5)

        let ambientLight = new THREE.AmbientLight(0xffffff)

        let backLight = new THREE.DirectionalLight(0x000000, 1.0)
        backLight.position.set(100, 0, -100).normalize()
        
        //back lights
        let backLightRight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)
        backLightRight.position.set(-1,-1,-1)
        
        let backLightLeft = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 90%)'), 0.5)
        backLightLeft.position.set(-1.5,-1,-1.5)

        // lights add to scene
        this.scene.add(keyLight)
        this.scene.add(fillLight)
        this.scene.add(ambientLight)
        this.scene.add(backLight)
        this.scene.add(backLightLeft)
        this.scene.add(backLightRight)
    }

    /*load the .obj file, different type of .obj file:
        - "mtl" -> for mtl texture 
        - "png" -> for png texture
        - "material" -> for custom THREE.js texture
        - "" -> object without texture
    */
    objectloading(){
        const objLoader =  new THREE.OBJLoader()

        //texture manager
        switch(this.type){
            case "mtl":
                    this.mtlLoad()
                    
                break

            case "png":
                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.position3D(object)
                    this.scene.add(object)
                    this.pngLoad(object)
                    
                })
                break
            
            case "material":
                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.position3D(object)
                    for(const _child of object.children){
                        _child.material = this.texture
                    }
                    this.scene.add(object)
                    
                })
                break

            default:
                objLoader.load(this.obj, (object)=>{
                    object.scale.set(this.ratio, this.ratio,this.ratio)
                    this.position3D(object)
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


    mtlLoad(){
        let mtlTextureLoader = new THREE.MTLLoader() 

        mtlTextureLoader.load(this.texture, (texture)=>{
            texture.preload()
            const objLoader =  new THREE.OBJLoader()
            
            objLoader.setMaterials(texture)
            objLoader.load(this.obj, (object)=>{

                this.position3D(object)
                this.scene.add(object)

            })


        })
    }

    //position of the object
    position3D(object){
        object.rotation.y = this.angle *Math.PI/180
        object.position.set(this.objPos.x, this.objPos.y, this.objPos.z)
    }
  
    //request animation frame function
    loop(){
        let animate= ()=>{
            requestAnimationFrame(animate)
            
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
    
    //rezise function, call outside the class
    resize(){
        this.width = window.innerWidth/100*this.percent
        this.height = window.innerHeight/100*this.percent


        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize( this.width, this.height)
     
    }

    cursorEvent(){
        this.renderer.domElement.addEventListener('mousedown', ()=>{
            this.renderer.domElement.style.cursor = "grabbing"
        })


        this.renderer.domElement.addEventListener('mouseup', ()=>{
            this.renderer.domElement.style.cursor = "grab"
        })
    }
    
}