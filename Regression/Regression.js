const LinearRegression = (x, y, target) => {
	var i;
	var n = X.length
	var sumX = 0;
	var sumY = 0;
	var sumXY = 0;
	var sumX2 = 0;
	var st = 0;
	var sr = 0;

	for(i=0;i<n;i++){
		sumX += x[i];
		sumY += y[i];
		sumXY += x[i]*y[i];
		sumX2 += x[i]*x[i];
	}

	var xm = sumX/n;
	var ym = sumY/n;
	var a1 = (n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX)
	var a0 = ym - a1*xm;

	for(i =0;i<n;i++){
		st += Math.pow((y[i]-ym),2);
		sr += Math.pow((y[i]-a1*x[i]-a0),2);
	}

	var syx = Math.pow((sr/(n-2)),0.5);
	var r2 = (st-sr)/st;
	var ans = a0+a1*target;
	console.log("\tf(x) = "+a0+" + "+a1+"(x)");
	console.log("\tans = "+ans);
	console.log("\tstandard error = "+syx);
	console.log("\tR-Squared = "+r2);
}

const PolynomialRegression = (x, y, target, order) => {
	var i,j,k,l;
	var n = x.length;
	var a = [];
	fill2DimensionsArray(a, order+1, order+1);
	var b = new Array(order+1).fill(0);
	//console.log(a);
	for(i=0;i<order+1;i++){
		for(k=0;k<=i;k++){
			sum=0;
			var t=i+k;
			for(j=0;j<n;j++){
				sum+= Math.pow(x[j],t);
			}
			//console.log("i="+i+"k="+k+"sum="+sum);
		
			a[i][k] = sum;
			a[k][i] = sum;
		}
		sum=0;
		for(j=0;j<n;j++){
			sum+= y[j]*Math.pow(x[j],i)
		}
		b[i] = sum;
		//console.log(a);
		//console.log(b);
	}
	var sumY = 0;
	var st = 0;
	var sr = 0;
	var sum = 0;
	var ans = 0;
	var s = "";
	var f = solve(a, b);
	for(i=0;i<order+1;i++){
		ans+=f[i]*Math.pow(target,i);
		if(i==0){
			s += f[i]+" + ";
		}else if(i<order){
			s += f[i]+" (x^"+i+") + ";
		}else
			s += f[i]+" (x^"+i+")";
		//console.log(ans)
	}
	
	for(i=0;i<n;i++){
		sumY += y[i];
	}

	var ym = sumY/n;

	for(i=0;i<n;i++){
		var ax = 0;
		for(j=0;j<order+1;j++){
			if(j==0){
				ax-= f[j];
			}else{
				ax-= f[j]*Math.pow(x[i],j);
			}
			//console.log("ax = "+ax)
		}
		st+= Math.pow((y[i]-ym),2);
		sr+= Math.pow((y[i]+ax),2)
		//console.log("sr = "+sr);
	}
	var syx = Math.pow((sr/(n-(order+1))),0.5);
	var r2 = (st-sr)/st;

	console.log("\tf(x) = "+s);
	console.log("\tans = "+ans);
	console.log("\tstandard error = "+syx);
	console.log("\tR-Squared = "+r2);
}

