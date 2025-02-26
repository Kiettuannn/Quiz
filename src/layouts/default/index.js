import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { Col, Layout, Row } from 'antd';
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
const { Content } = Layout;

function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);
  // console.log(isLogin);
  return (
    <>
      <Layout className="layout-default">
        <header className="header" >
          <Row className="header__row">
            <Col className="header__row__logo" >
              <NavLink to="/">
                Quiz
              </NavLink>
            </Col>
            <Col className="header__row__menu">
              {token && (
                <>
                  <ul>
                    <li>
                      <NavLink to="/topic">
                        Chủ đề
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/answers">
                        Câu trả lời
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/result">
                        Kết quả
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}
            </Col>
            <Col className="header__row--account">
              {token ? (
                <>
                  <NavLink to="/logout">
                    Đăng xuất
                  </NavLink>
                </>
              )
                : (
                  <>
                    <NavLink to="/login">
                      Đăng nhập
                    </NavLink>
                    <NavLink to="/register">
                      Đăng ký
                    </NavLink>
                  </>
                )}
            </Col>
          </Row>
        </header>
        <Content className="content">
          <Outlet />
        </Content>
        <footer className="footer">Copy righy by @KietKlat</footer>
      </Layout>
    </>
  )
}
export default LayoutDefault;