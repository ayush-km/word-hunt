import React from "react";
import "./Definitions.css";

function Definitions({word, category, meanings, lightMode}) {
    return (
      <div className="meanings">
        {meanings[0] && word && category === "en" && (
          <audio
            src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
            style={{
              width: "100%",
            }}
            controls
          >
            Your Browser Does Not Support Audio Elements
          </audio>
        )}

        {word === "" ? (
          <span className="subtitle">Start by typing a word in search box</span>
        ) : (
          meanings.map((mean) =>
            mean.meanings.map((item) =>
              item.definitions.map((def) => (
                <div
                  className="singleMean"
                  style={{
                    backgroundColor: lightMode ? "#3b5360" : "whitesmoke",
                    color: lightMode ? "white" : "black",
                  }}
                >
                  <strong>{def.definition}</strong>
                  <br />
                  {def.example && (
                    <span>
                      <strong>Example: </strong>
                      {def.example}
                    </span>
                  )}
                  <br />
                  {def.synonyms && (
                    <span>
                      <strong>Synonyms: </strong>
                      {def.synonyms.map((s) => `${s}, `)}
                    </span>
                  )}
                  <hr style={{ backgroundColor: "black", width: "100%" }} />
                </div>
              ))
            )
          )
        )}
      </div>
    );
}

export default Definitions;
