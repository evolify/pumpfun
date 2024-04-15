import { useEffect, useState } from "react"
import { Coin } from "common/types"
import { getData } from "common/api"

export function useData<T>() {
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Coin[]>()

  async function load() {
    setLoading(true)
    try {
      const res = await getData(10)
      if (res) {
        setData(res)
      } else {
        setError("no data")
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])
  return {
    data,
    error,
    loading,
    load,
  }
}
