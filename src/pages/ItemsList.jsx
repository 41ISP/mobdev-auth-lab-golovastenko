import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { useItemStore } from '../store/useItemStore'
import { useUserStore } from '../store/useUserStore'
import { api } from "../api/api"

const ItemsList = ({showOwn = false}) => {
    const {items, getItems} = useItemStore()
    const {session} = useUserStore()
    const [stats, setStats] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [timerId, setTimerId] = useState(undefined)

    useEffect (() => {
        const load = async () => {
            setIsLoading(true)
            try{    
                await getItems()
                setStats(await api.getStats());
            } catch (error) {
                console.error(error)
                setError(error.message || "Что-то пошло не так")
            } finally {
                setIsLoading(false)
            }
        }
        load()
        setTimerId(setInterval(async () => {
            try {
                await getItems()
                setStats(await api.getStats());
            } catch (error) {}
        }, 10000))
        return () => {
            clearInterval(timerId)
        }
    }, [])

    return (
        <div className="container">
            <div class="page-header">
                <h1>Все товары</h1>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalItems}</span>
                    <span class="stat-label">Товаров</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalBids}</span>
                    <span class="stat-label">Ставок</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.activeItems}</span>
                    <span class="stat-label">Активных</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.averageItemPrice}₽</span>
                    <span class="stat-label">Средняя цена</span>
                </div>
            </div>
            {isLoading && <p>Загрузка</p>}
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && !error && items && (
            <div class="items-grid">
                {showOwn ? items.filter(el => el.userId === session?.user.id).map((item, i) => 
                (
                    <ItemCard key={i} {...item} />
                ))
                : items.map((item, i) => (
                    <ItemCard key={i} {...item} />
                ))}
            </div>
            )}
        </div>
    )
}

export default ItemsList