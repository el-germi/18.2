const URL = "https://65428c4dad8044116ed39053.mockapi.io/users";

const Resultados = document.getElementById("results");

const BotonGet = document.getElementById("btnGet1");
const BotonPost = document.getElementById("btnPost");
const BotonPut = document.getElementById("btnPut");
const BotonDelete = document.getElementById("btnDelete");

const inputPutId = document.getElementById("inputPutId");

const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");

const inputGet1Id = document.getElementById("inputGet1Id");

const inputDelete = document.getElementById("inputDelete");

function mostrar(arr) {
    Resultados.innerHTML = ""
    arr.forEach(i => Resultados.innerHTML += `
        <div>
            ID: ${i.id}<br/>
            NAME: ${i.name}<br/>
            LASTNAME: ${i.lastname}<br/>
        </div>`)
}

BotonGet.addEventListener("click", () => {
    if (inputGet1Id.value != "")
        fetch(URL + "/" + inputGet1Id.value)
            .then(coso => coso.json())
            .then(item => {
                mostrar([item])
            }).catch(error => {
                alert("ocurrio un error" + error)
            })
    else
        fetch(URL)
            .then(coso => coso.json())
            .then(items => {
                mostrar(items)
            }).catch(error => {
                alert("ocurrio un error" + error)
            })
});

BotonDelete.addEventListener("click", () => {
    fetch(URL + "/" + inputDelete.value, {
        method: 'DELETE',
        redirect: "follow"
    }).then(aa => {
        fetch(URL)
            .then(resa => resa.json())
            .then(resa => mostrar(resa));
    });
});

BotonPost.addEventListener("click", () => {
    fetch(URL, {
        method: "POST",
        redirect: "follow",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: inputPostNombre.value,
            lastname: inputPostApellido.value
        })
    }).then(aa => {
        fetch(URL)
            .then(resa => resa.json())
            .then(resa => mostrar(resa));
    });
});


BotonPut.addEventListener("click", () => {
    fetch(URL + "/" + inputPutId.value, {
        method: "GET",
        redirect: "follow"
    })
        .then(res => res.json())
        .then(res => Swal.fire({
            title: 'Modificar ' + inputPutId.value,
            html: `<input id="name" class="swal2-input" value="${res.name}">
            <input id="lastname" class="swal2-input" value="${res.lastname}">`,
            focusConfirm: false,
            preConfirm: () => {
                res.name = document.getElementById('name').value;
                res.lastname = document.getElementById('lastname').value;
                return res;
            }
        }))
        .then(res => {
            if (res.isConfirmed) {
                fetch(URL + "/" + inputPutId.value, {
                    method: "PUT",
                    redirect: "follow",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(res.value)
                })
                    .then(aa => {
                        fetch(URL)
                            .then(resa => resa.json())
                            .then(resa => mostrar(resa));
                    });
            }
        });
});