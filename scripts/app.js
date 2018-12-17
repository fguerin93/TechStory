const dom = document.querySelector('.plop')
const plane = new Element3d(window.innerWidth, window.innerHeight, "png", './models/airplane/Airplane.obj', './models/airplane/Airplane Texture.png', 0.01, dom, {x:30,y:10 ,z: 10})

// const cb = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.03, dom, {x:-8,z:0})

// const glasses = new Element3d(window.innerWidth, window.innerHeight, "material", './models/glasses/Glasses_01.obj', new THREE.MeshLambertMaterial({ color: 0x6c92dd }), 0.05, dom)



// window.addEventListener('resize', ()=>{
//     plane.resize()
// })

// function to kill a canvas and replace it with a other
let killTo = (toDie)=>{
    delete toDie
    const deadCanvas = dom.querySelector('canvas')
    deadCanvas.remove(deadCanvas)
    const object = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.003, dom)
    return object
}


