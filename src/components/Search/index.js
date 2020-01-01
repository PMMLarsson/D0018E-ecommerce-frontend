import React, { useState } from "react"
import Downshift, { resetIdCounter } from "downshift"
import { Link } from "gatsby"
import { ApolloConsumer } from "react-apollo"
import { debounce } from "lodash"

import { SEARCH } from "../../queries"
import { EMOJIS } from "../enums"


const Search = () => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  
  const onChange = debounce(async (e, client) => {
    if(e.target.value === "") {
      return
    }
    // turn loading on
    setLoading(true)
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH,
      variables: { input: e.target.value },
      fetchPolicy:"no-cache",
    })
    setResult(res.data.search)
    setLoading(loading)
  }, 350)
  
  resetIdCounter()
  
  return (
    <>
      {result &&
      <Downshift
        itemToString={result => (result && result.type !== null ? result.type : "")}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
        }) => (
          <div style={{ paddingTop: "5px" }}>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: "search",
                    placeholder:
                      "Search for emoji type",
                    id: "search",
                    className: loading ? "loading" : "",
                    onChange: (e) => {
                      e.persist()
                      onChange(e, client)
                    },
                  })}
                />
              )}
            </ApolloConsumer>
            {isOpen && result && (
              <div style={{ position: "absolute", minWidth:"200px" }}>
                {result.map((result) => (
                  <Link
                    to={`/emoji?type=${result.type}`}
                    style={{color: "black", textDecoration: "none"}}
                    key={result.type}
                  >
                    <div {...getItemProps({ item: result })} style={{ textDecoration: "none", color: "inherit", position: "relative", border: "1px solid black", background:"white", display:"flex", borderLeft: "5px solid black"}}>
                      
                      {
                        // Paragraph to list out what to be shown on search. Currently: Created date, amount,
                        // refunded, location id and name, user id and email and title of items.
                        <p>
                          {EMOJIS[result.type]}
                          <strong >{result.type}</strong>
                        </p>
                      }
                    </div>
                  </Link>
                ))}
                {!result.length && !loading && (
                  <div> Nothing Found {inputValue}</div>
                )}
              </div>
            )}
          </div>
        )}
      </Downshift>
      }
    </>
  )
}

export default Search
