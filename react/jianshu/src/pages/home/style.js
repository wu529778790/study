import styled from 'styled-components'

export const HomeWrapper  = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
`
export const HomeLeft  = styled.div`
  float: left;
  width: 625px;
  margin-left: 15px;
  padding-top: 30px;
  .banner-img {
    width: 625px;
    height: 270px;
  }
`
export const HomeRight  = styled.div`
  float: right;
  width: 280px;
`

export const TopicWrapper = styled.div`
  padding: 20px 0 10px 0;
  overflow: hidden;
  margin-left: -10px;
  border-bottom: 1px solid #dcdcdc;
`

export const TopicItem = styled.div`
  float: left;
  height: 32px;
  line-height: 32px;
  background: #f7f7f7;
  margin-left: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;
  padding-right: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .topic-pic {
    margin-right: 10px;
    width: 32px;
    height: 32px;
    display: block;
    float: left;
    border-radius: 4px;
  }
`

export const ListItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ececec;
  overflow: hidden;
  .pic {
    float: right;
    display: block;
    width: 125px;
    height: 100px;
    border-radius: 5px;
  }
`
export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title {
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
`

export const RecommendWrapper = styled.div`
  margin: 30px 0;
  width: 280px;
`

export const RecommendItem = styled.div`
  width: 280px;
  height: 50px;
  background: url(${(props) => props.imgUrl});
  background-size: contain;
`

export const WritterWrapper = styled.div`
  width: 278px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  height: 300px;
  padding: 0 10px;
  box-sizing: border-box;
`

export const WritterItem = styled.div`
  width: 278px;
  height: 48px;
  margin-top: 10px;
  overflow: hidden;
  .img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    float: left;
  }
`
export const WritterName = styled.div`
  float: left;
  padding: 10px;
  font-size: 14px;
`
export const WritterDesc = styled.div`
  font-size: 12px;
  padding: 6px 0;
`

export const WritterRight = styled.div`
  padding-top: 10px;
  font-size: 13px;
  color: #42c02e;
`

export const LoadMore = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #a5a5a5;
  color: #fff;
  margin: 30px 0;
  border-radius: 20px;
  cursor: pointer;
`

export const BackTop = styled.div`
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 13px;
`