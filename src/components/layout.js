import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import IdentityModal, {
  useIdentityContext,
  IdentityContextProvider,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const url = "https://authsite.netlify.com/"

  const [dialog, setDialog] = React.useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <IdentityContextProvider url={url}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          <button className="RNIW_btn" onClick={() => setDialog(true)}>
            Log In
          </button>
        </div>
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={user => console.log("hello")}
          onSignup={user => console.log("welcome")}
          onLogout={() => console.log("bye")}
        />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </IdentityContextProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
