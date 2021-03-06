function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
    }
    return hashParams;
}

var headers = new Headers({
    Authorization: `Bearer ${getHashParams().access_token}`
})

function addPlaylist(result, repet){
    for (let i = 1; i <= repet; i++) {
        fetch(`https://api.spotify.com/v1/users/${result.id}/playlists`, 
        {method: 'POST',
        headers,
        body: JSON.stringify({
            name: `feijuca ${i}`,
            description: "feijuuca",
            public: true
        })})
        .then(r => r.json()
        .then(playlist => 
            fetch(`https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/top-tracks?market=BR`, {method: 'GET', headers})
            .then(pls => pls.json()
            .then(tracks => {
                tracks.tracks.forEach(track => {
                    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?uris=${track.uri}`, {method: 'POST', headers})
                });
            }))
        ))  
    }
}

const urlParams = new URLSearchParams(location.href);

if(urlParams.has("token_type")){
    document.getElementById('aperta').classList.add('display')
}

document.getElementById('aperta').addEventListener('click', () => {
    
    fetch('https://api.spotify.com/v1/me', 
    {method: 'GET'
    ,headers})
    .then(
        response => {
        response.json().
        then(result => 
            addPlaylist(result, 10)
        )   
    }) 
})