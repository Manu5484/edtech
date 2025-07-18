import React from 'react'
import { NavLink } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Codebloack = (props) => {
  return (
    <div className='codeblockcontainer'>
      <div className='notcodeblock'>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <div className='notcodebuttons'>
          <NavLink to={'/signup'}>
            <button className='primarybutton'>Try it Yourself</button>
          </NavLink>
          <NavLink to={'/login'}>
            <button className='secondarybutton'>Learn More</button>
          </NavLink>
        </div>
      </div>
      <div className='codeblock'>
        <pre className="code-animation">
          <TypeAnimation
            sequence={[
              props.code,
              2000,
              '', // reset
              50
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              display: 'block',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              margin: 0,
              textAlign: 'left',
              position:'relative',
              zIndex:9,
            }}
          />
        </pre>

      </div>
    </div>
  )
}

export default Codebloack
