import { Oval } from 'react-loader-spinner';

const Loading = ({ containerHeight }) => {
  return (
    <div style={{ height: containerHeight, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Oval
        height={80}
        width={80}
        color="#16213E"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="gray"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loading;
