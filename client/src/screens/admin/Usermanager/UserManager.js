import Navbar from "../../common/Navbar/Navbar";
import TableExample from "./components/TableExample";
import SearchField from "react-search-field";

const UserManager = () => {
  document.title = "User Manager";
  return (
    <div className="usermanager">
      <Navbar/>
      <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "100%", paddingRight: "2vw", paddingLeft: "2vw" }}>
        <div
          style={{
            width: "100%",
            height: "auto",
            textAlign: "right",
            marginBottom: "6.3vh",
          }}
        >
          {" "}
          <SearchField placeholder="Search..." classNames="test-class" />
        </div>
        <TableExample />
      </div>
    </div>
    </div>
  );
};

export default UserManager;
