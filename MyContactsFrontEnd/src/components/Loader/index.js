import ReactDom from 'react-dom';
import { OverLay } from './styles';

export function Loader() {
  return ReactDom.createPortal(
    <OverLay>
      <div className="loader" />
    </OverLay>,
    document.getElementById('loader-root'),
  );
}
