# block_explorer

목표 : puppeth를 이용하여 구축한 블록체인 Private Network의 Block과 Tx에 대한 정보를 불러오는 Block Explorer 제작

Private Network는 Geth(Go-ethereum)로 실행하며, geth attach http://127.0.0.1:9000 명령어로 콘솔 프롬프트에 접근할 수 있다. 

참고 사이트 : https://etherscan.io/

<br/>

## Front

주소 : http://localhost:3000

역할 : back과 비동기 통신을 하며 DB 정보를 받아와서 웹 페이지에 나타낸다.

설명 : 메인 페이지에서는 가장 최근에 생성된 Block 15개와 Tx 15개를 최신순으로 보여준다. 

각 Block의 Number나 Tx의 Hash 값을 클릭하면 해당 Block 혹은 Tx에 대한 상세 페이지로 이동한다.

상세 페이지에서는 하나의 Block 혹은 Tx에 대한 세세한 정보를 볼 수 있다.

More Blocks와 More Transactions 페이지에서는 모든 Block과 Tx 정보를 볼 수 있다.

Search Bar에서 Block Number, Block Hash, Tx Hash에 대한 검색이 가능하다.

Block Reward = 각 Tx의 GasUsed * GasPrice 합 + 2 ether 

(GasPrice의 단위는 10 ^ 9 wei(=10 gwei), 1 ether = 10 ^ 18 wei)

<br/>

## Back

주소 : http://localhost:4000

역할 : web3 라이브러리를 이용하여 Private Network에 대한 정보를 받아오고, 이에 맞게 DB를 최신화한다. 

(블록체인 네트워크는 CRUD 중에 C와 R만 가능하다.)

설명 : 가장 먼저 해야 할 일은 DB 스키마를 구성하는 것이다. Block과 Tx 테이블을 만든 후 필요한 컬럼들에 대해 타입을 지정한다.

R 기능은 비교적 간단한데, Block 테이블과 Tx 테이블에서 SELECT 문을 사용하여 해당 정보를 불러오면 된다.

C 기능은 Block과 Tx 생성을 동시에 처리하는 것이 효율적이다. 그 이유는 Block과 Tx가 1 : N 관계에 Mapping되기 때문이다.

Private Network의 총 Block 수(X)가 DB의 Block 테이블의 행 갯수(Y)보다 많다면 최신화되어야 하는 상태라고 할 수 있다.

X - Y 만큼 for 문을 돌며 Block 테이블에 최신 Block들을 추가하고, 만약 각 Block에 Tx가 존재하면 Tx의 수 만큼 for 문을 돌며 최신 Tx를 추가한다.