const MultipileRegression = (x, y, target) => {
	var i,j,k;
	var order = x.length;
	var n = x[0].length;
	var a = [];
	fill2DimensionsArray(a, order+1, order+1);
	var b = new Array(order+1).fill(0);
	//console.log(a);
	for(i=0;i<order+1;i++){
		for(k=0;k<=i;k++){
			sum=0;
			for(j=0;j<n;j++){
				if(i==0){
					sum+=Math.pow(x[i][j],i)
				}else if(k==0 && i<=order){
					sum+= x[i-1][j];
				}else{
					sum+= x[i-1][j]*x[k-1][j];
				}
			}
			//console.log("i="+i+"k="+k+"sum="+sum);
			//console.log(sum);
			a[i][k] = sum;
			a[k][i] = sum;
		}
		sum=0;
		for(j=0;j<n;j++){
			if(i==0){
				sum+= y[j]
			}else{
				sum+= y[j]*x[i-1][j]
			}
		}
		b[i] = sum;
		//console.log(a);
		//console.log(b);
	}
	var sumY = 0;
	var st = 0;
	var sr = 0;
	var sum = 0;
	var ans = 0;
	var s = "";
	var f = solve(a, b);
	for(i=0;i<order+1;i++){
		if(i==0){
			s += f[i]+" + ";
			ans+=f[i];
		}else if(i<order){
			s += f[i]+"(x"+i+") + ";
			ans+=f[i]*target[i-1];
		}else{
			s += f[i]+"(x"+i+")";
			ans+=f[i]*target[i-1];
		}
		//console.log(ans)
	}
	
	for(i=0;i<n;i++){
		sumY += y[i];
	}

	var ym = sumY/n;

	for(i=0;i<n;i++){
		var ax = 0;
		for(j=0;j<order+1;j++){
			if(j==0){
				ax-= f[j];
			}else{
				ax-= f[j]*x[j-1][i];
			}
			//console.log("ax = "+ax)
		}
		st+= Math.pow((y[i]-ym),2);
		sr+= Math.pow((y[i]+ax),2);
		//console.log("y["+i+"] = "+y[i]);
		//console.log("sr = "+sr);
	}
	var syx = Math.pow((sr/(n-(order+1))),0.5);
	var r2 = (st-sr)/st;

	console.log("\tf(x) = "+s);
	console.log("\tans = "+ans);
	console.log("\tstandard error = "+syx);
	console.log("\tR-Squared = "+r2);
}

const fill2DimensionsArray = (arr, rows, columns) => {
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
}

const diagonalize = (M) => {
  var m = M.length;
  var n = M[0].length;
  for(var k=0; k<Math.min(m,n); ++k) {
    i_max = findPivot(M, k);
    if (M[i_max, k] == 0)
      throw "matrix is singular";
    swap_rows(M, k, i_max);
    for(var i=k+1; i<m; ++i) {
      var c = M[i][k] / M[k][k];
      for(var j=k+1; j<n; ++j) {
        M[i][j] = M[i][j] - M[k][j] * c;
      }
      M[i][k] = 0;
    }
  }
}

const findPivot = (M, k) => {
  var i_max = k;
  for(var i=k+1; i<M.length; ++i) {
    if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
      i_max = i;
    }
  }
  return i_max;
}

const swap_rows = (M, i_max, k) => {
  if (i_max != k) {
    var temp = M[i_max];
    M[i_max] = M[k];
    M[k] = temp;
  }
}

const makeM = (a, b) => {
  for(var i=0; i<a.length; ++i) {
    a[i].push(b[i]);
  }
}

const substitute = (M) => {
  var m = M.length;
  for(var i=m-1; i>=0; --i) {
    var x = M[i][m] / M[i][i];
    for(var j=i-1; j>=0; --j) {
      M[j][m] -= x * M[j][i];
      M[j][i] = 0;
    }
    M[i][m] = x;
    M[i][i] = 1;
  }
}

const extractX = (M) => {
  var x = [];
  var m = M.length;
  var n = M[0].length;
  for(var i=0; i<m; ++i){
    x.push(M[i][n-1]);
  }
  return x;
}

const solve = (a, b) => {
  makeM(a,b);
  diagonalize(a);
  substitute(a);
  var x = extractX(a);
  return x;
}


var X = [10, 15, 20, 30, 40, 50, 60, 70, 80]
var Y = [5, 9, 15, 18, 22, 30, 35, 38, 43]
//var X = [0, 1, 2, 3, 4, 5]
//var Y = [2.1, 7.7, 13.6, 27.2, 40.9, 61.1]

console.log("1.");
LinearRegression(X,Y,65);

console.log("2.");
PolynomialRegression(X,Y,65,2);


var XM = [
			[1, 0, 2, 3, 4, 2, 1],
			[0, 1, 4, 2, 1, 3, 6],
			[1, 3, 1, 2, 5, 3, 4]
									]

var YM = [4, -5, -6, 0, -1, -7, -20]

/*var XM = [
			[0, 2, 2.5, 1, 4, 7],
			[0, 1,   2, 3, 6, 2]
									]

var YM = [5, 10, 9, 0, 3, 27]*/
var xtarget = [1, 6, 4]

console.log("3.");
MultipileRegression(XM,YM,xtarget);





