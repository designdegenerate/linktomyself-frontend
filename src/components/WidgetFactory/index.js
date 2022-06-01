import { Link } from 'react-router-dom';
import './style.scss';
export default function WidgetFactory() {
  return (
    <main>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <p>NIS+ is a directory service developed by Sun Microsystems to replace its older 'NIS' (Network Information Service). It is designed to eliminate the need for duplication across many computers of configuration data such as user accounts, host names and addresses, printer information and NFS disk mounts on individual systems, instead using a central repository on a master server, <Link to="/">Inline link</Link>simplifying system administration. NIS+ client software has been ported to other Unix and Unix-like platforms.</p>
      <button>button</button>
      <Link to="/">Outter Link</Link>
    </main>
  )
}