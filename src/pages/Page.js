/* TODO:
 * 1. get params
 * 2. Run useEffect to fetch data and store it
 * 3. Build components and style them.
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchPage } from "../store/page/actions";

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(fetchPage(params.username));
  }, [])
  return (
    <main>
      <h1>Page</h1>
    </main>
  )
}