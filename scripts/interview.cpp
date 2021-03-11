// InterviewPrep.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include "pch.h"
#include <iostream>
#include <string>
#include <cassert>
#include <vector>

std::string reverseString(std::string input) {
	std::string reversedString = "";

	for (int i = (input.length() - 1); i > -1; i--) {
		reversedString += input[i];
	}

	return reversedString;
}

bool isPalindrome(std::string input) {

	if (input.length() == 0) {
		return false;
	}

	for (int i = 0; i < input.length(); i++) {
		if (input[i] != input[input.length() - i - 1]) {
			return false;
		}
	}

	return true;
}

int longest_palindrome(const std::string &s)
{
	int maxlen = 0;
	for (int i = 0; i < s.size(); ++i)
		for (int j = 0; j < s.size() - i; ++j)
		{
			std::string sub = s.substr(i, s.size() - j);

			if (isPalindrome(sub))
				maxlen = sub.size() > maxlen ? sub.size() : maxlen;
		}


	return maxlen;
}

std::vector<std::string> splitString(std::string input, std::string delimeter) {

	std::vector<std::string> splitString;

	int posLast = 0;
	int posNext = 0;
	while ((posNext = input.find(delimeter, posLast)) != std::string::npos) {
		splitString.push_back(input.substr(posLast, posNext - posLast));
		posLast = posNext + delimeter.length();
	}

	splitString.push_back(input.substr(posLast, input.length()));

	return splitString;
}


int main()
{
	std::string myName = "Clark";

	assert(reverseString(myName) == "kralC");
	assert(reverseString("") == "");
	assert(reverseString("C") == "C");
	assert(reverseString("  With Spaces  ") == "  secapS htiW  ");
	
	assert(isPalindrome("hannah") == true);
	assert(isPalindrome("123454321") == true);
	assert(isPalindrome(" hannah") == false);
	assert(isPalindrome("") == false);
	assert(isPalindrome("a") == true);
	assert(isPalindrome("bab") == true);

	std::string sub = std::string("Hello there").substr(1, 50);

	longest_palindrome("whatdidIsay12234543221");

	std::vector<std::string> gimme = splitString("Clark, Laura, Isaac,  ", ", ");
}

