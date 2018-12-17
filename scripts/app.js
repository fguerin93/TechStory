const dom = document.querySelector('.plop')
//const plane = new Element3d(window.innerWidth, window.innerHeight, "png", './models/airplane2/1405 Plane.obj', './models/airplane2/1405 Plane.png', 0.08, dom)

// const cb = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.03, dom)

const glasses = new Element3d(window.innerWidth, window.innerHeight, "material", './models/glasses/Glasses_01.obj', new THREE.MeshLambertMaterial({ color: 0x6c92dd }), 0.05, dom)



// window.addEventListener('resize', ()=>{
//     plane.resize()
// })


let killTo = (toDie)=>{
    delete toDie
    const deadCanvas = dom.querySelector('canvas')
    deadCanvas.remove(deadCanvas)
    const object = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.003, dom)
    return object
}


