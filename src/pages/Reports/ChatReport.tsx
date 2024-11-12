import ReportType from '../../components/reports/ReportType';
import { useLocation } from 'react-router-dom';

const ChatReport = () => {
  const location = useLocation();
  const { id } = location.state || {};
  return (
    <div>
      <ReportType reportType="chat" query={id}/>
    </div>
  );
};

export default ChatReport;
