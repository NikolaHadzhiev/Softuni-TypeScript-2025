type OrderStatus = "Pending" | "Shipped" | "Delivered";

interface Dish {
    dishName: string;
    price: number;
    isVegan: boolean;
    getDishInfo(): string;
}

interface OrderDetails {
    orderId: number;
    quantity: number;
    orderStatus: OrderStatus;
    getOrderSummary(): string;
    updateOrderStatus(): void;
    getOrderStatus(): string;
}

interface FullOrder extends Dish, OrderDetails {
    discount: number;
    deliveryAddress: string;
    getFinalPrice(): string;
}