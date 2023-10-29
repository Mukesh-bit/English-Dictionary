const input = document.querySelector("#input")
const info_text = document.querySelector("#info-text")
const meaning_cont = document.querySelector("#meaning-cont")
const title = document.querySelector("#title")
const meaning = document.querySelector("#meaning")
const audio = document.querySelector("#audio")

const fetchAPI = async (word) => {
    try {
        info_text.computedStyleMap.display = "block"

        meaning_cont.style.display = "none"

        info_text.innerHTML = "Loading..."

        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data = await res.json()

        if (data.title) {
            meaning_cont.style.display = "block"
            title.innerHTML = word;
            meaning.innerHTML = "N/A";
            audio.style.display = "none"
            info_text.style.display = "none"

        } else {

            info_text.style.display = "none"

            meaning_cont.style.display = "block"

            title.innerHTML = data[0].word

            meaning.innerHTML = data[0].meanings[0].definitions[0].definition

            audio.src = data[0].phonetics[0].audio
        }



    } catch (error) {
        console.log(error)
        info_text.innerHTML = "an error happened, try again later"
    }

}

input.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value)
    }
})