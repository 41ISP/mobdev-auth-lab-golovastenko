import { Link } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"

const ItemDetail = () => {
    const handleBid = () => {}
    
    return (
        <div className="container">

            <Link to={"/"}>← Вернуться к списку товаров</Link>

            <div class="item-detail">
                <div class="item-header">
                    <div>
                         <img src={ItemShow.imageUrl} class="item-image-large" />
                    </div>

                    <div class="item-info">
                        <span class="item-status">{ItemShow.status}</span>
                            
                        <h1 class="item-title-large">{ItemShow.title}</h1>
                            
                        <div class="item-seller-info">
                            <div class="seller-avatar">TS</div>
                            <div class="seller-details">
                                <div class="seller-name">{ItemShow.username}</div>
                                <div class="seller-date">{ItemShow.createdAt}</div>
                            </div>
                        </div>

                        <div class="item-description-full">
                            {ItemShow.description}
                        </div>

                        <div class="price-section">
                            <div class="starting-price">Начальная цена:</div>
                            <div class="current-price">{ItemShow.price}</div>
                            <div class="highest-bid">Текущая ставка: {ItemShow.highestBid}</div>

                            <form class="bid-form" onSubmit={handleBid}>
                                <Input 
                                    type="number" 
                                    name= "bidInput"
                                    class="bid-input" 
                                    placeholder="Введите вашу ставку (мин. 70 001 ₽)"
                                    min={ItemShow.highestBid}
                                    step="100"
                                />
                                <Button type="submit" class="btn-bid">Сделать ставку</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
