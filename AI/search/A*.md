# A* search algorithm 
+ f(n) = g(n) + h(n)
 + g(n) is the actual cost of traversing from the initial state to state n
 + h(n) is the estimated cost of reaching the goal from state n

Pseudo algorithm : 
We import our start state into OPEN, and we create a blank data structure called CLOSE; we calculate the final state of s as the heuristic cost, and our initial, actual cost is 0. Since our actual cost is 0, our heuristic cost will be the final cost.
We terminate our search with a failure if our OPEN is empty; if not, we'll select the minimum cost state, n, from OPEN, and we will put that into CLOSE. We also performed this in our Dijkstra's search.
If our current state is equal to the goal state, we'll terminate with a success.
If we do not terminate with a success, we will need to generate the successors of n. We'll generate all of the successors of n through two mechanisms, as follows:
If the particular m is not a part of either our OPEN or our CLOSE, we will calculate the actual cost of m, and then we'll calculate the final cost; that will be the actual cost plus the heuristic cost. Then, we'll add it to OPEN.
If, by any chance, m has already been explored and is a part of our OPEN or our CLOSE, we already have a path to m from some arbitrary node, and there is one more part that we are getting from m to n. So, we need to check which is lower: the previous cost of m or the current cost. So, we'll check the minimum, whatever the cost will be, and we'll update f(m) accordingly; if the value of f(m) is decreased and our m belongs to CLOSE, then we will move m to OPEN.
We'll keep on doing this until we do not get a failure or a success.


