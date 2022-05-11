import { Item } from "api";
import { flexBase, flexColumn } from "components/commonStyles";
import { useShoppingBasketContext } from "context/ShoppingBasketContext";

import styled from "styled-components/macro";

const ShopItemWrapper = styled.div`
  ${flexColumn}

  justify-content: space-between;

  padding: 1rem 0.25rem 1rem 0.25rem;
`;

const ButtonsContainer = styled.div`
  ${flexBase}

  align-items: center;
  justify-content: space-around;
`;

const ItemInfo = styled.div`
  ${flexColumn}

  align-items: center;
`;

const PriceSpan = styled.span`
  font-weight: bold;

  font-size: large;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: large;
  border-radius: 50%;
  margin: 0.5rem;
  color: ${(props) => props.color};
  background-color: transparent;
  border: none;
`;

const Hr = styled.hr`
  width: 100%;
`;

interface ShopItemProps {
  item: Item;
}

export const ShopItem = ({ item }: ShopItemProps) => {
  const { basket, removeFromBasket, addToBasket } = useShoppingBasketContext();

  const { name, price } = item;

  const itemFromBasket = basket.find(
    (basketItem) => basketItem.item.id === item.id
  );

  const count = itemFromBasket?.quantity ?? 0;

  return (
    <ShopItemWrapper>
      <ItemInfo>
        <p>{name}</p>
        <PriceSpan> £ {price}</PriceSpan>
      </ItemInfo>
      <ButtonsContainer>
        <Button color="blue" onClick={() => removeFromBasket(item)}>
          -
        </Button>
        {count}
        <Button color="blue" onClick={() => addToBasket(item)}>
          +
        </Button>
      </ButtonsContainer>
      <Hr></Hr>
    </ShopItemWrapper>
  );
};
