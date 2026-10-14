import { useEffect, useState } from "react"
import { api } from "../api/api"

const MyBids = () => {
    const [bids, setBids] = useState([])
    const [timerId, setTimerId] = useState(undefined)

    useEffect(() => {
        const load = async () => {
            try{
                const res = await api.getMyBids()
                const data = res?.data ?? res
                const bidsList = Array.isArray(data) ? data : data?.bids

                setBids(Array.isArray(bidsList) ? bidsList : [])
            } catch (error) {
                console.error(error)
                setError(error.message || "Что-то пошло не так")
                setBids([])
            }
        }
        load()
        setTimerId(setInterval(async () => {
            try {
                api.getMyBids()
            } catch (error) { }
        }, 10000))
        return () => {
            clearInterval(timerId)
        }
    }, [])

    return (
        <div className="container">
            <div class="page-header">
                <h1>Мои ставки</h1>
                <p class="page-subtitle">История ваших ставок на товары</p>
            </div>

            <div class="bids-summary">
                <div class="summary-card">
                    <span class="summary-value">{bids.length}</span>
                    <span class="summary-label">Всего ставок</span>
                </div>
                <div class="summary-card winning">
                    <span class="summary-value">{}</span>
                    <span class="summary-label">Лидирующих ставок</span>
                </div>
                <div class="summary-card">
                    <span class="summary-value">{} ₽</span>
                    <span class="summary-label">Общая сумма</span>
                </div>
            </div>

            <div class="bids-list">
                <div class="bid-item winning">
                    <img src="https://via.placeholder.com/80x80/3498db/ffffff?text=Laptop" alt="Ноутбук" class="bid-item-image"/>
                    <div class="bid-item-content">
                        <div class="bid-item-header">
                            <a href="/items/1" class="bid-item-title">Ноутбук Dell XPS 15</a>
                            <span class="winning-badge">🏆 Лидирую</span>
                        </div>
                        <div class="bid-item-meta">
                            <span>⏰ 2 часа назад</span>
                            <span>💰 Начальная: 65 000 ₽</span>
                        </div>
                    </div>
                    <div class="bid-item-amount">
                        <span class="bid-amount">70 000 ₽</span>
                        <span class="bid-status">Моя ставка</span>
                    </div>
                </div>

                <div class="bid-item">
                    <img src="https://via.placeholder.com/80x80/e74c3c/ffffff?text=iPhone" alt="iPhone" class="bid-item-image"/>
                    <div class="bid-item-content">
                        <div class="bid-item-header">
                            <a href="/items/2" class="bid-item-title">iPhone 14 Pro 256GB</a>
                            <span class="outbid-badge">Перебита</span>
                        </div>
                        <div class="bid-item-meta">
                            <span>⏰ 1 день назад</span>
                            <span>💰 Начальная: 85 000 ₽</span>
                        </div>
                    </div>
                    <div class="bid-item-amount">
                        <span class="bid-amount">88 000 ₽</span>
                        <span class="bid-status">Моя ставка</span>
                        <div class="current-highest">Текущая: 90 000 ₽</div>
                    </div>
                </div>

                <div class="bid-item winning">
                    <img src="https://via.placeholder.com/80x80/f39c12/ffffff?text=Watch" alt="Apple Watch" class="bid-item-image"/>
                    <div class="bid-item-content">
                        <div class="bid-item-header">
                            <a href="/items/5" class="bid-item-title">Apple Watch Series 8</a>
                            <span class="winning-badge">🏆 Лидирую</span>
                        </div>
                        <div class="bid-item-meta">
                            <span>⏰ 3 часа назад</span>
                            <span>💰 Начальная: 35 000 ₽</span>
                        </div>
                    </div>
                    <div class="bid-item-amount">
                        <span class="bid-amount">37 000 ₽</span>
                        <span class="bid-status">Моя ставка</span>
                    </div>
                </div>

                <div class="bid-item winning">
                    <img src="https://via.placeholder.com/80x80/1abc9c/ffffff?text=Camera" alt="Камера" class="bid-item-image"/>
                    <div class="bid-item-content">
                        <div class="bid-item-header">
                            <a href="/items/6" class="bid-item-title">Canon EOS R6</a>
                            <span class="winning-badge">🏆 Лидирую</span>
                        </div>
                        <div class="bid-item-meta">
                            <span>⏰ 5 часов назад</span>
                            <span>💰 Начальная: 150 000 ₽</span>
                        </div>
                    </div>
                    <div class="bid-item-amount">
                        <span class="bid-amount">155 000 ₽</span>
                        <span class="bid-status">Моя ставка</span>
                    </div>
                </div>

                <div class="bid-item">
                    <img src="https://via.placeholder.com/80x80/9b59b6/ffffff?text=Headphones" alt="Наушники" class="bid-item-image"/>
                    <div class="bid-item-content">
                        <div class="bid-item-header">
                            <a href="/items/4" class="bid-item-title">Sony WH-1000XM5</a>
                            <span class="outbid-badge">Перебита</span>
                        </div>
                        <div class="bid-item-meta">
                            <span>⏰ 2 дня назад</span>
                            <span>💰 Начальная: 25 000 ₽</span>
                        </div>
                    </div>
                    <div class="bid-item-amount">
                        <span class="bid-amount">26 000 ₽</span>
                        <span class="bid-status">Моя ставка</span>
                        <div class="current-highest">Текущая: 27 000 ₽</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBids
