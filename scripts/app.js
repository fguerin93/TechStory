const dom = document.querySelector('.plop')
const plane = new Element3d(window.innerWidth, window.innerHeight, "png", './models/phone/mobile-phone.obj', './models/phone/phone.png', 0.08, dom)




window.addEventListener('resize', ()=>{
    plane.resize()
})


let killTo = (toDie)=>{
    delete toDie
    const deadCanvas = dom.querySelector('canvas')
    deadCanvas.remove(deadCanvas)
    const object = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.003, dom)
    return object
}


