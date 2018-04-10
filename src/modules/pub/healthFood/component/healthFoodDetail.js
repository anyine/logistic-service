import React from 'react';
import { NavBar, Icon, Card, WingBlank, WhiteSpace, List, Toast } from 'antd-mobile';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';
import HealthFood from 'Img/health-food.jpg';
const Item = List.Item;
const Brief = Item.Brief;

const getNewsDetailInfoUrl = restUrl.ADDR + 'News/getNewsDetail';

class healthFoodDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          data: {}
        };
    }
  
    componentDidMount() {
      this.getNewsDetailInfo();
    }

    //获取产品详情
    getNewsDetailInfo = (id) => {
      let param = {};
      param.newsId = '35e43256-36c3-4ff9-8e68-c7ddc87f9ba5';//this.props.params.id;
      Toast.loading('正在加载...', 0);
      ajax.getJSON(getNewsDetailInfoUrl, param, (data) => {
        data =  data.backData;
        data.news_content = JSON.parse(data.news_content);
        data.contentHtml = draftToHtml(data.news_content);
        console.log('contentHtml === ', data.contentHtml);
        this.setState({
          data,
          loading: false
        });
        Toast.hide();
      });
    }

    //返回
    callback = () => {
      this.context.router.goBack();
    } 

    render() {
      let { data } = this.state;
        return (
          <div className="healthFood">
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              leftContent="返回" 
              onLeftClick={this.callback}
            >详情页</NavBar>
            <div className='zui-content healthFoodDetail'>
              <div className="wrap-html" dangerouslySetInnerHTML={{__html: data.contentHtml}}></div>   
            </div>
          </div>
        );
    }
}

healthFoodDetail.contextTypes = {  
    router: React.PropTypes.object  
} 

export default  healthFoodDetail;