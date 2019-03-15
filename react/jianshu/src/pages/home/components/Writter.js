import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { WritterWrapper, WritterItem, WritterName, WritterDesc, WritterRight } from '../style'

class Writter extends PureComponent {
  render () {
    const { list } = this.props
    return (
      <WritterWrapper>
        {
          list.map(item => (
            <WritterItem key={item.get('id')}>
              <img 
              alt=""
              className="img"
              src={item.get('imgUrl')} />
              <WritterName>
                { item.get('name') }
                <WritterDesc>{ item.get('desc') }</WritterDesc>
              </WritterName>
              <WritterRight>
                + 关注
              </WritterRight>
            </WritterItem>
          ))
        }
      </WritterWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['home', 'writterList'])
})

export default connect(mapStateToProps, null)(Writter)