import ReportType from '../../components/reports/ReportType';
import { useParams } from 'react-router-dom';

const ChatReport = () => {
  const { rc_search } = useParams();
  console.log(rc_search);
  return (
    <div>
      <ReportType reportType="chat" query={rc_search}/>
    </div>
  );
};

export default ChatReport;
