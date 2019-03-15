import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreators } from '../store'
import { Link } from 'react-router-dom'
class List extends PureComponent {
  render() {
    const { list, getMoreList, articlePage } = this.props
    return (
      <ListItem>
        <div>
          {
            list.map((item, index) => (
              <Link key={index} to={'/detail/' + item.get('id')}>
                <ListItem>
                  <img
                    className="pic"
                    src={item.get('imgUrl')} alt="" />
                  <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            ))
          }
          <LoadMore onClick={() => getMoreList(articlePage)}>加载更多</LoadMore>
        </div>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(['home', 'articleList']),
  articlePage: state.getIn(['home', 'articlePage'])
})

const mapDispatchToProps = (dispatch) => ({
  getMoreList(articlePage) {
    dispatch(actionCreators.getMoreList(articlePage))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)