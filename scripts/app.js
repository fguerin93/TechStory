const dom = document.querySelector('.plop')
const plane = new Element3d(window.innerWidth, window.innerHeight, "png", './models/watch/Wirst Watch.obj', './models/watch/Wirst Watch Texture.png', 0.0005, dom)




window.addEventListener('resize', ()=>{
    plane.resize()
})


let killTo = (toDie)=>{
    delete toDie
    const deadCanvas = dom.querySelector('canvas')
    deadCanvas.remove(deadCanvas)
    const object = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.05, dom)
    return object
}


